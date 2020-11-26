vanilla.helloworld = {
    onload: async function() {
        console.debug('helloworld.js loaded');
        let displayHello = await vanilla.curl('hello', 'GET', null);
        vanilla.body.innerHTML = vanilla.peasium.nav() + `<div class="form">
            <input type="text" id="getName" placeholder="name"/>
            <button id="helloWorld">Hello</button>
            <div id="displayHello">` + displayHello + `</div>
        </div>`;
        if (document.querySelector('#helloWorld')) {
            document.querySelector('#helloWorld').onclick = async function() {
                document.querySelector('#displayHello').innerHTML = await vanilla.curl('hello/hello', 'POST', {'name': document.querySelector('#getName').value});
            }
        }
    },
}
