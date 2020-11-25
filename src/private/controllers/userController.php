<?php

class userController {

    public function home() {
        try {
            $db = new SQLite3('../private/sqlite3/users.db');
        } catch (Exception $e) {
            exit;
        }
    }

}

?>
