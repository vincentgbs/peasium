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
