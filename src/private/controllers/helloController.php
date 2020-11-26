<?php
require_once 'controller.php';

class helloController extends controller {

    public function home() {
        if ($this->method == 'GET') {
            echo 'Hello World!';
        } else if ($this->method == 'POST') {
            if ($this->json == NULL || $this->json['name'] == NULL) {
                echo 'Hello _____!';
            } else {
                echo 'Hello ' . $this->getJson('name', 'alphabetic') . '!';
            }
        }
    }

}

?>
