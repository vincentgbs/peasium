vanilla.user = {
    onload: async function() {
        console.debug('user.js loaded');
        let status = await vanilla.curl('user', 'GET', null);
        vanilla.body.innerHTML = `<div class="form">
            <h3>Login</h3>
            <input type="text" id="username" placeholder="username"/><br/>
            <input type="password" id="password" placeholder="password"/><br/>
            <button id="login">Login</button><br/>
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
    },
    register: async function() {
        let status = await vanilla.curl('user/home', 'GET', null);
        vanilla.body.innerHTML = `<div class="form">
        <h3>Register</h3>
        <input type="text" id="username" placeholder="username"/><br/>
        <input type="password" id="password" placeholder="password"/><br/>
        <input type="password" id="confirm" placeholder="confirm"/><br/>
        <button id="register">Register</button>
        <div id="displayStatus"></div>
        </div>`;
        if (document.querySelector('#register')) {
            document.querySelector('#register').onclick = async function() {
                document.querySelector('#displayStatus').innerHTML =
                    await vanilla.curl('user/register', 'POST',
                    {'username': document.querySelector('#username').value,
                    'password': document.querySelector('#password').value,
                    'confirm': document.querySelector('#confirm').value});
            }
        }
    }
}
