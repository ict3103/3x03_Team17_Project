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
        <div className="center form">
            <h1>Login</h1>
            <form action="login" method="post" >
                <div className="txt_field">
                <input type="email" name="email" id="email" required/>
                <span></span>
                <label htmlFor="email">Email</label>
                </div>
                <div className="txt_field">
                <input type="password" name="inputPwd" id="inputPwd" required/>
                <span></span>
                <label htmlFor="inputPwd">Password</label>
                </div>
                <div className="pass" onClick={changeState} >Forgot Password?</div>
                <input type="submit" style={{borderRadius: "30px;"}}  value="Login"/>
                <div className="signup_link">
                Not a member? <Link to="register">Signup</Link></div>
                </form>
            </div>
            :
        //--------forgot password form ---------
        <div className="center form" style={{'height':'400px'}}>
            <img src={require("../../images/forgot_password.png")} id='forgotIcon' alt=''></img>
            <h1>Reset password</h1>
            <form action="forgotPassword" method="post">
                <div className="txt_field">
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