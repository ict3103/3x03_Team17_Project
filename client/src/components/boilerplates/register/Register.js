import { useState} from "react"
import '../../../styles/register.css'
import Form from 'react-bootstrap/Form'
import ReCAPTCHA from 'react-google-recaptcha'


function Register(){

  const [validated, setValidated] = useState(false);
  const [CaptchaCheck, setCaptchaCheck] = useState(false);
  
  //added for input validation 
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const setField = (field, value) => {setForm({
    ...form,
    [field]:value
  })
  if (!!errors[field])
  setErrors({
    ...errors, 
    [field]:null
  })
}

  //captcha function 
  const onChange = (value) => {
    console.log('Captcha value:', value);
    setCaptchaCheck(true);
  }

  //custom validation function 
  const validateForm = (event) => { 
    const { username, email, password, confirmpassword } = form 
    const newErrors = {} 
    if (!username || username === "") newErrors.username = "Please enter a username satan"
    if (!email || email === "") newErrors.email = "Please enter a email"
    if (!password || password === "") newErrors.password = "Please enter a password"
    if (!confirmpassword || confirmpassword === "") newErrors.confirmpassword = "Please enter a password"
    return newErrors
  }

  //submit function 
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const formErrors = validateForm(); 

    if (form.checkValidity() === false) {  //if an input element contains valid data. == the data is not valid 
      event.preventDefault();
      event.stopPropagation();
      setErrors(formErrors)
    }
    setValidated(true);
  };
    return (
      <div className="register-form">
        <h1>Register</h1>
        <Form action="/register" method="POST" noValidate validated={validated} onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control required type="text" id = "username" name = "username" value={form.username} onChange={e=> setField('username', e.target.value)} isInvalid={!!errors.username}/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid"> {errors.username} </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" id = "email" name = "email" value={form.email} onChange={e=> setField('email', e.target.value)} isInvalid={!!errors.email}/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid"> {errors.email} </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" minLength={6} required id="password" name="password" value={form.password} onChange={e=> setField('password', e.target.value)} isInvalid={!!errors.password}/>
          <Form.Control.Feedback type="invalid"> {errors.password} </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" minLength={6} required id="checkpassword" name="checkpassword" value={form.confirmpassword} onChange={e=> setField('confirmpassword', e.target.value)} isInvalid={!!errors.confirmpassword}/>
          <Form.Control.Feedback type="invalid"> {errors.confirmpassword} </Form.Control.Feedback>
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