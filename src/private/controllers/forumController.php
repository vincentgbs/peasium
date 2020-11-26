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
                `title` TEXT, `post` TEXT, `verified` INTEGER,
                `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP);";
            if (!$this->db->exec($createUserTable)) {
                exit('Error creating `posts` table');
            }
            $post = ['author'=>'root', 'title'=>'example', 'post'=>'example post'];
            $this->createPost($post);
        }
    }

    private function createPost($post) {
        if ($this->isUserLoggedIn()
        && ($post['author']==$_SESSION['username'])) {
            $post['verified'] = 1;
        } else {
            $post['verified'] = 0;
        }
        $stmt = $this->db->prepare("INSERT INTO `posts`
            (`author`, `title`, `post`, `verified`) VALUES
            (:author, :title, :post, :verified);");
        $stmt->bindValue(':author', $post['author'], SQLITE3_TEXT);
        $stmt->bindValue(':title', $post['title'], SQLITE3_TEXT);
        $stmt->bindValue(':post', $post['post'], SQLITE3_TEXT);
        $stmt->bindValue(':verified', $post['verified'], SQLITE3_INTEGER);
        if (!$stmt->execute()) {
            echo 'Error creating post: ' . $post['title'] . '<br/>';
            exit($this->db->lastErrorMsg());
        }
        return true;
    }

    public function post() {
        if ($this->method == 'POST') {
            $post = [
                'author'=>$this->getJson('author', 'alphanumeric'),
                'title'=>$this->getJson('title', "/[^a-zA-Z0-9 ]+/"),
                'post'=>$this->getJson('post', "/[^a-zA-Z0-9 ]+/")
            ];
            if ($post['title'] == '') {
                $post['title'] = substr($post['post'], 0, FORUMTITLEMAX);
            }
            $post['author'] = substr($post['author'], 0, FORUMAUTHORMAX);
            $post['title'] = substr($post['title'], 0, FORUMTITLEMAX);
            $post['post'] = substr($post['post'], 0, FORUMPOSTMAX);
        }
    }

    public function home() {
        $result = $this->db->query("SELECT * FROM `posts` LIMIT 100;");
        $posts = array();
        while ($row = $result->fetchArray()) {
            $posts[] = [
                'post_id'=>$row['post_id'],
                'author'=>$row['author'],
                'title'=>$row['title'],
                'post'=>$row['post'],
                'verified'=>$row['verified']
            ];
        }
        echo json_encode($posts);
    }

}
?>
