import {Link,useHistory} from 'react-router-dom'
import '../../styles/main.css'
import { FaReact } from 'react-icons/fa';
import { IsValidJWT} from './Token';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';



function Main() {
  let history = useHistory();
  const logout = (e)=>{
      window.localStorage.removeItem('token')
      window.location.reload(false);
      window.location = "/login"
  }




  function handleCartButton(){
    window.location = "/cart"
  }

  return (
    <div  >
      <video autoPlay loop muted class="back-video">
      <source src={require("../../images/laptop_video.mp4")} type="video/mp4"/>
    </video>
  
    <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">    
      <FaReact className="App-logo" />

      {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse"          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span> 
      </button> */}

      {/* invariant buttons */}
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <Link class="nav-link" aria-current="page" to="/">Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/collection">Shop</Link>
          </li>
        </ul>
      </div>

      {/* variant buttons */}
      
      <div class="collapse navbar-collapse" >
        {!IsValidJWT()?
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 float-end" style={{"margin-left":"1100px"}}>
          <li class="nav-item ">
                  <Link class="nav-link" aria-current="page" to="register">Register</Link>
          </li>
          <li class="nav-item float-right" >
                    <Link class="btn btn-dark" to="login" style={{"border-radius": "30px;","background-color": "transparent"}}role="button">Login</Link>
          </li>
     </ul>:
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" style={{"margin-left":"1100px"}}>
            <li><button id="cartButton" onClick={handleCartButton} class="btn btn-outline-dark rounded-circle float-end" 
                            ><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg></button></li>
		   <li class="nav-item">
				      <Link id="profileButton" class="nav-link btn-outline-dark rounded-circle float-end" aria-current="page" to="/profile"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></Link>
            </li>
            <li class="nav-item">
                      <Button class="btn btn-dark" onClick={logout} style={{"border-radius": "30px;","background-color": "transparent"}}role="button">Logout</Button>
            </li>
          </ul>}
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
