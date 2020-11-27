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

$controller = $function[0] . 'Controller';
if (is_file('../private/controllers/' . $controller . '.php')) {
    include_once('../private/controllers/' . $controller . '.php');
} else {
    exit('404 Not Found: Missing controller');
}

if (class_exists($controller)) {
    $controller = new $controller();
} else {
    exit('404 Not Found: Missing controller class');
}
if(count($function) == 1) {
    $controller->home();
} else {
    $callFunction = $function[1];
    if (method_exists($controller, $callFunction)) {
        $controller->$callFunction();
    } else {
        exit('404 Not Found: Missing function');
    }
}

$stop = microtime(true);
if(DEBUG == 'ON') {
    echo "<p>" . ($stop - $start) . " microseconds</p>";
    echo "<p>" . memory_get_usage(true) . " bytes</p>";
    echo "</pre>";
}

exit;
?>
