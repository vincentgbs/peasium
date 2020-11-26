<?php
if (is_file('../private/config.php')) {
    include_once('../private/config.php');
} else {
    exit('Missing configuration file');
}

session_start();
$start = microtime(true);

if(DEBUG == 'ON') {
    echo "<pre>";
    error_reporting(E_ALL);
} else {
    error_reporting(E_ERROR);
}

if (isset($_GET['app']) && $_GET['app'] !== '') {
    $function = filter_input(INPUT_GET, 'app', FILTER_SANITIZE_STRING);
    $function = strtolower(preg_replace("/[^a-zA-Z\/]/", '', $function));
    $function = explode('/', $function);
} else {
    $function = [DEFAULTAPP];
}

$app = $function[0] . 'Controller';
if (is_file('../private/controllers/' . $app . '.php')) {
    include_once('../private/controllers/' . $app . '.php');
} else {
    exit('404 Error: Missing controller');
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
