// import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {Card,Button,Row} from 'react-bootstrap';
import '../../styles/main.css'



function VerificationPage(){
    return (
    <Container fluid>
        <Row>
        <Card class="align-middle" style={{ 'width': '40rem', 'margin': '0 auto','float':'none','margin-top':'100px','background-color':'rgba(212, 205, 205, 0.97'}}>
            <img src={require('../../images/email_icon.png')} style={{'width':'150px','margin': '0 auto'}} alt='failed'></img>
            <Card.Body>
                <Card.Text>
                <h3>Verify your email</h3>
                </Card.Text>
                <Card.Text>
                please verify your email to continue, if you dont received the verification email, please check your "spam" or "bulk" folder.
                </Card.Text>
                <Button variant="primary" style={{'width': 'fit-content'}} href="https://mailtrap.io/inboxes" target="_blank">go to mail</Button>
            </Card.Body>
        </Card>
        </Row>
    </Container>
    );
  }
export default VerificationPage;

