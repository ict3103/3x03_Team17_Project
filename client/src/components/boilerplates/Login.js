import '../../styles/login.css'
import {Link} from 'react-router-dom'
import {React , useState} from 'react';
import { Button } from 'react-bootstrap';



function Login(){
    const [forgotPwd,setforgotPwd] = useState(false)
    const changeState = ()=>{
        setforgotPwd(true)
    }
    
    window.localStorage.setItem("login",false);
    return (

    (forgotPwd===false)?
        <div class="center form">
            <h1>Login</h1>
            <form action="login" method="post" >
                <div class="txt_field">
                <input type="text" name="inputName" id="inputName" required/>
                <span></span>
                <label for="inputName">Email</label>
                </div>
                <div class="txt_field">
                <input type="password" name="inputPwd" id="inputPwd" required/>
                <span></span>
                <label for="inputPwd">Password</label>
                </div>
                <div class="pass" onClick={changeState} >Forgot Password?</div>
                <input type="submit" style={{"border-radius": "30px;"}}  value="Login"/>
                <div class="signup_link">
                Not a member? <Link to="register">Signup</Link></div>
                </form>
            </div>
            :
        //--------forgot password form ---------
        <div class="center form" style={{'height':'400px'}}>
            <img src={require("../../images/forgot_password.png")} id='forgotIcon' alt=''></img>
            <h1>Reset password</h1>
            <form action="forgotPassword" method="post">
                <div class="txt_field">
                    <input type="email" name="email" id="email" placeholder="enter your email" required/>
                    <span></span>
                </div>
                <div> 
                    <Button type='submit' variant="dark" style={{'width':'fit-content','margin-left':'50px'}}>Reset password</Button>
                    <Link to="/"><Button variant="dark" style={{'width':'fit-content'}}>Back</Button></Link>
                </div>
            </form>
        </div>
          //------------------------------------
    );
}

export default Login;