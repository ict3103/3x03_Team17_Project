import Container from 'react-bootstrap/Container';
import {Card,Button,Row} from 'react-bootstrap';

function ResetSuccess(){
    return (
        <Container fluid>
            <Row>
            <Card class="align-middle" style={{ 'width': '40rem', 'margin': '0 auto','float':'none','margin-top':'100px','background-color':'rgba(212, 205, 205, 0.97'}}>
                <img src={require('../../images/email_icon.png')} style={{'width':'150px','margin': '0 auto'}} alt='failed'></img>
                <Card.Body>
                    <Card.Text>
                    <h3>Reset password</h3>
                    </Card.Text>
                    <Card.Text>
                    You have successfully reset your password!
                    </Card.Text>
                    <Button variant="primary" style={{'width': 'fit-content'}} href="http://localhost:3000/login" >Login</Button>
                </Card.Body>
            </Card>
            </Row>
        </Container>
        );
}
export default ResetSuccess