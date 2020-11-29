vanilla.peasium = {
    onload: async function() {
        console.debug('peasium.js loaded');
        vanilla.peasium.nav();
        vanilla.peasium.loadHome();
    },
    nav: function() {
        vanilla.navigation.innerHTML = `<div class="nav">
            <button class="navButton" id="home">Home</button>
            <a href="https://github.com/vincentgbs/peasium">
                <button class="navButton">Github</button></a>
            <button class="navButton" id="documentation">Documentation</button>
            <button class="navButton" id="features">Features</button>
            <button class="navButton" id="tutorials">Tutorials</button>
        </div>`;
        if (document.querySelector('#home')) {
            document.querySelector('#home').onclick = vanilla.peasium.loadHome;
        }
        if (document.querySelector('#documentation')) {
            document.querySelector('#documentation').onclick = vanilla.peasium.loadDocumentation;
        }
        if (document.querySelector('#features')) {
            document.querySelector('#features').onclick = vanilla.peasium.loadFeatures;
        }
        if (document.querySelector('#tutorials')) {
            document.querySelector('#tutorials').onclick = vanilla.peasium.loadTutorials
        }
    },
    loadHome: function() {
        vanilla.body.innerHTML = `<h3>Peasium</h3>
        <p>Peasium is an easy-to-use web framework. We believe development should be a fun, flexible, and creative experience. Peasium uses a simple bare-bones approach, so that developers can focus on building new things instead of spending hours just learning the framework itself. Peasium was designed so that beginner developers could explore the codebase and understand how web applications function in general.</p>
        <p>Peasium uses the simplest approaches to demonstrate one approach to solving a miriad of problems. The simplest approach is not always industry best practice, however, Peasium is not meant for deploying a large-scale production application. For example: Peasium uses SQLite so that new developers do not need to learn how to setup a database. SQLite does not allow for concurrent connections, however, many of its queries are similar in syntax to production database languages.</p>
        <p>Peasium uses as few dependencies as possible, allowing developers the freedom to augment their projects where needed. Peasium is developed using Ubuntu, Apache, and Php. Peasium separates its frontend views from its backend logic. The frontend is built in javascript. The backend is built in Php. Both of these scripting languages are used so that developers can quickly see the effects of code changes. On the frontend, the vanilla javascript 'library' provides a few simple functions to help new developers get started.</p>
        `;
    },
    loadDocumentation: function() {
        vanilla.body.innerHTML = `<h3>Documentation</h3>
        <p>Peasium is easiest when used with Vagrant and VirtualBox. VirtualBox allows users to run guest operating systems on a host computer. Vagrant is a helper program for VirtualBox that makes the "it works on my machine" excuse a relic of the past. Vagrant simplifies sharing directories across the guest and host machines.</p>
        <p>Although a virtual machine is not required to develop on Peasium, it is highly recommended. New developers often make mistakes. Running commands in the terminal can have unintended consequences on your computer. Virtual Machines separate the development environment from your host computer. VMs can easily be created and destroyed if you encounter a bug that you just can't solve. It is good practice to codify your development environment and VMs (and containers) encourage this positive habit.</p>
        <p>After installing VirtualBox (https://www.virtualbox.org/) and Vagrant (https://www.vagrantup.com/), open Terminal. In your terminal, navigate to the directory where you would like to save your work. In order to change directories in terminal, enter the 'cd' (change directory) command, followed by the directory that you would like to go to.</p>
        <pre>
        cd ~/Documents
        cd /var/www/html
        cd /vagrant
        pwd
        cd ../
        </pre>
        <p>The ~ is the home directory of the active user. The / is the root directory of the entire Linux/Unix system. Within the virtual machine, /vagrant is the default shared directory between the guest and host machine. The 'pwd' (present woring directory) command will display the directory that you current terminal session is in. After you 'cd', the 'pwd' will display a different location. The ../ is the directory that contains the current directory that you are in.</p>
        <p>Once you are in the directory where you would like to save your work, download the Peasium repository. The 'git clone' command will download the repository. Git is a version management system used by most developers. 'git' the technology is separate from Github or Gitlab, although both companies are built on git. There are other version management systems, such as Mercurial, Subversion and Team Foundation Server.</p>
        <p>Once the repository is downloaded, the 'vagrant up' command should be run from within the respository. The 'git clone' command will download the repository as a directory, so you will need to 'cd peasium/' before running the vagrant up command. To make sure you are in the right location, use th 'ls -al' command to 'list all' of the files in the pwd. You should see the 'Vagrantfile' along with its permissions, owner, size, and creation date.</p>
        <p>Once the virtual machine is running, you can 'vagrant ssh' to tunnel into (log into) the virtual machine. From inside the VM, cd into the /vagrant/setup/ directory and run the setup.sh script. In order to run the script, you must make the script runnable with 'sudo chmod 700 setup.sh'. sudo is a command that allows you to run commands with administrator permissions. chmod changes the permissions of a file. 700 allows the command user to read, write, and execute a file while removing any such permissions from other users. Once the setup script is executable, you can run the script with 'sudo ./setup.sh'</p>
        <pre>
        apt update
        apt install -y apache2
        apt install -y php7.4 libapache2-mod-php php7.4-curl php7.4-sqlite3
        apachectl restart
        chmod -R 777 /var/www/private/sqlite3/
        </pre>
        <p>Apt-get or apt is a built-in installer for linux systems. The 'apt update' command gets an up-to-date list of programs and their versions. The 'apt upgrade' command would actually update the programs based on the updates the system is notified in apt update, but this command is not necessary. Next, the script will install apache, a web server. Next, the script will install php, along with the php curl and php sqlite mods. These are some minimal dependencies that will help you get started. You may find that as you build more features, you may need more php mods. The apache-php mod will allow apache to run php programs. In addition to installing these dependencies, this command will enable the correct settings for these dependencies. To enable these features, you must restart apache. Finally, the sqlite directory is set to allow the server to modify the databases. WARNING: Typically, chmod 777 is a terrible solution for any permissions issues you encounter!</p>
        <p>Once the server is up and running, you can modify the files from the host machine and see the live updates. When you visit: http://192.168.33.10 on your host browser, you should see the Peasium homepage. You can exit the VM with the control + D command in terminal. The VM and server should continue to run.</p>
        <p>The Apache HTTP Server, typically called apache is a popular web server. The default configuration of apache serves the /var/www/html directory to clients. If you look within the 'src' directory of Peasium, there is an 'html' and a 'private' directory. The 'html' directory is mapped to the /var/www/html directory of the VM/VirtualBox/Vagrant instance. This means that apache servers the html/index.html page when you visit: http://192.168.33.10 on your host browser.</p>
        <p>The http://192.168.33.10/index.html will display the same results as the root page. You can also visit the default router application at http://192.168.33.10/router.php. The router.php page is the entry point for the backend. The index.html page can be viewed in a similar fashion for the frontend.</p>
        <p>The index.html page includes the js/vanilla.js file which can import other javascript and css files on demand. The 'vanilla' object contains some of the common helper functions that would be necessary for a javascript frontend. This is similar to jQuery or other javascript libraries. JS frameworks like React or Angular typically require many more dependencies but can make development of a large scale frontend project more manageable. These frameworks are often written in typescript which needs to be compiled to javascript before a browser can interpret it.</p>
        <p>The router.php page first requires that a config.php is included in the repository. The config file contains settings that the router or applications need to run. Storing all of the configurations in one location makes it easier to maintain them in a small project.</p>
        <p>session_start() creates a PHPSESSID that the server uses to tie future requests from a client to that client. The http is a stateless protocol, so that PHPSESSID is stored as a cookie on the client browser and sent with each request from the client to the server.</p>
        <pre>
        if (isset($_GET['app']) && $_GET['app'] !== '') {
            $function = filter_input(INPUT_GET, 'app', FILTER_SANITIZE_STRING);
            $function = strtolower(preg_replace("/[^a-zA-Z\/]/", '', $function));
            $function = explode('/', $function);
        }
        </pre>
        <p>The $_GET variables in php returns key-value pairs of anything in the url after a ?. For example: http://test.com?key1=value1 would return 'value1' for $_GET['key1']. The router uses ?app= as the basis for calling specific controllers and their functions. If no ?app= is present in a request, the DEFAULTAPP is used. The DEFAULTAPP is set in the config. After the $_GET['app'] is filtered for any non-alphabetic characters, it is split on the / and the first parameter is used to call a controller. The second parameter is used to call the function within that controller. If no second parameter is present, then the home() function is called by default.</p>
        <p>When the router calls a controller, that controller should inherit certain properties from the base controller. Inheritance is an important class concept in object oriented programming that helps you avoid duplicate code. The base controller performs a few basic commands everytime that it is created. The front and backend are completely separate, so nearly all of the calls from the frontend will send a json body as part of its request. The base controller retrieves this data and stores it in a $this->json variable within the controller. It also creates a connection to the sqlite database that each controller can use for its specific queries.</p>
        <p>The getJson function will retrieve the data stored in $this->json with a filter. It is always a good idea to clean and filter input received from users. On the frontend, the vanilla.limitInput() function contains similar filtering ability. It is good to filter on the frontend so that users can understand the restrictions you are placing on the data they can input. It is necessary to filter inputs on the backend because frontend filtering is not secure. Users can manipulate javascript and send custom requests using other programs. You should always assume that input coming into your backend could be malicious.</p>
        <p>The hello controller is a simple Hello World example that does not extend the base controller class. Although it could extend the base controller class, Hello World is a meant to be a simple program that just shows you that your application is work. When you visit /router.php?app=hello/home, you can see the Hello World! message. If you send a POST request with the 'name' variable through the frontend (or a helper program like Postman or SoapUI) you can customize the Hello message with your name.</p>
        <p>The user controller creates a registration, a login, and a logout feature. The password hashing takes an approach that does not require any extra dependencies. There are superior hashing algorithms and approaches (mcrypt, blowfish, argon, etc), but this is a sufficient approach for educational purposes. The 'users' table stores the username, hash, and salt. An application should NEVER store user passwords in plain text. Instead the password should hashed and compared with the expected hash. A hash is a one-way mathematical algorithm that returns a constistent and irreversable output. For example: Pretend that the hash of 'p4ssw0rd' always returns 'E731A7B612AB389FCB7F973C452F33DF3EB69C99'. Given 'E731A....69C99' you should not be able to retrieve 'p4ssw0rd', however, when a user creates their account, you store 'E731A....69C99' and compare it to the output each time they enter 'p4ssw0rd'.</p>
        <p>That is why web applications can reset your password but should not be able to tell you your current password. They can create a new hash, but they should never be able to reverse your hash and should not store your plaintext password. Although a hacker cannot use 'E731A....69C99' to calculate 'p4ssw0rd'. They can use a rainbow table to derive 'p4ss0rd'. The salt is appended to the password and hashed a semi-random number of times so that a rainbow table is less useful.</p>
        <p>The user class uses associative arrays instead of objects for simplicity. One advantage of objects is that the properties are strictly enforced and the methods allow for cleaner encapsulation. Associative arrays are similar to dictionaries in Python or HashMaps in Java. The key-value pairing makes them flexible end easy to use.</p>
        <p>On the frontend, the user forms are simplistic in their approach. Users enter their username and password on the frontend and when the 'Login' button is clicked, that data is sent to the backend in order to be processed. A successful match of username and password will return a 'Logged In' message, while a mismatch will display an 'Invalid Login' message.</p>
        <p>The forum controller adds the ability to post messages on a forum. Each post includes an author, post title, and a post message. If no title is provided, the post title will default to the beginning of the post message. If a user is logged in and posts as themselves, the post will be stored as a verified post. New posts are created by sending a POST request to the router.php?app=forum/post endpoint and all messages (up to 100) can be retrieved from the router.php?app=forum/home endpoint. A DELETE request to the router.php?app=forum/post will truncate the 'posts' table and delete all posts.</p>
        <p>The frontend form for creating posts is quite simple but works in a roundabout manner after sending the POST data to the backend endpoint. If successful, the backend returns a 'Post created' response instead of sending back the backend format of the data. This means that frontend must fake a timestamp in order to display the post immediately. Other viable approaches to this issue are: (1) modify the backend to send the new post data and display it in the same format as the other posts. (2) after submission returns 'Post created', the forum could re-retrieve all the forum posts to display. Peasium uses the 'worst' of these approaches for this problem to show that unimportant issues may be solved with less than ideal solutions.</p>
        <p>As an educational framework, some of the solutions in the Peasium framework are not production ready. Understanding how Peasium and web frameworks in general work can help you to create a production ready web application.</p>
        `;
    },
    loadFeatures: function() {
        vanilla.body.innerHTML = `<h3>Features</h3>
        <p>Peasium provides a number of example controllers with ready-to-use functionality. The <button id="helloWorld">Hello World</button> controller is a standard function among many applications. The default message 'Hello World!' can be changed to greet a user by name through a POST request. The POST request will strip any non-alphabetic characters from the name in its response.</p>
        <p>The <button id="userLogin">User Login</button> example takes a simple approach to validating a user with a password. The default user 'root' has the password 'root' and will display the logged-in status of the user. The <button id="userRegister">Register</button> example allows new users to create a login with the username and password of their choice. There is also an example frontend form for <button id="userChange">Change Password</button> without a backend implementation. Using this form, you can learn Peasium while building your own backend implementation.</p>
        <p>There is also an example <button id="viewForum">Forum</button> application where you can create and post messages. Anonymous posts are allowed, but logging into the application may give your posts an unexpected advantage. You can also delete all the posts if your forum gets too crowded.</p>
        `;
        if (document.querySelector('#helloWorld')) {
            document.querySelector('#helloWorld').onclick = async function() {
                vanilla.loadjs('hello', 'onload');
            }
        }
        if (document.querySelector('#userLogin')) {
            document.querySelector('#userLogin').onclick = async function() {
                vanilla.loadjs('user', 'login');
            }
        }
        if (document.querySelector('#userRegister')) {
            document.querySelector('#userRegister').onclick = async function() {
                vanilla.loadjs('user', 'register');
            }
        }
        if (document.querySelector('#userChange')) {
            document.querySelector('#userChange').onclick = async function() {
                vanilla.loadjs('user', 'change');
            }
        }
        if (document.querySelector('#viewForum')) {
            document.querySelector('#viewForum').onclick = async function() {
                vanilla.loadjs('forum', 'onload');
            }
        }
    },
    loadTutorials: function() {
        vanilla.body.innerHTML = `<h3>Tutorials</h3>
        <p>The hello world example uses router.php to reach the home() and hello() functions within the helloController. Hello World! is a simple function that confirms that an application is running properly on the backend. The frontend javascript sends a simple GET request to 'hello' (/router.php?app=hello) and displays the response. A GET request displays an output similar to the output seen when typing that url into a browser.</p>
        <pre>
        let displayHello = await vanilla.curl('hello', 'GET', null);
        ...
        &lt;div id="displayHello"&gt; + displayHello + &lt;/div&gt;
        </pre>
        <p>The router defaults to the home() function when a second parameter is not present. In the helloController, the home function simply: echoes 'Hello World!' If the backend were not functioning correctly, the router would not properly call helloController->home().</p>
        <h3>Extend the helloController from the base controller</h3>
        <p>Although the helloController is simple and does not need the extra overhead of all of the functions in the base controller. Extending the base controller can reduce some of the duplicated code in the helloController.</p>
        <pre>
        public function __construct() {
            $this->method = strtoupper($_SERVER['REQUEST_METHOD']);
            $this->json = json_decode(file_get_contents('php://input'), true);
        }
        </pre>
        <p>from the helloController looks very similar to the constructor in the base controller: </p>
        <pre>
        $this->method = strtoupper($_SERVER['REQUEST_METHOD']);
        if ($this->headers['Content-Type'] == 'application/json') {
            $this->json = json_decode(file_get_contents('php://input'), true);
        }
        </pre>
        <p>First, include the file that contains the base controller. 'require_once 'controller.php';' And then add ' extends controller' to the class declaration of the helloController.</p>
        <pre>
        require_once 'controller.php';

        class helloController extends controller {
        </pre>
        <p>Now that the helloController extends the base controller, you can delete the __construct() function all together. The helloController will automatically use the base controller's constructor and because no custom functionality is needed, you can omit that code. Finally replace the manual filtering of preg_replace with the base controller->getJson() function.</p>
        <pre>
        echo 'Hello ' . $this->getJson('name', 'alphabetic') . '!';
        </pre>
        <p>The final updated code for the helloController is as follows:</p>
        <pre>
        &lt;?php
        require_once 'controller.php';

        class helloController extends controller {

            public function home() {
                if ($this->method == 'GET') {
                    echo 'Hello World!';
                } else if ($this->method == 'POST') {
                    if (($this->json == NULL) || ($this->json['name'] === NULL)) {
                        exit('Invalid POST request');
                    } else {
                        echo 'Hello ' . $this->getJson('name', 'alphabetic') . '!';
                    }
                }
            }

        }

        ?&gt;
        </pre>
        <h3>Add the change password function on the backend</h3>
        <p>The frontend form for the change password function is already built, so you must build a backend that matches its specification. The frontend form dictates the endpoint and json that will be passed to the backend.</p>
        <pre>
        vanilla.curl('user/updatePassword', 'POST',
        {'oldpass': document.querySelector('#oldpass').value,
        'newpass': document.querySelector('#newpass').value,
        'confirm': document.querySelector('#confirm').value});
        </pre>
        <p>The backend must accept those parameters and update the password in the sqlite database. First uncomment the updatePassword() function, so that the router can properly direct the request.</p>
        <pre>
        public function updatePassword() {
            /* implement a function that can change a users password */
        }
        </pre>
        <p>First ensure that the request is a POST request. In REST applications, the frontend can send: GET, POST, PUT, PATCH, DELETE and more requests. Although a DELETE request could send the same body parameters and could properly update the password, we want to restrict the functionality of the change password to the POST request. This is not a REST application, however this issue introduces some of the concepts from REST. In a REST application, this would be a PUT or a PATCH request because it is updating an object that already exists. In a REST application, GET reads an object, POST creates an object, PUT and PATCH update an object and DELETE removes an object.</p>
        <pre>
        if ($this->method == 'POST') {
            if (!($this->json == NULL) && !($this->json['oldpass'] === NULL)
            && !($this->json['newpass'] === NULL) && !($this->json['confirm'] === NULL)) {
                /* implement code that can changes the password */
                echo 'The POST is sending properly';
            }
        }
        </pre>
        <p>When you are programming, you want to break down your tasks into small manageable iterations. After you have added this code, you should be able to use the change password form on the frontend to verify that your POST request is being received properly on the backend. Next you need to check that the old password matches the password in the system. The username is not sent in the request, but the username is stored on the backend in the SESSION variable.</p>
        <pre>
        $user = [
            'username'=> $_SESSION['username'],
            'password'=>$this->getJson('oldpass', 'alphanumeric')];
        if ($this->checkUserPassword($user)) {
            /* implement code that can changes the password */
            echo 'Updating password';
        } else {
            exit('Invalid password');
        }
        </pre>
        <p>After verifying that the backend properly accepts a valid password and properly rejects an invalid password, add the code that will change the password. First retrieve the 'newpass' and 'confirm' from the frontend, make sure they match, and ensure they meet any other password requirements.</p>
        <pre>
        $user['password'] = $this->getJson('newpass', 'alphanumeric');
        $user['confirm'] = $this->getJson('confirm', 'alphanumeric');
        $this->checkLengths($user, 'username', USERNAMEMINLEN, USERNAMEMAXLEN);
        if ($user['password'] != $user['confirm']) {
            exit('Password and confirmation do not match');
        }
        $this->checkLengths($user, 'password', USERPASSMINLEN, USERPASSMAXLEN);
        </pre>
        <p>Create a private helper function that will update the user password. The helper function can be reused for other user functions, such as a reset password function. The object id (user_id) is often used to update objects, but in this case the 'username' is also a UNIQUE field within the 'users' table. The checkUserPassword function already exists, so it is easier to use it to validate the password. Instead of retrieving the user_id while checking the password. There could be a situation where database queries are a severe bottleneck to your system. In that case, you would want to use as few queries as possible. Since we don't have that constraint, we can query the database multiple times to ensure we have the information we want and update the information that we want. This is just one example of how problems can be solved in a myriad of ways in software development. Your solution depends on the constraints of your system.</p>
        <pre>
        private function updateUserPassword($user) {
            $user['salt'] = $this->semiRandom();
            $user['count'] = random_int(9999, 999999);
            $user['hash'] = $this->hashPassword($user);
            $stmt = $this->db->prepare("UPDATE users
                SET hash=:hash, salt=:salt, count=:count
                WHERE username= :username;");
            $stmt->bindValue(':hash', $user['hash'], SQLITE3_TEXT);
            $stmt->bindValue(':salt', $user['salt'], SQLITE3_TEXT);
            $stmt->bindValue(':count', $user['count'], SQLITE3_INTEGER);
            $stmt->bindValue(':username', $user['username'], SQLITE3_TEXT);
            if($stmt->execute()) {
                return true;
            } else {
                exit('Error updating user password');
            }
        }
        </pre>
        <p>The final backend functions for updating a user password should look like this:</p>
        <pre>
        public function updatePassword() {
            if ($this->method == 'POST') {
                if (!($this->json == NULL) && !($this->json['oldpass'] === NULL)
                && !($this->json['newpass'] === NULL) && !($this->json['confirm'] === NULL)) {
                    $user = [
                        'username'=> $_SESSION['username'],
                        'password'=>$this->getJson('oldpass', 'alphanumeric')];
                    if ($this->checkUserPassword($user)) {
                        $user['password'] = $this->getJson('newpass', 'alphanumeric');
                        $user['confirm'] = $this->getJson('confirm', 'alphanumeric');
                        $this->checkLengths($user, 'username', USERNAMEMINLEN, USERNAMEMAXLEN);
                        if ($user['password'] != $user['confirm']) {
                            exit('Password and confirmation do not match');
                        }
                        $this->checkLengths($user, 'password', USERPASSMINLEN, USERPASSMAXLEN);
                        if($this->updateUserPassword($user)) {
                            echo 'Password updated';
                        }
                    } else {
                        exit('Invalid password');
                    }
                }
            }
        }
        </pre>
        <p>The user controller uses associative arrays instead of objects for simplicity. Let's walk through the conversion to an object oriented approach and see what the advantages and disadvantages are. Begin by creating an objects/ directory with in the private directory of the repository. Within that directory, create a user.php file.
        /src/private/objects/user.php</p>
        <pre>
        &lt;?php

        class user {
        }
        ?&gt;
        </pre>
        <p>In the userController, this file and object must now be imported. Remember to check that your code works at each step of the way during development. This will help you pinpoint issues when you make mistakes. You can test that the user object is importing correctly with a 'new user()' call within a function in the userController, then visit the corresponding url.</p>
        <pre>
        require_once '../objects/user.php';

        /* Example check */
        $check = new user();
        </pre>
        <p>Within the new user class, you will need to add the properties and mehods that the user can access. Typically when creating a class, the properties are private and have publicly available setters and getters. A private property or method is one that can only be accessed by the class itself. For example: a private username within the user class cannot be read through the $user->username from the userController. Instead it has a public $user->getUsername() function that will return the value to the userController. This is to prevent unintended modifications and to allow stricter specifications for how a variable is changed. First, add all of the user attributes:</p>
        <pre>
        private string $username;
        private string $password;
        private string $confirm;
        private string $hash;
        private string $salt;
        private int $count;
        </pre>

        <p>With the separation of the front and backend, routing is handled entirely through GET variables within the AJAX requests. All frontend calls are sent to the 'router.php' file where ?app=_____/_____ routes are split. Apache allows for rewriting of requests to create prettier URLs, but this exposes a simple routing approach.
        <br/>An example of apache's rerouting to create prettier urls:</p>
        <pre>
        RewriteEngine On
        RewriteRule ^([a-zA-Z]+)/([a-zA-Z]+)?$ /router.php?app=$1/$2 [QSA,L,NC]
        RewriteRule ^([a-zA-Z]+)?$ /router.php?app=$1 [QSA,L,NC]
        </pre>
        <p>'RewriteEngine On' must first be enabled with 'a2enmod rewrite' from the command line. This line means that apache will use the Rewrite Engine when processing requests.
        <br/>'RewriteRule ^([a-zA-Z]+)/([a-zA-Z]+)?$ /router.php?app=$1/$2 [QSA,L,NC]' takes a group () of alphabetic (a-zA-Z) characters (+, meaning 1 or more) starting at the beginning of the url (^) up until the first slash (/) and matches them to the first variable in the GET request ($1). Similarly, any alphabetic characters after the first slash are matched to the $2. The rules are matched in the order they're listed.</p>
        `;
    },
}
