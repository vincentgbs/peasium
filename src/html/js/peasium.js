vanilla.peasium = {
    onload: async function() {
        console.debug('peasium.js loaded');
        vanilla.body.innerHTML = `<div class="main">
            <div class="nav">
                <button class="navButton" id="home">Home</button>
                <a href="https://github.com/vincentgbs/peasium"><button class="navButton">Github</button></a>
                <button class="navButton" id="documentation">Documentation</button>
                <button class="navButton" id="features">Features</button>
            </div>
            <div id="peasiumMainBody"></div>
        </div>`;
        if (document.querySelector('#home')) {
            document.querySelector('#home').onclick = function() {
                vanilla.peasium.loadHome();
            }
        }
        if (document.querySelector('#documentation')) {
            document.querySelector('#documentation').onclick = async function() {
                vanilla.peasium.loadDocumentation();
            }
        }
        if (document.querySelector('#features')) {
            document.querySelector('#features').onclick = async function() {
                vanilla.peasium.loadFeatures();
            }
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
    loadFeatures: function() {
        document.querySelector('#peasiumMainBody').innerHTML = `<h3>Features</h3>`;
    },
}
