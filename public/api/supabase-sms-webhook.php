<?php
$raw = file_get_contents('php://input');

// Log the payload immediately
file_put_contents('/var/www/vhosts/amplrhealth.com/httpdocs/api/sms-debug.txt', 
    date('[Y-m-d H:i:s] ') . "PAYLOAD: " . $raw . "\n", FILE_APPEND);

$payload = json_decode($raw, true);
$phone = $payload['phone'] ?? $payload['user']['phone'] ?? $payload['record']['phone'] ?? null;
$otp = $payload['code'] ?? $payload['sms']['otp'] ?? $payload['token'] ?? null;

// Tell Supabase "OK" immediately so it doesn't time out
$response_body = json_encode(["message" => "ok"]);
http_response_code(200);
header('Content-Type: application/json');
header('Connection: close');
header('Content-Length: ' . strlen($response_body));
echo $response_body;

if (ob_get_level() > 0) { ob_end_flush(); }
flush();
ignore_user_abort(true);

if (!$phone || !$otp) {
    file_put_contents('/var/www/vhosts/amplrhealth.com/httpdocs/api/sms-debug.txt', 
        date('[Y-m-d H:i:s] ') . "ERROR: No phone or OTP\n", FILE_APPEND);
    exit;
}

$formatted_phone = str_replace('+', '', $phone);

// Call Innuvis SMS API
$text = "AMPLR HEALTH: Your verification OTP is " . $otp . ". This OTP is valid for 10 minutes. Please do not share it with anyone.";
$url = "http://sms.innuvissolutions.com/api/mt/SendSMS?user=AMPLR&password=Paas@123&senderid=AMPLR&channel=Trans&DCS=0&flashsms=0&number=" . $formatted_phone . "&text=" . urlencode($text) . "&route=2&Peid=1701179031390575777&DLTTemplateId=1777179067430695864";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$sms_response = curl_exec($ch);
$curl_error   = curl_error($ch);
$http_code    = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Log Innuvis Response
$log = date('[Y-m-d H:i:s] ') . "PHONE: {$formatted_phone} | OTP: {$otp}\n"
     . date('[Y-m-d H:i:s] ') . "INNUVIS_HTTP_CODE: {$http_code} | INNUVIS_RESPONSE: " 
     . ($sms_response === false ? 'FAILED' : $sms_response)
     . " | CURL_ERROR: " . ($curl_error ?: 'none') . "\n";

file_put_contents('/var/www/vhosts/amplrhealth.com/httpdocs/api/sms-debug.txt', $log, FILE_APPEND);
?>
