<?php

abstract class controller {

    public function __construct() {
        $this->headers = getallheaders();
        $this->method = strtoupper($_SERVER['REQUEST_METHOD']);
        if ($this->headers['Content-Type'] == 'application/json') {
            $this->json = json_decode(file_get_contents('php://input'), true);
        }
    }

    public function getJson($key, $filter) {
        switch ($filter) {
            case 'numeric':
                return preg_replace("/[^0-9]+/", "", $this->json[$key]);
                break;
            case 'alphabetic':
                return preg_replace("/[^a-zA-Z]+/", "", $this->json[$key]);
                break;
            case 'alphanumeric':
                return preg_replace("/[^a-zA-Z0-9]+/", "", $this->json[$key]);
                break;
        }
    }

}

?>
