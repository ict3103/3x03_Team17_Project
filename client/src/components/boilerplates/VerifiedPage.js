// import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {Card,Row} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import '../../styles/main.css'
import { FaReact} from 'react-icons/fa';


function VerifiedPage(){
    window.localStorage.setItem("login",false);
    return (
      <div >
        <video autoPlay loop muted class="back-video">
        <source src={require("../../images/laptop_video.mp4")} type="video/mp4"/>
      </video>
    
      <nav class="navbar navbar-expand-lg navbar-dark" style={{"background-color": "#060707"}}>
      <div class="container-fluid">    
        <FaReact className="App-logo" />
  
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/collection">Shop</Link>
            </li>
          </ul>
          <form class="d-flex">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <Link class="nav-link" aria-current="page" to="register">Register</Link>
                  </li>
                  <li class="nav-item">
                      <Link class="btn btn-dark" to="login" style={{"border-radius": "30px;","background-color": "transparent"}}role="button">Login</Link>
                  </li>       
                </ul>
          </form>
        </div>
      </div>
    </nav>
    <Container fluid>
        <Row>
        <Card class="align-middle" style={{ 'width': '40rem', 'margin': '0 auto','float':'none','margin-top':'100px','background-color':'rgba(212, 205, 205, 0.97'}}>
        <img src={require('../../images/email_icon.png')} style={{'width':'150px','margin': '0 auto','marginTop':'60px'}} alt='failed'></img>
            <Card.Body>
                <Card.Text>
                <h3>Account verified</h3>
                </Card.Text>
                <Link variant="primary" style={{'width': 'fit-content'}} to="login" >Sign in</Link>
            </Card.Body>
        </Card>
        </Row>
    </Container>
    {(window.location.href==="http://localhost:3000/")? <div id="exploreButton">
    <Link to="collection" id="exploreButton1">Explore</Link>
    </div>:<div/>
    }
   
     
    </div>
    );
  }
export default VerifiedPage;

