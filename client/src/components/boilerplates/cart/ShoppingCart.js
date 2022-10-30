import '../../../styles/cart.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function ShoppingCart() {
    const initialValue = [
        { id: null, value: null }];
    const [collectionData,setCollectionData] = useState([])
    const [dropdownValue, setdropdownValue] = useState(initialValue)
    // useEffect((e) => {
    //     console.log("value: "+dropdownValue.value+" from id: "+dropdownValue.id);
    //     axios.post("http://127.0.0.1:5000/update_cartItem", {"id":dropdownValue.id, "value":dropdownValue.value}).then((response)=>{
    //         if(response.data.result == 1){
    //             window.location.reload()
    //         }
    //     })
    // }, [dropdownValue]);

    // useEffect(()=>{
    //     axios.get("http://127.0.0.1:5000/cart", {headers: {
    //         Authorization: window.localStorage.getItem('token')
    //      }}).then((response)=>{
    //         setCollectionData(response.data.collection)
    //     })
    // },[]);
    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/cart").then((response)=>{
            setCollectionData(response.data.collection)
        })
    },[]);
    let totalAmount = 0;
 
    
  return (
    
        <div class="container" id="div1">
       
            <h2 class="title-page">Shopping cart</h2>
            <div class="row">
            <div class="card col-md-12">
            <table class="table table-borderless table-shopping-cart">
            <thead class="text-muted">
            <tr class="small text-uppercase">
            <th scope="col-md-auto">Product</th>
            <th scope="col-md-auto" width="50">Quantity</th>
            <th scope="col-md-auto">Price</th>
            <th scope="col-md-auto" class="text-right"> </th>
            </tr>
            </thead>
            <tbody>
            {collectionData.map((val)=>{
                {totalAmount += val[2]*val[4]}
                return <tr>
                    <td>
                        <img src={require(`../../../${val[1]}`)} alt='' style={{"height": "80px","width":"120px"}}/>
                    </td>
                    <td> 
                        <select id={val[3]} onChange={e => setdropdownValue(e.target, e.target.value)} class="form-control quantity-dropdown">
                            <option disabled selected hidden>{val[4]}</option>
                            <option>1</option>
                            <option>2</option>  
                            <option>3</option>  
                            <option>4</option>  
                        </select> 
                    </td>
                    <td> 
                        <div class="price-wrap">
                            <table>
                                    <tr><var class="price">${val[2]*val[4]}</var></tr>
                                    <tr><small class="text-muted"> ${val[2]} each x {val[4]}</small></tr>
                            </table>
                        </div> 
                    </td>
                    <td class="text-right"> 
                    <form action="/delete_cartItem" method="POST">
                    <button href="/" type="submit" name="cartItemId" value={val[3]} class="btn btn-light" id='cart-delete-btn'> Remove</button>
                    </form> 
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
            <row>
                    
            
            </row>
            </div>
        </div>
        </div>

  )
}
export default ShoppingCart;