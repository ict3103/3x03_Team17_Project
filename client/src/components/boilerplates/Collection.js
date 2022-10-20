import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../styles/collection.css'
import { Link } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';

function Collection(){
    const [collectionData,setCollectionData] = useState([])
    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/collection").then((response)=>{
            setCollectionData(response.data.collection)
        })
    },[])

    const handleCartButton = (e) => {
        // window.localStorage.getItem('login')==="true" ? 
        // window.location.href="/cart":window.location.href="/login"
        window.localStorage.setItem("ProductDetails", e.target.value)
        window.location.href = "/productdetails"
        console.log(e.target.value); //will give you the value continue
    }
  
   
    return(<div >
     {window.localStorage.getItem('login')==="false" ?
      <nav class="navbar navbar-expand-lg navbar-dark" style={{"background-color": "rgba(0, 0, 0)"}}>
      <div class="container-fluid"> <FaReact className="App-logo" />
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
    :<div/>
        }

        
    <div class="row" id="div1">
      
    {collectionData.map((val)=>{
        return <div className="column">
        <div className="card" style={{"width": "18rem;"}}>
                <img src={require(`../../${val[2]}`)} style={{"height": "160px","width":"254px"}}  class="card-img-top" alt=".." />
                <div className="card-body">
                    <h5 className="card-title"> {val[1]} </h5>
                    <p id="laptopPrice">${val[3]}</p>
                </div>
                <div class="row">
                    <div className="col" style={{ "align-items": "center", "display": "flex", "flex-direction": "column" }}>
                        <button id="productButton" type="button" onClick={handleCartButton} value={val[0]} class="btn btn-primary" >Description</button>
                    </div>
                </div>
        </div>
    </div>
     })
    }
    </div>

    <div id="backButton1">
        {window.localStorage.getItem('login')==="true"?
        <Link to="/adminDashboard" class="btn btn-secondary btn-lg">Back</Link>
      : 
      <Link to="/" class="btn btn-secondary btn-lg">Back</Link>  
      }
        
    </div>
    
    </div>
    
   )
}



  


export default Collection;
