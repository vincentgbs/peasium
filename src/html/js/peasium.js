vanilla.peasium = {
    onload: async function() {
        console.debug('peasium.js loaded');
        vanilla.body.innerHTML = `<div class="main">
            <div class="nav">
                <button class="navButton" id="home">Home</button>
                <a href="https://github.com/vincentgbs/peasium"><button class="navButton">Github</button></a>
                <button class="navButton" id="documentation">Documentation</button>
                <button class="navButton" id="features">Features</button>
                <button class="navButton" id="tutorials">Tutorials</button>
            </div>
            <div id="peasiumMainBody"></div>
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
        vanilla.peasium.loadHome();
    },
    loadHome: function() {
        document.querySelector('#peasiumMainBody').innerHTML = `<h3>Peasium</h3>
        <p>Peasium is an easy-to-use web application framework. We believe development should be a fun, flexible, and creative experience. Peasium uses a simple bare-bones framework, so that developers do not need to spend all of their time and energy learning the framework and can instead focus on building new things.</p>
        <p>Peasium was designed so that beginner web developers could walk through the codebase and understand how web applications function. Using the simplest approach is not always the industry best practice, however, Peasium is not meant for deployment of a production web application. For example, Peasium uses SQLite3 so that new developers do not need to learn how to setup a separate database.</p>
        <p>Peasium separates its frontend views from its backend logic. The frontend is built in vanilla javascript. The backend is built in plain Php. Both of these scripting languages are used so that developers can augment the code and see the effects quickly. On the frontend, the 'vanilla' javascript object provides a few simple functions to help developers get started.</p>`;
    },
    loadDocumentation: function() {
        document.querySelector('#peasiumMainBody').innerHTML = `<h3>Documentation</h3>
        <p>Starting from the setup: Peasium is built on VirtualBox and Vagrant. VirtualBox is a virtualizer. That means that VirtualBox creates a virtual machine on your computer. With VirtualBox, you are able to test and tinker with many different settings without worrying about messing up any settings on your computer. Vagrant is a helper for VirtualBox that makes setting up and tearing down VMs easier.</p>`;
    },
    loadFeatures: function() {
        document.querySelector('#peasiumMainBody').innerHTML = `<h3>Features</h3>
        <p>The easiest way to get started on Peasium is to look through the example controllers provided. Starting with the <button id="helloWorld">Hello World</button> example. The default message 'Hello World!' can be changed to greet a user by name through a POST request. The POST request will strip any non-alphanumeric characters from the name in its response.</p>
        <p>The <button id="userLogin">User Login</button> example takes a simple approach to validating a user with a password. The default user 'test' has the password 'test' and will display the status of the user. There is also a frontend form without a backend implementation for <button id="userRegister">Registering</button> new users.</p>`;
        if (document.querySelector('#helloWorld')) {
            document.querySelector('#helloWorld').onclick = async function() {
                vanilla.loadjs('helloworld', 'onload');
            }
        }
        if (document.querySelector('#userLogin')) {
            document.querySelector('#userLogin').onclick = async function() {
                vanilla.loadjs('user', 'onload');
            }
        }
        if (document.querySelector('#userRegister')) {
            document.querySelector('#userRegister').onclick = async function() {
                vanilla.loadjs('user', 'register');
            }
        }
    },
    loadTutorials: function() {
        document.querySelector('#peasiumMainBody').innerHTML = `<h3>Tutorials</h3>
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
        <p>First retrieve the JSON variables from the POST request sent. With any user input, it is best to check first that it exists (null check) and also that the input is valid and not malicious. This code will create an variable called $post. $post is an associative array that contains the username, password, and confirm. </p>
        <pre>
        $post = json_decode(file_get_contents('php://input'), true);
        if ($post !== NULL) {
            // register new user...
        }
        </pre>
        <p>The frontend javascript sends the data in this format:</p>
        <pre>
        vanilla.curl('user/register', 'POST',
            {'username': document.querySelector('#username').value,
            'password': document.querySelector('#password').value,
            'confirm': document.querySelector('#confirm').value}
        </pre>
        <p>Once the data is in the $post variable. It must be cleaned before it can be processed. This ensures that users do not enter malicious or invalid content. For the purpose of this tutorial, a simple preg_replace will suffice, although typically a more in-depth approach would be required. In this example, the username is only allowed to have alphabetic characters and the password and its confirmation are only allowed alphanumeric characters.</p>
        <pre>
        $user = [
            'username'=>preg_replace("/[^a-zA-Z]+/", "", $post['username']),
            'password'=>preg_replace("/[^a-zA-Z0-9]+/", "", $post['password']),
            'confirm'=>preg_replace("/[^a-zA-Z0-9]+/", "", $post['confirm'])
        ];
        </pre>
        <p>Use the existing createUser() function in the userController, to create a new user and send an appropriate response to the frontend. The createUser() function will send a 'Error creating user' message to the frontend if there is an error inserting the user into the sqlite database. Php can first check to see if the username already exists and return a more detailed error response.</p>
        <pre>
        if ($this->createUser($user)) {
            echo 'User Created';
        }
        </pre>
        <p>The final result:</p>
        <pre>
        public function register() {
            $post = json_decode(file_get_contents('php://input'), true);
            if ($post !== NULL) {
                $user = [
                    'username'=>preg_replace("/[^a-zA-Z]+/", "", $post['username']),
                    'password'=>preg_replace("/[^a-zA-Z0-9]+/", "", $post['password']),
                    'confirm'=>preg_replace("/[^a-zA-Z0-9]+/", "", $post['confirm'])
                ];
                if ($this->createUser($user)) {
                    echo 'User Created';
                }
            }
        }
        </pre>
        `;
    },
}
