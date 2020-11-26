vanilla.hello = {
    onload: async function() {
        console.debug('hello.js loaded');
        let displayHello = await vanilla.curl('hello', 'GET', null);
        vanilla.body.innerHTML = `<div class="form">
            <input type="text" id="getName" placeholder="name"/>
            <button id="helloWorld">Hello</button>
            <div id="displayHello">` + displayHello + `</div>
        </div>`;
        if (document.querySelector('#helloWorld')) {
            document.querySelector('#helloWorld').onclick = vanilla.hello.helloWorld;
        }
    },
    helloWorld: async function() {
        document.querySelector('#displayHello').innerHTML =
            await vanilla.curl(
                'hello/home', 'POST',
            {'name': document.querySelector('#getName').value}
        );
    },
}
