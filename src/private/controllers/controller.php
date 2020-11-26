<?php

abstract class controller {

    public function __construct() {
        $this->headers = getallheaders();
    }

}

?>
