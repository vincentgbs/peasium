<?php

class helloController {

    public function home() {
        echo 'Hello World!';
    }

    public function hello() {
        $data = json_decode(file_get_contents('php://input'), true);
        if ($data !== NULL) {
            echo 'Hello ' . $data["name"] . '!';
        } else {
            echo 'Hello _____!';
        }
    }

}

?>
