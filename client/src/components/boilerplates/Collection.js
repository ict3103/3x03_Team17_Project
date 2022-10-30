import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../styles/collection.css'
import { Link } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';
import { IsValidJWT } from './Token';
import jwt_decode from "jwt-decode";

var token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImV4cGlyYXRpb24iOiIyMDIyLTEwLTI5IDEwOjI3OjU2LjQyMjUyNCJ9.dx8xr7mcaBO2E4P7wkvsdBmI4xRvxLyBqInSH48WDss"

var {uid} = jwt_decode(token);

// console.log(decoded);

function Collection(){
    // const [userId,setId] = useState(null)
    // useEffect(() => {
    //     const items = JSON.parse(localStorage.getItem('token'));
    //     if (items) {
    //         setId(items);
    //     }
    //   }, []);
    
    const [collectionData,setCollectionData] = useState([])
    //axios get request to get laptop collections
    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/collection").then((response)=>{
            setCollectionData(response.data.collection)
        })
    },[])

    const addToCart  = (e) =>{
        e.preventDefault();
        const token = window.localStorage.getItem('token');
        const laptopId = e.target.value;
        axios.post("http://127.0.0.1:5000/add_cartItem",{token,laptopId,uid}).then(response=>{
                if(response.data.redirect="/cart"){
                    window.location = "/cart"
                }else{
                    return alert("Error:!!");
                }
        }).catch((err)=>{
            return alert("Error: " + err);
        })
    }

    

    const handleCartButton = (e) => {
        window.localStorage.setItem("ProductDetails", e.target.value)
        window.location.href = "/productdetails"
        console.log(e.target.value); //will give you the value continue
    }
  
   
    return(<div id="div1" >
    <div class="row" id="div2" >
    
    {/* display all the items */}
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

                {IsValidJWT()?<div class="row">
                    <div class="col" style={{"align-items":"center","display":"flex","flex-direction":"column","margin-top":"5px"}}>
                        <button id="productButton"  onClick={addToCart} name="productId" value={val[0]} class="btn btn-primary" >Add to cart</button>
                    </div>
                </div>:null}
                    
                
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
