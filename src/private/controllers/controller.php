<?php

abstract class controller {

    protected function __construct() {
        $this->headers = getallheaders();
        $this->method = strtoupper($_SERVER['REQUEST_METHOD']);
        if ($this->headers['Content-Type'] == 'application/json') {
            $this->json = json_decode(file_get_contents('php://input'), true);
        }
        $this->sqliteFile = '../private/sqlite3/peasium.db';
        try {
            $this->db = new SQLite3($this->sqliteFile, SQLITE3_OPEN_READWRITE);
        } catch (Exception $e) {
            $this->db = new SQLite3($this->sqliteFile, SQLITE3_OPEN_READWRITE | SQLITE3_OPEN_CREATE);
            chmod($this->sqliteFile, 0777);
        }
    }

    protected function getJson($key, $filter) {
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
            default:
                return preg_replace($filter, "", $this->json[$key]);
        }
    }

    protected function isUserLoggedIn() {
        if (isset($_SESSION['username']) && $_SESSION['username']) {
            return true;
        } else {
            return false;
        }
    }

}

?>
