var vanilla = {
    settings: {
        flashMessageTimer: 2500,
    },
    render: async function() {
        vanilla.body = document.createElement('div');
        vanilla.body.setAttribute('id', 'body');
        document.body.appendChild(vanilla.body);
        let flashMessage = document.createElement('div');
        flashMessage.setAttribute('id', 'flashMessage');
        document.body.appendChild(flashMessage);
        /* Hello World! example */
        vanilla.loadjs('helloworld', true);
    },
    loadjs: function(src) {
        let script = document.createElement('script');
        script.onload = function () {
            vanilla[src].onload();
        };
        script.src = 'js/' + src + '.js';
        document.head.appendChild(script);
    },
    loadcss: function(href) {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'css/' + href + '.css');
        document.head.appendChild(link);
    },
    curl: function(url, method, body) {
        console.debug(url, method, body);
        let xhr = new XMLHttpRequest();
        return new Promise(resolve => {
            xhr.open(method, '/router.php?app=' + url);
            xhr.onload = function () {
                console.debug(xhr.response);
                resolve(xhr.response);
            };
            xhr.onerror = function() {
                console.debug('Connection Error');
                resolve(null);
            };
            try {
                xhr.send(
                    JSON.stringify(body)
                );
            } catch (err) {
                console.debug(err);
                console.debug(request);
            }
        });
    },
    flashMessage: function(message) {
        let div = document.querySelector("#flashMessage");
        div.innerText = message;
        div.style.display = 'block';
        setTimeout(function() {
            div.innerText = '';
            div.style.display = 'none';
        }, vanilla.settings.flashMessageTimer);
    },
}

document.addEventListener("DOMContentLoaded", function() {
    console.debug('vanilla.js loaded');
    vanilla.render();
});
