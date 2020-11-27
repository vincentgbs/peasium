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
        <p>When the router calls a controller, that controller should inherit certain properties from the base controller. Inheritance is an important class concept in object oriented programming that helps you avoid duplicate code.</p>
        <p></p>
        `;
    },
    loadFeatures: function() {
        vanilla.body.innerHTML = `<h3>Features</h3>
        <p>The easiest way to get started on Peasium is to look through the example controllers provided. Starting with the <button id="helloWorld">Hello World</button> example. The default message 'Hello World!' can be changed to greet a user by name through a POST request. The POST request will strip any non-alphanumeric characters from the name in its response.</p>
        <p>The <button id="userLogin">User Login</button> example takes a simple approach to validating a user with a password. The default user 'test' has the password 'test' and will display the status of the user. The <button id="userRegister">Register</button> example allows new users to create a login. There is also a frontend form without a backend implementation for <button id="userChange">Change Password</button> where you can practice your own backend development.</p>
        <p>There is also a sample <button id="viewForum">Forum</button> where you can create and post your thoughts. Anonymous posts are allowed, but logging into the application can give your posts an advantage.</p>
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
        <p>With the separation of the front and backend, routing is handled entirely through GET variables within the AJAX requests. All frontend calls are sent to the 'router.php' file where ?app=_____/_____ routes are split. Apache allows for rewriting of requests to create prettier URLs, but this exposes a simple routing approach.
        <br/>An example of apache's rerouting to create prettier urls:</p>
        <pre>
        RewriteEngine On
        RewriteRule ^([a-zA-Z]+)/([a-zA-Z]+)?$ /router.php?app=$1/$2 [QSA,L,NC]
        RewriteRule ^([a-zA-Z]+)?$ /router.php?app=$1 [QSA,L,NC]
        </pre>
        <p>'RewriteEngine On' must first be enabled with 'a2enmod rewrite' from the command line. This line means that apache will use the Rewrite Engine when processing requests.
        <br/>'RewriteRule ^([a-zA-Z]+)/([a-zA-Z]+)?$ /router.php?app=$1/$2 [QSA,L,NC]' takes a group () of alphabetic (a-zA-Z) characters (+, meaning 1 or more) starting at the beginning of the url (^) up until the first slash (/) and matches them to the first variable in the GET request ($1). Similarly, any alphabetic characters after the first slash are matched to the $2. The rules are matched in the order they're listed.</p>
        <p>The hello world example uses this routing to reach the home() and hello() functions within the helloController. Hello World! is a simple check that the code is compiling properly on the backend. The frontend javascript sends a simple GET request to 'hello' (/router.php?app=hello) and displays the response. A GET request will   display an output similar to the output seen when typing the url into a browser.</p>
        <pre>
        let displayHello = await vanilla.curl('hello', 'GET', null);
        ...
        &lt;div id="displayHello"&gt; + displayHello + &lt;/div&gt;
        </pre>
        <p>The router defaults to the home() function when a second parameter is not present. In the helloController, the home function simply: echoes 'Hello World!' If the backend were not functioning correctly, the router might not properly call helloController->home().</p>
        `;
    },
}
