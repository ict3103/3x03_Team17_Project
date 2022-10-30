import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function EditItem(){
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
        <div className="center">
    <h1>Edit info</h1>
        <form action="/editItem" method="POST" onsubmit={"return confirm('Do you really want to submit the form?');"}>
          <div className="mb-3">
              <label htmlhtmlFor="laptopName" className="form-label">Laptop name & model</label>
              <input type="text" defaultValue={laptopName} onChange={e => this.onTodoChange(e.target.value)} className="form-control" id="laptopName" name="laptopName" required/>
          </div>
            
          <div className="mb-3">
            <label htmlhtmlFor="price" className="form-label">Price</label>
            <input type="number" step="any" defaultValue={laptopPrice} onChange={e => this.onTodoChange(e.target.value)} className="form-control" id="price" name="price" required />
          </div>
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">Image Url</label>
            <input type="text" className="form-control" defaultValue={laptopUrl} onChange={e => this.onTodoChange(e.target.value)}  id="imageUrl" name="imageUrl" minlength="6"/>
          </div>
          <div className="text-center" style={{textAlign: "center;"}}>
            <button type="submit" style={{width:"100px","margin-right": "10%;"}} className="btn btn-primary">Submit</button>
            <Link type="button" style={{width:"100px"}} to="adminDashboard" className="btn btn-outline-primary">Back</Link>
          </div>
          
        </form>
  </div>
        </div>
    )
}

export default EditItem;