<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

// Load .env variables (Simple parser since Plesk doesn't auto-load .env for PHP by default)
$envFile = __DIR__ . '/../../.env'; // Adjust path if needed depending on where .env is placed on server
$clientId = ''; // Need to be set via .env
$clientSecret = '';

if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        if (trim($name) == 'VITE_CASHFREE_CLIENT_ID') $clientId = trim($value);
        if (trim($name) == 'VITE_CASHFREE_CLIENT_SECRET') $clientSecret = trim($value);
    }
}

// Get the POST data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON payload"]);
    exit();
}

$order_id = "ORDER_" . time() . "_" . rand(1000, 9999);
$data = [
    "order_id" => $order_id,
    "order_amount" => $input['order_amount'],
    "order_currency" => "INR",
    "customer_details" => [
        "customer_id" => isset($input['customer_id']) ? substr(preg_replace('/[^a-zA-Z0-9_]/', '_', $input['customer_id']), 0, 50) : "CUST_" . time(),
        "customer_name" => $input['customer_name'] ?? "Customer",
        "customer_email" => $input['customer_email'] ?? "test@example.com",
        "customer_phone" => isset($input['customer_phone']) ? substr(preg_replace('/[^0-9]/', '', $input['customer_phone']), 0, 14) : "9999999999"
    ],
    "order_meta" => [
        "return_url" => (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]/" . ($input['return_path'] ?? '') . "?order_id={order_id}"
    ]
];

$ch = curl_init('https://sandbox.cashfree.com/pg/orders');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-api-version: 2023-08-01',
    'x-client-id: ' . $clientId,
    'x-client-secret: ' . $clientSecret
]);

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpcode);
echo $response;
?>
