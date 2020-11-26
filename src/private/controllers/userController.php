<?php
require_once 'controller.php';

class userController extends controller {

    public function __construct() {
        parent::__construct();
        $this->checkUserTableMigration();
    }

    private function checkUserTableMigration() {
        $checkUserTableExists = "SELECT COUNT(`name`) FROM `sqlite_master`
            WHERE `type`='table' AND `name`='users';";
        if ($this->db->querySingle($checkUserTableExists) == 0) {
            $createUserTable = "CREATE TABLE `users`
                (`user_id` INTEGER PRIMARY KEY, `username` TEXT UNIQUE,
                `hash` TEXT, `salt` TEXT, `count` INTEGER,
                `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP);";
            if (!$this->db->exec($createUserTable)) {
                exit('Error creating `users` table');
            }
            $user = ['username'=>'root', 'password'=>'root'];
            if (!$this->checkUserExists($user)) {
                $this->createUser($user);
            }
        }
    }

    private function semiRandom() {
        return md5(uniqid(rand(), true));
    }

    private function hashPassword($user) {
        sleep(random_int(9999, 999999) * 0.000001);
        $hash = hash('md5', $user['password'] . $user['salt']);
        for($i = 1; $i < $user['count']; $i++) {
            $hash = hash('md5', $hash . $user['salt']);
        }
        return $hash;
    }

    private function checkUserPassword($user) {
        $stmt = $this->db->prepare("SELECT `hash`, `salt`, `count`
            FROM `users` WHERE `username`=:username;");
        $stmt->bindValue(':username', $user['username'], SQLITE3_TEXT);
        $check = $stmt->execute();
        if($check) {
            $check = $check->fetchArray();
            if ($check !== false) {
                $user['salt'] = $check['salt'];
                $user['count'] = $check['count'];
                if($check['hash'] == $this->hashPassword($user)) {
                    return true;
                }
            }
        }
        return false;
    }

    private function checkUserExists($user) {
        $stmt = $this->db->prepare("SELECT `username`
            FROM `users` WHERE `username`=:username;");
        $stmt->bindValue(':username', $user['username'], SQLITE3_TEXT);
        $check = $stmt->execute();
        if($check) {
            $check = $check->fetchArray();
            if ($check !== false) {
                return true;
            }
        }
        return false;
    }

    private function createUser($user) {
        $user['salt'] = $this->semiRandom();
        $user['count'] = random_int(9999, 999999);
        $user['hash'] = $this->hashPassword($user);
        $stmt = $this->db->prepare("INSERT INTO `users`
            (`username`, `hash`, `salt`, `count`) VALUES
            (:username, :hash, :salt, :count);");
        $stmt->bindValue(':username', $user['username'], SQLITE3_TEXT);
        $stmt->bindValue(':hash', $user['hash'], SQLITE3_TEXT);
        $stmt->bindValue(':salt', $user['salt'], SQLITE3_TEXT);
        $stmt->bindValue(':count', $user['count'], SQLITE3_INTEGER);
        if (!$stmt->execute()) {
            echo 'Error creating user: ' . $user['username'] . '<br/>';
            exit($this->db->lastErrorMsg());
        }
        return true;
    }

    private function setLogin($user) {
        $_SESSION['username'] = $user['username'];
    }

    public function home() {
        if ($this->isUserLoggedIn()) {
            echo 'Logged In';
        } else {
            echo 'Logged Out';
        }
    }

    public function register() {
        if ($this->method == 'POST') {
            if (!($this->json == NULL) && !($this->json['username'] === NULL)) {
                $user = [
                    'username'=>$this->getJson('username', 'alphabetic'),
                    'password'=>$this->getJson('password', 'alphanumeric'),
                    'confirm'=>$this->getJson('password', 'confirm')
                ];
                if ($this->checkUserExists($user)) {
                    exit('That user already exists');
                }
                if (strlen($user['username']) < USERNAMEMINLEN) {
                    exit('That username is too short');
                }
                if (strlen($user['username']) > USERNAMEMAXLEN) {
                    exit('That username is too long');
                }
                if ($user['password'] != $user['confirm']) {
                    exit('Password and confirmation do not match');
                }
                if (strlen($user['password']) < USERPASSMINLEN) {
                    exit('That password is too short');
                }
                if (strlen($user['password']) > USERPASSMAXLEN) {
                    exit('That password is too long');
                }
                if ($this->createUser($user)) {
                    echo 'User created';
                }
            }
        }
    }

    public function login() {
        if ($this->method == 'POST') {
            if (!($this->json == NULL) && !($this->json['username'] === NULL)) {
                $user = [
                    'username'=>$this->getJson('username', 'alphabetic'),
                    'password'=>$this->getJson('password', 'alphanumeric')];
                if ($this->checkUserPassword($user)) {
                    $this->setLogin($user);
                    echo 'Logged In';
                } else {
                    exit('Invalid Login');
                }
            }
        }
    }

    public function logout() {
        session_unset();
        session_destroy();
        exit('Logged Out');
    }

    // public function changePassword() {
    //     /* implement a function that can change a users password */
    // }

}

?>
