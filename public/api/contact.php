<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (empty($input['name']) || empty($input['email']) || empty($input['subject']) || empty($input['message'])) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required']);
        exit;
    }

    // Validate email
    if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format']);
        exit;
    }

    // Configure email
    $to = 'rafalkmiecik@gmail.com';
    $subject = 'Portfolio Contact: ' . strip_tags($input['subject']);
    
    $message = "Name: " . strip_tags($input['name']) . "\n";
    $message .= "Email: " . strip_tags($input['email']) . "\n\n";
    $message .= "Message:\n" . strip_tags($input['message']);
    
    $headers = "From: " . strip_tags($input['email']) . "\r\n";
    $headers .= "Reply-To: " . strip_tags($input['email']) . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['message' => 'Message sent successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send message']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
