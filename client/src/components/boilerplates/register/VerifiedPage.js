// import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {Card,Row} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import '../../../styles/main.css'
import { FaReact} from 'react-icons/fa';


function VerifiedPage(){
    window.localStorage.setItem("login",false);
    return (
      <div >
        <video autoPlay loop muted className="back-video">
        <source src={require("../../../images/laptop_video.mp4")} type="video/mp4"/>
      </video>
    
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#060707"}}>
      <div className="container-fluid">    
        <FaReact className="App-logo" />
  
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/collection">Shop</Link>
            </li>
          </ul>
          <form className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="register">Register</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="btn btn-dark" to="login" style={{borderRadius: "30px;","backgroundColor": "transparent"}}role="button">Login</Link>
                  </li>       
                </ul>
          </form>
        </div>
      </div>
    </nav>
    <Container fluid>
        <Row>
        <Card className="align-middle" style={{ 'width': '40rem', 'margin': '0 auto','float':'none','margin-top':'100px','backgroundColor':'rgba(212, 205, 205, 0.97'}}>
        <img src={require('../../../images/email_icon.png')} style={{'width':'150px','margin': '0 auto','marginTop':'60px'}} alt='failed'></img>
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

