let vanilla = {
    load: async function(div) {
        div.innerHTML = await vanilla.curl('/router.php', 'GET', null);
    },
    xhr: new XMLHttpRequest(),
    curl: function(url, method, body) {
        console.debug(url, method, body);
        return new Promise(resolve => {
            vanilla.xhr.open(method, url);
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
