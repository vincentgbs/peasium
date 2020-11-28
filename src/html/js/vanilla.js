var vanilla = {
    settings: {
        flashMessageTimer: 3000,
    },
    render: function() {
        vanilla.navigation = vanilla.createDiv('navigation');
        document.body.appendChild(vanilla.navigation);
        vanilla.body = vanilla.createDiv('body');
        document.body.appendChild(vanilla.body);
        document.body.appendChild(
            vanilla.createDiv('flashMessage')
        );
        vanilla.loadjs('peasium', 'onload');
    },
    curl: function(url, method, body) {
        console.debug(url, method, body);
        let xhr = new XMLHttpRequest();
        return new Promise(resolve => {
            xhr.open(method, '/router.php?app=' + url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                console.debug(xhr.response);
                resolve(xhr.response);
            };
            xhr.onerror = function() {
                vanilla.flashMessage('Connection Error');
                resolve(null);
            };
            try {
                xhr.send(JSON.stringify(body));
            } catch (err) {
                console.debug(err);
            }
        });
    },
    loadjs: function(src, onload) {
        let script = document.createElement('script');
        script.onload = function(){
            vanilla[src][onload]();
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
    flashMessage: function(message) {
        let div = document.querySelector("#flashMessage");
        div.innerText = message;
        div.style.display = 'block';
        setTimeout(function() {
            div.innerText = '';
            div.style.display = 'none';
        }, vanilla.settings.flashMessageTimer);
    },
    limitInput: function(element, limit) {
        if (limit == 'numeric') {
            element.value = element.value.replace(/\D/g, '');
        } else if (limit == 'alphabetic') {
            element.value = element.value.replace(/[^a-zA-Z]/g, '');
        } else if (limit == 'alphanumeric') {
            element.value = element.value.replace(/[^a-zA-Z0-9]/g, '');
        } else {
            element.value = element.value.replace(limit, '');
        }
    },
    createDiv: function(divId=false, divClass=false, divText=false) {
        let div = document.createElement('div');
        if (divId) {
            div.setAttribute('id', divId);
        }
        if (divClass) {
            div.setAttribute('class', divClass);
        }
        if (divText) {
            div.innerText = divText;
        }
        return div;
    },
    createRow: function(datas) {
        let row = vanilla.createDiv(false, 'tr');
        for(let i = 0; i < datas.length; i++) {
            row.appendChild(datas[i]);
        }
        return row;
    },
}

document.addEventListener("DOMContentLoaded", function() {
    console.debug('vanilla.js loaded');
    vanilla.render();
});
