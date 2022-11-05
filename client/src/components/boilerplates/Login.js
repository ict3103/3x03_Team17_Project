import '../../styles/login.css'
import {Link} from 'react-router-dom'
import {React , useState} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha'
import LoadingIcon from './utils/LoadingIcon';






function Login(){
    const [forgotPwd,setforgotPwd] = useState(false)
    const [inputEmail,setEmail] = useState(null)
    const [inputPassword,setPassword] = useState(null)
    const [loading,setLoading] = useState(false)
    
    //header implementation
    const sendForm  = (e) =>{
        setLoading(true)
        e.preventDefault();
        axios.post("http://172.18.0.2:5000/login",{inputEmail,inputPassword}).then(response=>{
                
                if(response.data.access_token){
                    window.localStorage.setItem('token',response.data.access_token)
					localStorage.setItem("user", JSON.stringify(response.data.user))
                    setLoading(false)
                    window.location = "/collection"
                }else if(response.data.error =="no such account"){
                    return alert("no such account");
                }
                else if(response.data.error =="verification error"){
                    window.location = "/verification"
                }
                else{
                    return alert("something went wrong");
                }
        },[loading]).catch((err)=>{
            return alert("Error: " + err);
        })
        
    }



    // cookie implementation 
    // const sendForm  = (e) =>{
    //     e.preventDefault();
    //     axios.post("http://127.0.0.1:5000/login",{inputEmail,inputPassword}).then(response=>{
    //             if(response.data){
    //                 console.log(response.data)
    //                 window.localStorage.setItem('isValidUser',response.data.isValidUser)
    //                 window.location = "/collection"
    //                 console.log("login user, token is ",window.localStorage.getItem("isValidUser"))
    //             }else{
    //                 return alert("Error:!!");
    //             }
    //     }).catch((err)=>{
    //         return alert("Error: " + err);
    //     })
    // }


    

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

    const back = ()=>{
        window.location='/login'
    }


    return (

    (forgotPwd===false)?
        <div class="center form">
            <h1 style={{"color":"black"}}>Login</h1>
            <form >
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
                <LoadingIcon loading={loading}></LoadingIcon>
                <div class="signup_link">
                Not a member? <Link to="register">Signup</Link></div>
                </form>
            </div>
            :
        //--------forgot password form ---------
        <div class="center form" style={{'height':'450px'}}>
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
                <div style={{"margin-top":"20px"}}> 
                    <Button type='submit' disabled={!ForgotPwdCaptchaCheck} variant="dark" style={{'width':'fit-content','margin-left':'50px'}}>Reset password</Button>
                        <Button variant="dark"  onClick={back}
        style={{'width':'fit-content'}}>Back</Button>
                </div>
            </form>
        </div>
          //------------------------------------
    );
}

export default Login;