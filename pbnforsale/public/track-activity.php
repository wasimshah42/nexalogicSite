<?php
// Nexalogic Technologies - Real-Time User Journey & Visitor Activity Logger
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/db-config.php';

$botToken = '8769183923:AAHOTT_9PIqkUBblMFPtADZT2zWNuQyNyhs';
$chatId = '5368545693';

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    $data = $_POST;
}

$session_id = isset($data['sessionId']) ? trim($data['sessionId']) : '';
if (empty($session_id)) {
    $session_id = 'nx_' . bin2hex(random_bytes(16));
}

$event_type = isset($data['eventType']) ? trim($data['eventType']) : 'page_view';
$page_url = isset($data['page']) ? trim($data['page']) : '/';
$element_id = isset($data['elementId']) ? trim($data['elementId']) : null;
$event_data = isset($data['eventData']) ? (is_array($data['eventData']) ? json_encode($data['eventData']) : $data['eventData']) : null;

$ip = isset($_SERVER['HTTP_CF_CONNECTING_IP']) ? $_SERVER['HTTP_CF_CONNECTING_IP'] : (isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0] : $_SERVER['REMOTE_ADDR']);
if (strpos($ip, ',') !== false) {
    $ip = trim(explode(',', $ip)[0]);
}

$country = isset($data['country']) ? $data['country'] : 'Unknown';
$country_code = isset($data['countryCode']) ? strtoupper($data['countryCode']) : '??';
$city = isset($data['city']) ? $data['city'] : 'Unknown';
$isp = isset($data['isp']) ? $data['isp'] : 'Unknown';
$device = isset($data['device']) ? $data['device'] : 'Desktop';
$browser = isset($data['browser']) ? $data['browser'] : 'Unknown';
$os = isset($data['os']) ? $data['os'] : 'Unknown';
$referrer = isset($data['referrer']) ? $data['referrer'] : 'Direct Visit';
$utm_source = isset($data['utmSource']) ? $data['utmSource'] : null;
$utm_medium = isset($data['utmMedium']) ? $data['utmMedium'] : null;
$utm_campaign = isset($data['utmCampaign']) ? $data['utmCampaign'] : null;

$email = isset($data['email']) ? trim($data['email']) : null;
$phone = isset($data['phone']) ? trim($data['phone']) : null;
$telegram = isset($data['telegram']) ? trim($data['telegram']) : null;

$now = date('Y-m-d H:i:s');

