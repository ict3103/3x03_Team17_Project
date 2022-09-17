import {Link} from 'react-router-dom'
import '../../styles/main.css'
import { FaReact } from 'react-icons/fa';

function Main() {
  window.localStorage.setItem("login",false);
  
  return (

    <div >
      <video autoPlay loop muted class="back-video">
      <source src={require("../../images/laptop_video.mp4")} type="video/mp4"/>
    </video>
  
    <nav class="navbar navbar-expand-lg navbar-dark">
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
  {(window.location.href==="http://localhost:3000/")? <div id="exploreButton">
  <Link to="collection" id="exploreButton1">Explore</Link>
  </div>:<div/>
  }
 
   
  </div>
  );
}

export default Main;
