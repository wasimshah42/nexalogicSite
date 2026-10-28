<?php
// Hostinger Authenticated SMTP Mailer for Nexalogic Website Contact Form & Sarah Sales Bot
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// SMTP Configuration
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 465); // SSL
define('SMTP_USER', 'sales@nexalogic.site');
define('SMTP_PASS', 'zN!O~9G+a');
define('SMTP_FROM_NAME', 'Sarah - Nexalogic Sales');
define('RECIPIENT_EMAIL', 'sales@nexalogic.site');

// Read raw POST body or form data
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    $data = $_POST;
}

$name = isset($data['name']) ? trim($data['name']) : (isset($data['Name']) ? trim($data['Name']) : 'Website Visitor');
$email = isset($data['email']) ? trim($data['email']) : (isset($data['Email']) ? trim($data['Email']) : '');
$message = isset($data['message']) ? trim($data['message']) : (isset($data['Message']) ? trim($data['Message']) : '');
$source = isset($data['source']) ? trim($data['source']) : 'Contact Form';

if (empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Please fill in all required fields (email and message)."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // If it's a fallback placeholder from chat, accept it, otherwise validate
    if (!strpos($email, '@')) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please provide a valid email address."]);
        exit();
    }
}

$subject = "New Inquiry: " . $name . " [" . $source . "] - Nexalogic";

$html_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f3f4f6; margin: 0; padding: 20px; }
        .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #111827 0%, #1f2937 100%); padding: 24px; text-align: center; border-bottom: 3px solid #f59e0b; }
        .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
        .header p { color: #fbbf24; margin: 4px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
        .body { padding: 28px; }
        .field-group { margin-bottom: 20px; }
        .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #6b7280; letter-spacing: 0.8px; margin-bottom: 6px; }
        .field-value { font-size: 15px; color: #111827; background: #f9fafb; padding: 12px 14px; border-radius: 8px; border: 1px solid #f3f4f6; }
        .field-value a { color: #d97706; font-weight: 600; text-decoration: none; }
        .message-box { font-size: 15px; color: #111827; background: #fffbeb; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; border-top: 1px solid #fef3c7; border-right: 1px solid #fef3c7; border-bottom: 1px solid #fef3c7; white-space: pre-wrap; }
        .footer { background: #f9fafb; padding: 16px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; }
    </style>
</head>
<body>
    <div class='card'>
        <div class='header'>
            <h1>Nexalogic Technologies</h1>
            <p>Direct Lead Notification</p>
        </div>
        <div class='body'>
            <div class='field-group'>
                <div class='field-label'>Sender Name</div>
                <div class='field-value'>" . htmlspecialchars($name) . "</div>
            </div>
            <div class='field-group'>
                <div class='field-label'>Sender Email</div>
                <div class='field-value'><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></div>
            </div>
            <div class='field-group'>
                <div class='field-label'>Submission Source</div>
                <div class='field-value'>" . htmlspecialchars($source) . "</div>
            </div>
            <div class='field-group'>
                <div class='field-label'>Message / Order Details</div>
                <div class='message-box'>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>
        </div>
        <div class='footer'>
            Authenticated delivery via Hostinger SMTP &bull; Handled by Sarah (Sales Director)
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

    $read(); // initial greeting
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

    $boundary = md5(uniqid(time()));
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
$smtpSuccess = send_smtp_mail(RECIPIENT_EMAIL, $subject, $html_body, $email, $name);

if ($smtpSuccess) {
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Your message has been sent directly to sales@nexalogic.site via Hostinger SMTP!"
    ]);
    exit();
}

// 2. Fallback to PHP native mail() if socket is restricted on host
$nativeHeaders = "MIME-Version: 1.0\r\n";
$nativeHeaders .= "Content-type: text/html; charset=UTF-8\r\n";
$nativeHeaders .= "From: " . SMTP_FROM_NAME . " <" . SMTP_USER . ">\r\n";
$nativeHeaders .= "Reply-To: " . $name . " <" . $email . ">\r\n";
$nativeHeaders .= "X-Mailer: Hostinger Mailer\r\n";

if (@mail(RECIPIENT_EMAIL, $subject, $html_body, $nativeHeaders)) {
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Your message was sent successfully to sales@nexalogic.site!"
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to dispatch email. Please reach out to sales@nexalogic.site or Telegram @smartlinker786 directly."
    ]);
}
?>
