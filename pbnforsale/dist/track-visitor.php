<?php
// Nexalogic Technologies - Real-Time Visitor Analytics & Telegram Dispatcher
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$botToken = '8769183923:AAHOTT_9PIqkUBblMFPtADZT2zWNuQyNyhs';
$chatId = '5368545693';
$logFile = __DIR__ . '/visitors.json';

// Handle GET: View recent visitor stats (simple JSON endpoint)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($logFile)) {
        $logs = json_decode(file_get_contents($logFile), true);
        echo json_encode(["status" => "success", "count" => count($logs ?: []), "visitors" => array_slice($logs ?: [], 0, 50)]);
    } else {
        echo json_encode(["status" => "success", "count" => 0, "visitors" => []]);
    }
    exit();
}

// Handle POST: Track incoming visitor
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    $data = $_POST;
}

$ip = isset($_SERVER['HTTP_CF_CONNECTING_IP']) ? $_SERVER['HTTP_CF_CONNECTING_IP'] : (isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0] : $_SERVER['REMOTE_ADDR']);
$country = isset($data['country']) ? $data['country'] : 'Unknown Country';
$countryCode = isset($data['countryCode']) ? strtoupper($data['countryCode']) : '??';
$city = isset($data['city']) ? $data['city'] : 'Unknown City';
$isp = isset($data['isp']) ? $data['isp'] : (isset($data['connection']['isp']) ? $data['connection']['isp'] : 'Unknown ISP');
$page = isset($data['page']) ? $data['page'] : '/';
$referrer = isset($data['referrer']) && !empty($data['referrer']) ? $data['referrer'] : 'Direct Visit';
$device = isset($data['device']) ? $data['device'] : 'Desktop/Browser';
$timestamp = date("Y-m-d H:i:s") . " UTC";

// Map flag emojis
$flags = [
    'ID' => '🇮🇩', 'US' => '🇺🇸', 'GB' => '🇬🇧', 'KH' => '🇰🇭', 'SG' => '🇸🇬', 
    'MY' => '🇲🇾', 'AU' => '🇦🇺', 'CA' => '🇨🇦', 'PK' => '🇵🇰', 'IN' => '🇮🇳',
    'DE' => '🇩🇪', 'NL' => '🇳🇱', 'VN' => '🇻🇳', 'TH' => '🇹🇭', 'PH' => '🇵🇭'
];
$flag = isset($flags[$countryCode]) ? $flags[$countryCode] : '🌐';

// Save to visitors.json log
$entry = [
    'timestamp' => $timestamp,
    'ip' => $ip,
    'country' => $country,
    'countryCode' => $countryCode,
    'city' => $city,
    'isp' => $isp,
    'page' => $page,
    'referrer' => $referrer,
    'device' => $device,
];

$existingLogs = file_exists($logFile) ? json_decode(file_get_contents($logFile), true) : [];
if (!is_array($existingLogs)) $existingLogs = [];
array_unshift($existingLogs, $entry);
if (count($existingLogs) > 200) {
    $existingLogs = array_slice($existingLogs, 0, 200);
}
@file_put_contents($logFile, json_encode($existingLogs, JSON_PRETTY_PRINT));

// Send Instant Alert to Telegram
$msg = "🌐 <b>NEW VISITOR ON NEXALOGIC!</b>\n\n" .
       "{$flag} <b>Location:</b> {$city}, {$country} ({$countryCode})\n" .
       "🏢 <b>ISP/Network:</b> <code>{$isp}</code>\n" .
       "📄 <b>Page Landed:</b> <code>{$page}</code>\n" .
       "🔗 <b>Source/Referrer:</b> {$referrer}\n" .
       "📱 <b>Device:</b> {$device}\n" .
       "🔒 <b>IP:</b> <code>{$ip}</code>\n\n" .
       "⏰ <i>{$timestamp}</i>";

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
curl_setopt($ch, CURLOPT_TIMEOUT, 5);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);
curl_close($ch);

echo json_encode(["status" => "logged", "telegram" => true, "country" => $country]);
