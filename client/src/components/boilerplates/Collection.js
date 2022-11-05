import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../styles/collection.css'
import { Link } from 'react-router-dom';
import { IsValidJWT } from './utils/Token';


// console.log(decoded);

function Collection(){
    console.log(IsValidJWT())
    const [collectionData,setCollectionData] = useState([])
    //axios get request to get laptop collections
    useEffect(()=>{
        axios.get("https://172.18.0.3:5000/collection").then((response)=>{
            setCollectionData(response.data.collection)
        })
    },[])

    const addToCart  = (e) =>{
        e.preventDefault();
        axios.post("https://127.0.0.1:5000/add_cartItem",{laptopId: e.target.value,headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }}).then(response=>{
                if(response.data){
                    window.location = "/cart"
                }else{
                    return alert("Error:!!");
                }
        }).catch((err)=>{
            return alert("Error: " + err);
        })
    }

    const viewProductDetails = (e) => {
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
                        <button id="productButton" type="button" onClick={viewProductDetails} value={val[0]} class="btn btn-primary" >Description</button>
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
        {IsValidJWT()?
        <Link to="/adminDashboard" class="btn btn-secondary btn-lg">Back</Link>
      : 
      <Link to="/" class="btn btn-secondary btn-lg">Back</Link>  
      }
        
    </div>
    
    </div>
    
   )
}

export default Collection;
