<?php
require_once 'controller.php';

class helloController {

    public function __construct() {
        $this->method = strtoupper($_SERVER['REQUEST_METHOD']);
        $this->json = json_decode(file_get_contents('php://input'), true);
    }

    public function home() {
        if ($this->method == 'GET') {
            echo 'Hello World!';
        } else if ($this->method == 'POST') {
            if (($this->json == NULL) || ($this->json['name'] === NULL)) {
                exit('Invalid POST request');
            } else {
                echo 'Hello ' . preg_replace("/[^a-zA-Z]+/", "", $this->json['name']) . '!';
            }
        }
    }

}

?>
