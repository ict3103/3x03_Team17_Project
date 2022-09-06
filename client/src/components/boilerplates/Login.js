import '../../styles/login.css'
import {Link} from 'react-router-dom'


function Login(){
    window.localStorage.setItem("login",false);
    return (
    <div class="center form">
        <h1>Login</h1>
        <form action="login" method="post" >
            <div class="txt_field">
            <input type="text" name="inputName" id="inputName" required/>
            <span></span>
            <label for="inputName">Username</label>
            </div>
            <div class="txt_field">
            <input type="password" name="inputPwd" id="inputPwd" required/>
            <span></span>
            <label for="inputPwd">Password</label>
            </div>
            <div class="pass">Forgot Password?</div>
            <input type="submit" style={{"border-radius": "30px;"}}  value="Login"/>
            <div class="signup_link">
            Not a member? <Link to="register">Signup</Link>
            </div>
        </form>
    </div>
    );
}

export default Login;