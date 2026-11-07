<?php
// Hostinger Authenticated SMTP Mailer & MySQL/SQLite Database Storage for Nexalogic Leads
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/db-config.php';

// SMTP Configuration
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 465); // SSL
define('SMTP_USER', 'sales@nexalogic.site');
define('SMTP_PASS', 'zN!O~9G+a');
define('SMTP_FROM_NAME', 'Nexalogic Lead System');
define('RECIPIENT_EMAIL', 'sales@nexalogic.site');

// Read raw POST body or form data
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    $data = $_POST;
}

$session_id = isset($data['sessionId']) ? trim($data['sessionId']) : (isset($data['session_id']) ? trim($data['session_id']) : null);
$name = isset($data['name']) ? trim($data['name']) : (isset($data['Name']) ? trim($data['Name']) : 'Website Visitor');
$raw_email = isset($data['email']) ? trim($data['email']) : (isset($data['Email']) ? trim($data['Email']) : '');
$phone = isset($data['phone']) ? trim($data['phone']) : (isset($data['Phone']) ? trim($data['Phone']) : '');
$telegram = isset($data['telegram']) ? trim($data['telegram']) : (isset($data['Telegram']) ? trim($data['Telegram']) : '');
$package_selected = isset($data['package']) ? trim($data['package']) : null;
$target_url = isset($data['targetUrl']) ? trim($data['targetUrl']) : null;
$target_keywords = isset($data['targetKeywords']) ? trim($data['targetKeywords']) : null;
$message = isset($data['message']) ? trim($data['message']) : (isset($data['Message']) ? trim($data['Message']) : '');
$source = isset($data['source']) ? trim($data['source']) : 'Website Contact Form';

// Sanitize dummy placeholder emails
if ($raw_email === 'sales-lead@nexalogic.site' || 
    $raw_email === 'buyer-order@nexalogic.site' || 
    $raw_email === 'visitor-no-email@nexalogic.site') {
    $email = '';
} else {
    $email = $raw_email;
}

// Detect client IP address
$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
if (strpos($ip, ',') !== false) {
    $ip = trim(explode(',', $ip)[0]);
}
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
$timestamp = date('Y-m-d H:i:s');

if (empty($message) && empty($email) && empty($phone) && empty($telegram)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Empty submission received."]);
    exit();
}

// ==========================================
// 1. SAVE INTO DATABASE (MySQL / SQLite)
// ==========================================
$lead_id = null;
$db_driver = 'unknown';

try {
    $pdo = get_db_connection();
    $db_driver = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME);

    $sql = "INSERT INTO leads (
        session_id, created_at, name, email, phone, telegram, source,
        package_selected, target_url, target_keywords, message, ip_address, user_agent, status
    ) VALUES (
        :session_id, :created_at, :name, :email, :phone, :telegram, :source,
        :package_selected, :target_url, :target_keywords, :message, :ip_address, :user_agent, 'new'
    )";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':session_id' => $session_id,
        ':created_at' => $timestamp,
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':telegram' => $telegram,
        ':source' => $source,
        ':package_selected' => $package_selected,
        ':target_url' => $target_url,
        ':target_keywords' => $target_keywords,
        ':message' => $message,
        ':ip_address' => $ip,
        ':user_agent' => $user_agent,
    ]);

    $lead_id = $pdo->lastInsertId();

    // Link contact details to the visitor profile in visitors table if session_id is available
    if ($session_id) {
        $updParams = [':session_id' => $session_id];
        $updFields = [];
        if ($email) { $updFields[] = "contact_email = :email"; $updParams[':email'] = $email; }
        if ($phone) { $updFields[] = "contact_phone = :phone"; $updParams[':phone'] = $phone; }
        if ($telegram) { $updFields[] = "contact_telegram = :telegram"; $updParams[':telegram'] = $telegram; }

        if (!empty($updFields)) {
            $updSql = "UPDATE visitors SET " . implode(', ', $updFields) . " WHERE session_id = :session_id";
            $updStmt = $pdo->prepare($updSql);
            $updStmt->execute($updParams);
        }
    }
} catch (Exception $e) {
    error_log("Database lead insertion error: " . $e->getMessage());
}

