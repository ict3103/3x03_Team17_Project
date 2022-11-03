// import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {Card,Row} from 'react-bootstrap';
import '../../../styles/main.css'



function VerificationPage(){
    return (
    <Container fluid>
        <Row>
        <Card className="align-middle" style={{ 'width': '40rem', 'margin': '0 auto','float':'none','margin-top':'100px','backgroundColor':'rgba(212, 205, 205, 0.97'}}>
            <img src={require('../../../images/email_icon.png')} style={{'width':'150px','margin': '0 auto'}} alt='failed'></img>
            <Card.Body>
                <Card.Text>
                <h3>Verify your email</h3>
                </Card.Text>
                <Card.Text>
                please verify your email to continue, if you dont received the verification email, please check your "spam" or "bulk" folder.
                </Card.Text>
            </Card.Body>
        </Card>
        </Row>
    </Container>
    );
  }
export default VerificationPage;

