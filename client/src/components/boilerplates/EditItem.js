import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function EditItem(){
  window.localStorage.setItem("login",true);
  const queryParams = new URLSearchParams(window.location.search)
  const term = queryParams.get("laptopname")
  const [laptopName,setLaptopName] = useState('')
  const [laptopUrl,setLaptopUrl] = useState('')
  const [laptopPrice,setLaptopPrice] = useState('')



        
    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/").then((response)=>{
            console.log(response.data.laptopInfo)
            setLaptopName(response.data.laptopInfo.laptopName)
            setLaptopUrl(response.data.laptopInfo.imageUrl)
            setLaptopPrice(response.data.laptopInfo.price)

        })
    },[term])


      
    return (
    <div>
        <div class="center">
    <h1>Edit info</h1>
        <form action="/editItem" method="POST" onsubmit={"return confirm('Do you really want to submit the form?');"}>
          <div class="mb-3">
              <label for="laptopName" class="form-label">Laptop name & model</label>
              <input type="text" defaultValue={laptopName} onChange={e => this.onTodoChange(e.target.value)} class="form-control" id="laptopName" name="laptopName" required/>
          </div>
            
          <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" step="any" defaultValue={laptopPrice} onChange={e => this.onTodoChange(e.target.value)} class="form-control" id="price" name="price" required />
          </div>
          <div class="mb-3">
            <label for="imageUrl" class="form-label">Image Url</label>
            <input type="text" class="form-control" defaultValue={laptopUrl} onChange={e => this.onTodoChange(e.target.value)}  id="imageUrl" name="imageUrl" minlength="6"/>
          </div>
          <div class="text-center" style={{"text-align": "center;"}}>
            <button type="submit" style={{"width":"100px","margin-right": "10%;"}} class="btn btn-primary">Submit</button>
            <Link type="button" style={{"width":"100px"}} to="adminDashboard" class="btn btn-outline-primary">Back</Link>
          </div>
          
        </form>
  </div>
        </div>
    )
}

export default EditItem;