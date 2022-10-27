import '../../styles/login.css'
import {Link} from 'react-router-dom'
import {React , useState, useEffect} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha'
import { setAuthToken } from './setAuthenToken';
import {useHistory,Router,Switch} from 'react-router-dom';


function Login(){
    const [forgotPwd,setforgotPwd] = useState(false)
    const [inputEmail,setEmail] = useState(null)
    const [inputPassword,setPassword] = useState(null)
    const sendForm  = (e) =>{
        e.preventDefault();
        axios.post("http://127.0.0.1:5000/login",{inputEmail,inputPassword}).then(response=>{
                console.log(response.data.jwt_token)
                console.log(response.data)
                if(response.data.jwt_token){
                    const token = response.data.jwt_token
                    window.localStorage.setItem('token',response.data.jwt_token)
                    setAuthToken(token);
                }
                useHistory.push("/collectionLogin")
                // if(response.data.redirect="/collectionLogin"){
                //     window.location = "/collectionLogin"
                // }else{
                //     window.location ="/"
                // }
        }).catch((err)=>{
            console.warn("error",err.response)
        })
        
    }

    const changeState = ()=>{
        setforgotPwd(true)
    }

    const [LoginCaptchaCheck, setLoginCaptchaCheck] = useState(false);
    const LoginCaptchaOnChange = (value) => {
        console.log('Captcha value:', value);
        setLoginCaptchaCheck(true);
    }

    const [ForgotPwdCaptchaCheck, setForgotPwdCaptchaCheck] = useState(false);
    const ForgotPwdCaptchaOnChange = (value) => {
        console.log('Captcha value:', value);
        setForgotPwdCaptchaCheck(true);
    }

    

    
    
    window.localStorage.setItem("login",false);
    return (

    (forgotPwd===false)?
        <div class="center form">
            <h1>Login</h1>
            <form>
                <div class="txt_field">
                <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} required/>
                <span></span>
                <label for="email">Email</label>
                </div>
                <div class="txt_field">
                <input type="password" name="inputPwd" id="inputPwd" onChange={e => setPassword(e.target.value)} required/>
                <span></span>
                <label for="inputPwd">Password</label>
                </div>
                <div class="pass" onClick={changeState} >Forgot Password?</div>
                {/* <ReCAPTCHA sitekey="6Ldrj30iAAAAADyAiEnHJkcZOv4E2UsyYK2ZQpvC" onChange={LoginCaptchaOnChange}/> */}
                <input type="submit"  style={{"border-radius": "30px;"}} onClick={sendForm}  value="Login"/>
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
                <div style={{'marginTop':'-30px'}}>
                <ReCAPTCHA sitekey="6Ldrj30iAAAAADyAiEnHJkcZOv4E2UsyYK2ZQpvC" onChange={ForgotPwdCaptchaOnChange}/>
                </div>
                <div> 
                    <Button type='submit' disabled={!ForgotPwdCaptchaCheck} variant="dark" style={{'width':'fit-content','margin-left':'50px'}}>Reset password</Button>
                        <Button variant="dark" 
        style={{'width':'fit-content'}}>Back</Button>
                </div>
            </form>
        </div>
          //------------------------------------
    );
}

export default Login;