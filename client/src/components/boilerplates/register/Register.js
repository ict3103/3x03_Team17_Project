import { useState} from "react"
import '../../../styles/register.css'
import Form from 'react-bootstrap/Form'
import ReCAPTCHA from 'react-google-recaptcha'


function Register(){

  const [validated, setValidated] = useState(false);
  const [CaptchaCheck, setCaptchaCheck] = useState(false);

  const onChange = (value) => {
    console.log('Captcha value:', value);
    setCaptchaCheck(true);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


    return (
      <div className="register-form">
        <h1>Register</h1>
        <Form action="/register" method="POST" noValidate validated={validated} onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control required type="text" id = "username" name = "username"/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Username is required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" id = "email" name = "email"/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">invalid email format</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" minLength={6} required id="password" name="password"/>
          <Form.Control.Feedback type="invalid">Password length is too short</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" minLength={6} required id="checkpassword" name="checkpassword"/>
          <Form.Control.Feedback type="invalid">Password length is too short</Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group className="mb-3">
          <Form.Check required label="Agree to terms and conditions" feedback="You must agree before submitting." feedbackType="invalid"/>
          </Form.Group>
          <ReCAPTCHA sitekey="6Ldrj30iAAAAADyAiEnHJkcZOv4E2UsyYK2ZQpvC" onChange={onChange}/>
          <input type="submit" disabled={!CaptchaCheck} value="Register"/>
    </Form>
      </div>
      
    )
      
}

export default Register;