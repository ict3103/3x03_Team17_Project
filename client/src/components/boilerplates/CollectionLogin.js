import '../../styles/collection.css'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'


function CollectionLogin(){
    window.localStorage.setItem("login",true);
    const [collectionData,setCollectionData] = useState([])
    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/collection").then((response)=>{
            setCollectionData(response.data.collection)
        })
    },[]);
    function logout(){
    window.location.href="/"; 
    };
    function handleCartButton(){
        // window.localStorage.getItem('login')==="true" ? 
        // window.location.href="/cart":window.location.href="/login"
        window.location.href="/cart"
    }
    
    
    return (<div>
     {/* sidebar*/}
      <div class="d-flex" id="wrapper">
    <div class="border-end bg-white" style={{"width":"250px"}} id="sidebar-wrapper">
        <div class="sidebar-heading border-bottom bg-light" id="dashHeader">Administration</div>
        <div class="list-group list-group-flush" id="dashItem">
            <Link class="list-group-item list-group-item-action list-group-item-light p-3" to="collectionLogin">Purchase Laptop</Link>
            {/* <Link class="list-group-item list-group-item-action list-group-item-light p-3" to="addItem">Add item</Link> */}
        </div>
    </div>
    {/* navbar */}
            <div id="page-content-wrapper">
                <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom" style={{"height":"70px"}}>
                    <div class="container-fluid">
                        {/* <button class="btn btn-light" id="sidebarToggle">&#9776;</button> */}
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                        
                        <div class="collapse navbar-collapse" id="navbarSupportedCon    tent">
                            
                            <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                            
                            <li><button id="cartButton" onClick={handleCartButton} class="btn btn-outline-dark rounded-circle" 
                            ><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg></button></li>
                            <li><Link id="logoutButton2" onClick={logout} type="button"  style={{"border-radius":"40px"}} class="btn btn-secondary">Log out</Link></li>   
                            </ul>
                        </div>
                    </div>
                    
                </nav>
                
                <div class="flex">
                {collectionData.map((val)=>{
                    return <div class="column" >
                        <div class="card" style={{"width": "18rem;"}}>
                        <img src={require(`../../${val[2]}`)} style={{"height": "160px","width":"254px"}}  class="card-img-top" alt=".." />
                        <div class="card-body">
                            <h5 class="card-title"> {val[1]} </h5>
                            <p id="laptopPrice">${val[3]}</p>
                        </div>
                <div class="row">
                    <div class="col" style={{"align-items":"center","display":"flex","flex-direction":"column"}}>
                        <form action="/add_cartItem" method="POST">
                        <button id="productButton"  type="submit" name="productId" value={val[0]} class="btn btn-primary" >Add to cart</button>
                            </form>
                    </div>
                </div>
        </div>
    </div>
    
     })
    }    
    </div>
    
            </div>
</div>

</div>
)

}



export default CollectionLogin