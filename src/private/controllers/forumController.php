<?php
require_once 'controller.php';

class forumController extends controller {

    public function __construct() {
        parent::__construct();
        $this->checkForumTableMigration();
    }

    private function checkForumTableMigration() {
        $checkUserTableExists = "SELECT COUNT(`name`) FROM `sqlite_master`
            WHERE `type`='table' AND `name`='posts';";
        if ($this->db->querySingle($checkUserTableExists) == 0) {
            $createUserTable = "CREATE TABLE `posts`
                (`post_id` INTEGER PRIMARY KEY, `author` TEXT,
                `title` TEXT, `post` TEXT, `likes` INTEGER,
                `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP);";
            if (!$this->db->exec($createUserTable)) {
                exit('Error creating `posts` table');
            }
        }
    }

    public function home() {
        //
    }

}
?>