try {
    $pdo = get_db_connection();
    $driver = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME);

    // 1. Check if visitor record exists
    $stmt = $pdo->prepare("SELECT id, total_pageviews, total_events FROM visitors WHERE session_id = ?");
    $stmt->execute([$session_id]);
    $visitor = $stmt->fetch();

    $is_new_visitor = false;

    if ($visitor) {
        // Update existing visitor
        $is_pv = ($event_type === 'page_view') ? 1 : 0;
        $sql = "UPDATE visitors SET 
                last_seen = :now, 
                total_events = total_events + 1,
                total_pageviews = total_pageviews + :is_pv";

        $params = [
            ':now' => $now,
            ':is_pv' => $is_pv,
            ':session_id' => $session_id,
        ];

        if ($email) { $sql .= ", contact_email = :email"; $params[':email'] = $email; }
        if ($phone) { $sql .= ", contact_phone = :phone"; $params[':phone'] = $phone; }
        if ($telegram) { $sql .= ", contact_telegram = :telegram"; $params[':telegram'] = $telegram; }

        $sql .= " WHERE session_id = :session_id";
        $updStmt = $pdo->prepare($sql);
        $updStmt->execute($params);
    } else {
        // Insert new visitor
        $is_new_visitor = true;
        $insertSql = "INSERT INTO visitors (
            session_id, first_seen, last_seen, ip_address, country, country_code, city, isp,
            device, browser, os, landing_page, referrer, utm_source, utm_medium, utm_campaign,
            total_pageviews, total_events, contact_email, contact_phone, contact_telegram
        ) VALUES (
            :session_id, :now, :now, :ip, :country, :country_code, :city, :isp,
            :device, :browser, :os, :landing_page, :referrer, :utm_source, :utm_medium, :utm_campaign,
            1, 1, :email, :phone, :telegram
        )";

        $insStmt = $pdo->prepare($insertSql);
        $insStmt->execute([
            ':session_id' => $session_id,
            ':now' => $now,
            ':ip' => $ip,
            ':country' => $country,
            ':country_code' => $country_code,
            ':city' => $city,
            ':isp' => $isp,
            ':device' => $device,
            ':browser' => $browser,
            ':os' => $os,
            ':landing_page' => $page_url,
            ':referrer' => $referrer,
            ':utm_source' => $utm_source,
            ':utm_medium' => $utm_medium,
            ':utm_campaign' => $utm_campaign,
            ':email' => $email,
            ':phone' => $phone,
            ':telegram' => $telegram,
        ]);
    }

    // 2. Insert granular event into visitor_events
    $eventStmt = $pdo->prepare("INSERT INTO visitor_events (session_id, created_at, event_type, page_url, element_id, event_data) VALUES (?, ?, ?, ?, ?, ?)");
    $eventStmt->execute([$session_id, $now, $event_type, $page_url, $element_id, $event_data]);

    // 3. If chat message, also store in chat_messages table
    if ($event_type === 'chat_message' && !empty($event_data)) {
        $chatData = json_decode($event_data, true);
        if ($chatData && isset($chatData['text'])) {
            $sender = (isset($chatData['sender']) && $chatData['sender'] === 'bot') ? 'bot' : 'visitor';
            $step = isset($chatData['step']) ? $chatData['step'] : null;
            $chatStmt = $pdo->prepare("INSERT INTO chat_messages (session_id, created_at, sender, message, step) VALUES (?, ?, ?, ?, ?)");
            $chatStmt->execute([$session_id, $now, $sender, $chatData['text'], $step]);
        }
    }

    // 4. Prune events older than 30 days automatically
    prune_old_events($pdo);

    // 5. If new visitor session, dispatch Telegram Alert
    if ($is_new_visitor && !empty($botToken) && !empty($chatId)) {
        $flags = [
            'ID' => '🇮🇩', 'US' => '🇺🇸', 'GB' => '🇬🇧', 'KH' => '🇰🇭', 'SG' => '🇸🇬', 
            'MY' => '🇲🇾', 'AU' => '🇦🇺', 'CA' => '🇨🇦', 'PK' => '🇵🇰', 'IN' => '🇮🇳',
            'DE' => '🇩🇪', 'NL' => '🇳🇱', 'VN' => '🇻🇳', 'TH' => '🇹🇭', 'PH' => '🇵🇭'
        ];
        $flag = isset($flags[$country_code]) ? $flags[$country_code] : '🌐';

        $msg = "🌐 <b>NEW VISITOR ON NEXALOGIC!</b>\n\n" .
               "{$flag} <b>Location:</b> {$city}, {$country} ({$country_code})\n" .
               "🏢 <b>ISP/Network:</b> <code>{$isp}</code>\n" .
               "📄 <b>Page Landed:</b> <code>{$page_url}</code>\n" .
               "🔗 <b>Source/Referrer:</b> {$referrer}\n" .
               "📱 <b>Device:</b> {$device} ({$browser} on {$os})\n" .
               "🔒 <b>IP:</b> <code>{$ip}</code>\n" .
               "🆔 <b>Session:</b> <code>{$session_id}</code>\n\n" .
               "⏰ <i>{$now}</i>";

        $telegramUrl = "https://api.telegram.org/bot{$botToken}/sendMessage";
        $postFields = [
            'chat_id' => $chatId,
            'text' => $msg,
            'parse_mode' => 'HTML',
            'disable_web_page_preview' => true
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $telegramUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postFields));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        @curl_exec($ch);
    }

    echo json_encode([
        "status" => "success",
        "sessionId" => $session_id,
        "database" => $driver
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>

