let vanilla = {
    load: async function(div) {
        let displayHello = await vanilla.curl('hello', 'GET', null);
        div.innerHTML = `<div class="form">
            <input type="text" id="getName"/>
            <button id="helloWorld">Hello</button>
            <div id="displayHello">` + displayHello + `</div>
        </div>`;
        document.querySelector('#helloWorld').onclick = function() {
            vanilla.helloWorld();
        }
    },
    helloWorld: async function() {
        document.querySelector('#displayHello').innerHTML = await vanilla.curl('hello/hello', 'POST', {'name': document.querySelector('#getName').value});
    },
    xhr: new XMLHttpRequest(),
    curl: function(url, method, body) {
        console.debug(url, method, body);
        return new Promise(resolve => {
            vanilla.xhr.open(method, '/router.php?app=' + url);
            vanilla.xhr.onload = function () {
                console.debug(vanilla.xhr.response);
                resolve(vanilla.xhr.response);
            };
            vanilla.xhr.onerror = function() {
                console.debug('Connection Error');
                resolve(null);
            };
            try {
                vanilla.xhr.send(
                    JSON.stringify(body)
                );
            } catch (err) {
                console.debug(err);
                console.debug(request);
            }
        });
    },
}

document.addEventListener("DOMContentLoaded", function() {
    console.debug('vanilla.js loaded');
    vanilla.load(document.querySelector('#app'));
});