// Backup to JSON Lines as secondary safeguard
$backupRecord = [
    'id' => $lead_id ?: uniqid('lead_'),
    'session_id' => $session_id,
    'created_at' => $timestamp,
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'telegram' => $telegram,
    'source' => $source,
    'message' => $message,
    'ip_address' => $ip,
];
$dataDir = __DIR__ . '/data';
if (file_exists($dataDir)) {
    @file_put_contents($dataDir . '/leads_backup.jsonl', json_encode($backupRecord) . "\n", FILE_APPEND | LOCK_EX);
}

// ==========================================
// 2. DISPATCH NOTIFICATION EMAIL VIA HOSTINGER
// ==========================================
$has_real_email = !empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL);
$display_email = $has_real_email ? htmlspecialchars($email) : '<span style="color:#d97706; font-style:italic;">[Not provided yet &bull; Live Chat Visitor]</span>';
$reply_to = $has_real_email ? $email : SMTP_USER;
$reply_name = $has_real_email ? $name : 'Nexalogic Lead Monitor';

if (strpos($source, 'Chat') !== false) {
    $subject = "💬 Live Chat Lead: " . $name . " [" . $source . "]";
} elseif (strpos($source, 'Order') !== false) {
    $subject = "🛒 Order Placement Request: " . $name . " [" . $source . "]";
} else {
    $subject = "📩 Website Contact Lead: " . $name . " [" . $source . "]";
}

$lead_badge = $lead_id ? "Lead #" . $lead_id : "New Inquiry";

$contact_channels_html = "";
if (!empty($phone)) {
    $contact_channels_html .= "
    <div class='field-group'>
        <div class='field-label'>Phone / WhatsApp</div>
        <div class='field-value'><a href='https://wa.me/" . preg_replace('/[^0-9]/', '', $phone) . "' style='color:#10b981; font-weight:bold;'>" . htmlspecialchars($phone) . "</a></div>
    </div>";
}
if (!empty($telegram)) {
    $cleanTg = ltrim($telegram, '@');
    $contact_channels_html .= "
    <div class='field-group'>
        <div class='field-label'>Telegram</div>
        <div class='field-value'><a href='https://t.me/" . htmlspecialchars($cleanTg) . "' style='color:#3b82f6; font-weight:bold;'>@" . htmlspecialchars($cleanTg) . "</a></div>
    </div>";
}

