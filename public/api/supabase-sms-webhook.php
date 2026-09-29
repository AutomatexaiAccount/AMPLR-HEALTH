<?php
// Receive the POST request from Supabase Send SMS Hook
$payload = json_decode(file_get_contents('php://input'), true);

// Support both custom database triggers and native Supabase Auth Hooks
$phone = $payload['phone'] ?? $payload['user']['phone'] ?? null;
$otp = $payload['code'] ?? $payload['sms']['otp'] ?? null;

if (!$phone || !$otp) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid payload. Missing phone or OTP."]);
    exit;
}

// The SMS Gateway expects the number without the '+' sign (e.g., 91XXXXXXXXXX)
$formatted_phone = str_replace('+', '', $phone);

// ==========================================
// ⚠️ INNUVIS CREDENTIALS (Updated) ⚠️
// ==========================================
$user = "AMPLR";        
$password = "Paas@123";    
$senderid = "AMPLRH";   
$route = "2";       
$peid = "1701179031390575777";            
$templateid = "1777179067430695884"; // customerregistration template
// ==========================================

// Your approved DLT message template. Make sure this EXACTLY matches your approved DLT template!
// Replacing {#var#} with the $otp variable received from Supabase
$message = "AMPLR HEALTH: Your verification OTP is {$otp}. This OTP is valid for 10 minutes. Please do not share it with anyone.";
$text = urlencode($message);

// Construct the Innuvis API URL
$url = "http://sms.innuvissolutions.com/api/mt/SendSMS?user={$user}&password={$password}&senderid={$senderid}&channel=Trans&DCS=0&flashsms=0&number={$formatted_phone}&text={$text}&route={$route}&Peid={$peid}&DLTTemplateId={$templateid}";

// Send the HTTP Request to the SMS Gateway
$response = file_get_contents($url);

// Return success to Supabase so it knows the SMS was sent
if ($response) {
    http_response_code(200);
    echo json_encode(["success" => true, "gateway_response" => json_decode($response)]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to connect to SMS Gateway"]);
}
?>
