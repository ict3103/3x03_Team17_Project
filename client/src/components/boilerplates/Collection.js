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

    function handleCartButton(){
      window.localStorage.getItem('login')==="true" ? 
      window.location.href="/cart":window.location.href="/login"
    }
  
   
    return(<div >
     {window.localStorage.getItem('login')==="false" ?
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#060707"}}>
      <div className="container-fluid"> <FaReact className="App-logo" />
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
    :<div/>
        }

        
    <div className="row" id="div1">
      
    {collectionData.map((val)=>{
        return <div className="column">
        <div className="card" style={{width: "18rem;"}}>
                <img src={require(`../../${val[2]}`)} style={{height: "160px","width":"254px"}}  className="card-img-top" alt=".." />
                <div className="card-body">
                    <h5 className="card-title"> {val[1]} </h5>
                    <p id="laptopPrice">${val[3]}</p>
                </div>
                <div className="row">
                    <div className="col" style={{alignItems:"center",display:"flex","flexDirection":"column"}}>
                        <button id="productButton"  type="button" onClick={handleCartButton} value={val[0]} className="btn btn-primary" >Purchase</button>
                    </div>
                </div>
        </div>
    </div>
     })
    }
    </div>

    <div id="backButton1">
        {window.localStorage.getItem('login')==="true"?
        <Link to="/adminDashboard" className="btn btn-secondary btn-lg">Back</Link>
      : 
      <Link to="/" className="btn btn-secondary btn-lg">Back</Link>  
      }
        
    </div>
    
    </div>
    
   )
}



  


export default Collection;
