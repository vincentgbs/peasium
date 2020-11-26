<?php
require_once '../private/config.php';

session_start();
$start = microtime(true);

if(DEBUG == 'ON') {
    echo "<pre>";
} else {
    error_reporting(0);
}

if (isset($_GET['app'])) {
    $function = explode("/", $_GET['app']);
    foreach($function as &$word) {
        $word = preg_replace('/[^A-z]/', '', $word);
    }
} else {
    $function = [DEFAULTAPP];
}

$app = $function[0] . 'Controller';
try {
    require_once '../private/controllers/' . $app . '.php';
} catch (Exception $e) {
    exit;
}

$controller = new $app();
if(count($function) == 1) {
    $controller->home();
} else {
    $callFunction = $function[1];
    $controller->$callFunction();
}

$stop = microtime(true);
if(DEBUG == 'ON') {
    echo "<p>" . ($stop - $start) . " microseconds</p>";
    echo "<p>" . memory_get_usage(true) . " bytes</p>";
    echo "</pre>";
}

exit;
?>