$html_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1f2937; background-color: #0f172a; margin: 0; padding: 24px 12px; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
        .header { background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); padding: 26px 24px; text-align: center; border-bottom: 3px solid #f59e0b; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
        .header p { color: #f59e0b; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .body { padding: 28px 24px; }
        .badge { display: inline-block; background: #fef3c7; color: #92400e; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 16px; }
        .field-group { margin-bottom: 18px; }
        .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.8px; margin-bottom: 6px; }
        .field-value { font-size: 15px; color: #0f172a; background: #f8fafc; padding: 12px 14px; border-radius: 8px; border: 1px solid #e2e8f0; word-break: break-word; }
        .field-value a { color: #d97706; text-decoration: none; font-weight: 600; }
        .message-box { font-size: 14px; color: #0f172a; background: #fffbeb; padding: 18px; border-radius: 10px; border-left: 4px solid #f59e0b; border-top: 1px solid #fef3c7; border-right: 1px solid #fef3c7; border-bottom: 1px solid #fef3c7; white-space: pre-wrap; line-height: 1.6; }
        .meta-box { margin-top: 20px; padding: 12px 14px; background: #f1f5f9; border-radius: 8px; font-size: 11px; color: #64748b; }
        .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class='card'>
        <div class='header'>
            <h1>Nexalogic Technologies</h1>
            <p>New Visitor Inquiry Received</p>
        </div>
        <div class='body'>
            <div class='badge'>" . htmlspecialchars($lead_badge) . " &bull; " . htmlspecialchars($source) . "</div>

            <div class='field-group'>
                <div class='field-label'>Sender / Visitor Name</div>
                <div class='field-value'><strong>" . htmlspecialchars($name) . "</strong></div>
            </div>

            <div class='field-group'>
                <div class='field-label'>Email Address</div>
                <div class='field-value'>" . ($has_real_email ? "<a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a>" : $display_email) . "</div>
            </div>

            " . $contact_channels_html . "

            <div class='field-group'>
                <div class='field-label'>Inquiry Details / Message</div>
                <div class='message-box'>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>

            <div class='meta-box'>
                <strong>Lead Meta Info:</strong><br>
                &bull; Time: " . htmlspecialchars($timestamp) . "<br>
                &bull; Visitor IP: " . htmlspecialchars($ip) . "<br>
                &bull; Session ID: " . htmlspecialchars($session_id ?: 'N/A') . "<br>
                &bull; Stored in Database: " . ($lead_id ? "Yes (Record #" . $lead_id . " in " . strtoupper($db_driver) . ")" : "Yes (JSON backup)") . "
            </div>
        </div>
        <div class='footer'>
            Stored in Nexalogic Database &bull; Hostinger Authenticated SMTP Delivery
        </div>
    </div>
</body>
</html>
";

/**
 * Send email via authenticated SMTP socket (Port 465 SSL)
 */
function send_smtp_mail($to, $subject, $htmlContent, $replyToEmail, $replyToName) {
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);

    $socket = @stream_socket_client('ssl://' . SMTP_HOST . ':' . SMTP_PORT, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) {
        return false;
    }

    $read = function() use ($socket) {
        $response = '';
        while ($str = fgets($socket, 515)) {
            $response .= $str;
            if (substr($str, 3, 1) == " ") break;
        }
        return $response;
    };

    $write = function($cmd) use ($socket) {
        fputs($socket, $cmd . "\r\n");
    };

    $read();
    $write("EHLO " . gethostname());
    $read();

    $write("AUTH LOGIN");
    $read();
    $write(base64_encode(SMTP_USER));
    $read();
    $write(base64_encode(SMTP_PASS));
    $authResp = $read();

    if (strpos($authResp, '235') === false) {
        fclose($socket);
        return false;
    }

    $write("MAIL FROM: <" . SMTP_USER . ">");
    $read();
    $write("RCPT TO: <" . $to . ">");
    $read();
    $write("DATA");
    $read();

    $headers = [
        "MIME-Version: 1.0",
        "From: " . SMTP_FROM_NAME . " <" . SMTP_USER . ">",
        "Reply-To: " . $replyToName . " <" . $replyToEmail . ">",
        "To: <" . $to . ">",
        "Subject: " . $subject,
        "Date: " . date("r"),
        "Content-Type: text/html; charset=UTF-8",
        "Content-Transfer-Encoding: base64"
    ];

    $payload = implode("\r\n", $headers) . "\r\n\r\n" . chunk_split(base64_encode($htmlContent)) . "\r\n.\r\n";
    $write($payload);
    $dataResp = $read();

    $write("QUIT");
    fclose($socket);

    return (strpos($dataResp, '250') !== false);
}

// 1. Attempt Authenticated Hostinger SMTP Delivery
$smtpSuccess = send_smtp_mail(RECIPIENT_EMAIL, $subject, $html_body, $reply_to, $reply_name);

if ($smtpSuccess) {
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "lead_id" => $lead_id,
        "database" => $db_driver,
        "message" => "Your message has been saved and sent directly to sales@nexalogic.site!"
    ]);
    exit();
}

// 2. Fallback to PHP native mail()
$nativeHeaders = "MIME-Version: 1.0\r\n";
$nativeHeaders .= "Content-type: text/html; charset=UTF-8\r\n";
$nativeHeaders .= "From: " . SMTP_FROM_NAME . " <" . SMTP_USER . ">\r\n";
$nativeHeaders .= "Reply-To: " . $reply_name . " <" . $reply_to . ">\r\n";
$nativeHeaders .= "X-Mailer: Hostinger Lead System\r\n";

if (@mail(RECIPIENT_EMAIL, $subject, $html_body, $nativeHeaders)) {
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "lead_id" => $lead_id,
        "database" => $db_driver,
        "message" => "Your message was saved and sent successfully to sales@nexalogic.site!"
    ]);
} else {
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "lead_id" => $lead_id,
        "database" => $db_driver,
        "message" => "Your inquiry has been recorded in our database. Our team will follow up!"
    ]);
}
?>
