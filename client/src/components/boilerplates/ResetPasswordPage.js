import '../../styles/login.css'
import {useParams} from 'react-router-dom'
import {React} from 'react';
// import axios from 'axios';



function ResetPasswordPage(){
  // const [validated, setValidated] = useState(false);
  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //     axios.post("http://127.0.0.1:5000/resetSuccess/<token>")
  //    setValidated(true);
  // };
    const params = useParams()
    const {token} = params
    console.log(token)
    const path1 = "/resetSuccess/"+token
    console.log(path1)
    return(
        
        <div className="center form" style={{'height':'500px'}}>
            <h1>Reset Password</h1>
            <form action={path1} method="post"  >
                <div className="txt_field">
                <input type="password" name="newPwd" id="newPwd" required/>
                <label htmlFor="newPwd">New password</label>
                </div>
                <div className="txt_field">
                <input type="password" name="newPwd2" id="newPwd2" required/>
                <label htmlFor="newPwd2">Confirm new password</label>
                </div>
                <input type="submit" style={{borderRadius: "30px;"}}  value="ResetPassword"/>
            </form>
        </div>
    )
}

export default ResetPasswordPage