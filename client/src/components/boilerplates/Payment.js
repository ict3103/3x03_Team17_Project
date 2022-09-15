import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import '../../styles/payment.css'
import Spinner from 'react-bootstrap/Spinner';

function Payment(){

    const paymentOnClick = () => {
        alert("Payment successful!");
    };
    
    return(
        <div className='payment-form'>
            <Form>
            <h3>Enter your card details below</h3>
            <Form.Group className="mb-3">
                <Form.Label>Cardholder's Name</Form.Label>
                <Form.Control type="name"/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="name"/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Card Number is required</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 row">
            <div className='col'>
                <Form.Label>Valid Thru</Form.Label>
                <Form.Control type="name"/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Card Number is required</Form.Control.Feedback>
                
            </div>
            <div className='col'>
                <Form.Label>CVC</Form.Label>
                <Form.Control type="name"/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Card Number is required</Form.Control.Feedback>
            </div>
          </Form.Group>
          <input type="submit" value="Pay" onClick={paymentOnClick}/>
            </Form>
        </div>

    );
}

export default Payment;