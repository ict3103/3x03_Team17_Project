import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../styles/collection.css'
import { Link } from 'react-router-dom';
import {IsValidJWT} from "./Token"

function ProductDetails(){
    const [collectionData,setCollectionData] = useState([])
    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/collection").then((response)=>{
            setCollectionData(response.data.collection)
        })
    },[])

    const handleCartButton = (e) => {
        window.localStorage.setItem("ProductDetails",e.target.value)
        IsValidJWT() ? 
            axios.post("http://127.0.0.1:5000/add_cartItem",{laptopId: e.target.value,headers: {
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
        :
        window.location.href="/login"
      }
  
    return(<div id="div1" >
 
    {collectionData.filter(laptopId => laptopId[0] ==window.localStorage.getItem("ProductDetails")).map((val)=>{
        return  <div  style={{"text-align":"center"}}>
                    <br></br>
                    <h2 > {val[1]} </h2>
                    <br></br>
                    <img src={require(`../../${val[2]}`)} style={{"height": "160px","width":"254px"}}  class="card-img-top" alt=".." />
                    <br></br>
                    <br></br>
                    <p id="laptopPrice">Price: ${val[3]}</p>
                    <p id="laptopPrice">Description:</p>
                    <p style={{"width":"70%","margin":"0 auto"}}>{val[4]}</p>
                    <br></br>
                    <div >
                        <div style={{ "text-align": "center","position": "relative","padding-right":"45%","padding-left":"45%"}}>
                            <button style={{"padding": "0px"}} id="productButton"  type="button" onClick={handleCartButton} value={val[0]} class="btn btn-primary btn-lg" >Purchase</button>
                        </div>
                    </div>
                    <br></br>
                  </div>
     })
    }
    <div id="backButton1">
        <Link to="/collection" class="btn btn-secondary btn-lg">Back</Link>
    </div>
    
    </div>
    
   )
}



  


export default ProductDetails;
