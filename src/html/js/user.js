vanilla.user = {
    onload: async function() {
        console.debug('user.js loaded');
        let status = await vanilla.curl('user', 'GET', null);
        vanilla.body.innerHTML = `<div class="form">
            <input type="text" id="username" placeholder="username"/>
            <input type="password" id="password" placeholder="password"/>
            <button id="login">Login</button>
            <button id="logout">Logout</button>
            <div id="displayStatus">` + status + `</div>
        </div>`;
        if (document.querySelector('#login')) {
            document.querySelector('#login').onclick = async function() {
                document.querySelector('#displayStatus').innerHTML =
                    await vanilla.curl('user/login', 'POST',
                {'username': document.querySelector('#username').value,
                'password': document.querySelector('#password').value});
            }
        }
        if (document.querySelector('#logout')) {
            document.querySelector('#logout').onclick = async function() {
                document.querySelector('#displayStatus').innerHTML =
                    await vanilla.curl('user/logout', 'GET', null);
            }
        }
    }
}
