import '../../../styles/cart.css'
import { useState,useEffect } from 'react';
import axios from 'axios';


function ShoppingCart() {
    const [collectionData,setCollectionData] = useState([])
    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/cart").then((response)=>{
            setCollectionData(response.data.collection)
        })
    },[]);
  return (
        <div class="container">
            <h2 class="title-page">Shopping cart</h2>
            <div class="row">
            <div class="card col-md-12">
            <table class="table table-borderless table-shopping-cart">
            <thead class="text-muted">
            <tr class="small text-uppercase">
            <th scope="col" width="120">Product</th>
            <th scope="col" width="20">Quantity</th>
            <th scope="col" width="120">Price</th>
            <th scope="col" class="text-right" width="200"> </th>
            </tr>
            </thead>
            <tbody>
            {collectionData.map((val)=>{
                return <tr>
                    <td>
                        <img src={require(`../../${val[1]}`)} alt='' style={{"height": "80px","width":"120px"}}/>
                    </td>
                    <td> 
                        <select class="form-control">
                            <option>1</option>
                            <option>2</option>  
                            <option>3</option>  
                            <option>4</option>  
                        </select> 
                    </td>
                    <td> 
                        <div class="price-wrap"> 
                            <var class="price">${val[2]*val[3]}</var> 
                            <small class="text-muted"> ${val[2]} each * {val[3]}</small> 
                        </div> 
                    </td>
                    <td class="text-right"> 
                    <a data-original-title="Save to Wishlist" title="" href="/" class="btn btn-light mr-2" data-toggle="tooltip"> <i class="fa fa-heart"></i></a> 
                    <a href="/" class="btn btn-light"> Remove</a>
                    </td>
                </tr>
            })}
            </tbody>
            </table>
            </div>
        </div>
        </div>

  )
}
export default ShoppingCart;