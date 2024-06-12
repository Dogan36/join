<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

########### CONFIG ###############
// Du musst den Empfänger dynamisch aus dem POST-Request nehmen
$recipient = isset($_POST['mail']) ? $_POST['mail'] : 'dogancelik86@gmail.com';
########### CONFIG END ###########

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: content-type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    error_log("POST-Parameter: " . print_r($_POST, true));

    if (!isset($_POST['name']) || !isset($_POST['message']) || !isset($_POST['mail'])) {
        http_response_code(400);
        echo 'Missing required POST parameters';
        exit;
    }

    $subject = "Contact From " . $_POST['name'];
    $headers = "From: noreply@developerakademie.com";
    $mailSent = mail($recipient, $subject, $_POST['message'], $headers);

    if ($mailSent) {
        echo 'success';
    } else {
        http_response_code(500);
        echo 'Error sending email';
    }
} else {
    header("Allow: POST", true, 405);
    exit;
}
?>