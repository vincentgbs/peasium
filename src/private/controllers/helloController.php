<?php

class helloController {

    public function home() {
        echo 'Hello World!';
    }

    public function hello() {
        $post = json_decode(file_get_contents('php://input'), true);
        if ($post !== NULL) {
            echo 'Hello ' . preg_replace("/[^a-zA-Z]+/", "", $post['name']) . '!';
        } else {
            echo 'Hello _____!';
        }
    }

}

?>
