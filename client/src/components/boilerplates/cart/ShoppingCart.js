import '../../../styles/cart.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ShoppingCart() {
    const [collectionData,setCollectionData] = useState([])
    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/cart").then((response)=>{
            setCollectionData(response.data.collection)
        })
    },[]);
    let totalAmount = 0;
  return (
        <div class="container">

            <h2 class="title-page">Shopping cart</h2>
            <div class="row">
            <div class="card col-md-12">
            <table class="table table-borderless table-shopping-cart">
            <thead class="text-muted">
            <tr class="small text-uppercase">
            <th scope="col" width="220">Product</th>
            <th scope="col" width="50">Quantity</th>
            <th scope="col" width="10">Price</th>
            <th scope="col" class="text-right" width="120"> </th>
            </tr>
            </thead>
            <tbody>
            {collectionData.map((val)=>{
                {totalAmount += val[2]*val[3]}
                return <tr>
                    <td>
                        <img src={require(`../../../${val[1]}`)} alt='' style={{"height": "80px","width":"120px"}}/>
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
                            <table>
                                    <tr><var class="price">${val[2]*val[3]}</var></tr>
                                    <tr><small class="text-muted"> ${val[2]} each x {val[3]}</small></tr>
                            </table>
                        </div> 
                    </td>
                    <td class="text-right"> 
                    <a data-original-title="Save to Wishlist" title="" href="/" class="btn btn-light mr-2" data-toggle="tooltip"> <i class="fa fa-heart"></i></a> 
                    <a href="/" class="btn btn-light"> Remove</a>
                    </td>
                </tr>
            })
            }
            </tbody>
            </table>
            <hr></hr>
            <row>
                <h2 className='total-price-tag'>Total:</h2>
                <h3>${totalAmount}</h3>
                <Link to='/payment'><button class='btn btn-primary' id='cart-payment-btn'>Pay</button></Link>
            </row>
            </div>
        </div>
        </div>

  )
}
export default ShoppingCart;