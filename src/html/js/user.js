vanilla.user = {
    login: async function() {
        console.debug('user.js loaded');
        let status = await vanilla.curl('user', 'GET', null);
        vanilla.body.innerHTML = `<div class="form">
            <h3>Login</h3>
            <input type="text" id="username" placeholder="username" onkeyup="vanilla.limitInput(this, 'alphabetic');"/><br/>
            <input type="password" id="password" placeholder="password"
            onkeyup="vanilla.limitInput(this, 'alphanumeric');"/><br/>
            <button id="login">Login</button> <button id="logout">Logout</button><br/>
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
    register: function() {
        vanilla.body.innerHTML = `<div class="form">
        <h3>Register</h3>
        <input type="text" id="username" placeholder="username" onkeyup="vanilla.limitInput(this, 'alphabetic');"/><br/>
        <input type="password" id="password" placeholder="password"
        onkeyup="vanilla.limitInput(this, 'alphanumeric');"/><br/>
        <input type="password" id="confirm" placeholder="confirm"
        onkeyup="vanilla.limitInput(this, 'alphanumeric');"/><br/>
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
    },
    change: function() {
        vanilla.body.innerHTML = `<div class="form">
        <h3>Change Password</h3>
        <input type="text" id="oldpass" placeholder="old password" onkeyup="vanilla.limitInput(this, 'alphanumeric');"/><br/>
        <input type="password" id="newpass" placeholder="new password"
        onkeyup="vanilla.limitInput(this, 'alphanumeric');"/><br/>
        <input type="password" id="confirm" placeholder="confirm new password"
        onkeyup="vanilla.limitInput(this, 'alphanumeric');"/><br/>
        <button id="update">Update Password</button>
        <div id="displayStatus"></div>
        </div>`;
        if (document.querySelector('#update')) {
            document.querySelector('#update').onclick = async function() {
                document.querySelector('#displayStatus').innerHTML =
                    await vanilla.curl('user/updatePassword', 'POST',
                    {'oldpass': document.querySelector('#oldpass').value,
                    'newpass': document.querySelector('#newpass').value,
                    'confirm': document.querySelector('#confirm').value});
            }
        }
    }
}
