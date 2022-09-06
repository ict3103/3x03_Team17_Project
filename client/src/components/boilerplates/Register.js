import { useState} from "react";
import '../../styles/register.css'
import Form from 'react-bootstrap/Form';
import PersonIcon from '@mui/icons-material/Person';




function Register(){
    window.localStorage.setItem("login",false);

    const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


    return (
      <div class="center form">
      <h1>Register</h1>
      <Form action="/register" method="POST" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group  md="12" controlId="validationCustom01">
          <Form.Label>name</Form.Label>
          <Form.Control
            required
            type="text"
            id = "name"
            name ="name"
            data-testid={PersonIcon}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Name is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="12" controlId="validationCustom02">
          <Form.Label>email</Form.Label>
          <Form.Control
            required
            type="email"
            id = "email"
            name = "email"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            invalid email format
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group  md="12" controlId="validationCustom03">
          <Form.Label>password</Form.Label>
          <Form.Control type="password" minLength={6} required id="password" name="password"/>
          <Form.Control.Feedback type="invalid">
            Password length is too short
          </Form.Control.Feedback>
        </Form.Group>
      <br></br>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <input type="submit" value="Register"/>
    </Form>
    </div>
    )
}

export default Register;