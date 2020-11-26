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
        document.querySelector('#peasiumMainBody').innerHTML = `Peasium is an easy-to-use web application framework. We believe development should be a fun, flexible, and creative experience. Peasium uses a simple bare-bones framework, so that developers do not need to spend all of their time and energy learning the framework and can instead focus on building new things.`;
    },
    loadDocumentation: function() {
        document.querySelector('#peasiumMainBody').innerHTML = `Documentation`;
    },
    loadFeatures: function() {
        document.querySelector('#peasiumMainBody').innerHTML = `Features`;
    },
}
