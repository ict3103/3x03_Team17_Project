import { Link } from "react-router-dom";

function AddItem(){
  window.localStorage.setItem("login",true);
  function logout(){
    window.location.href="/"; 
    }
    return (
        <div >
           <div class="d-flex" id="wrapper">
            <div class="border-end bg-white" style={{"width":"250px","height":"800px"}} id="sidebar-wrapper">
                <div class="sidebar-heading border-bottom bg-light" id="dashHeader">Administration</div>
                <div class="list-group list-group-flush" id="dashItem">
                    <Link class="list-group-item list-group-item-action list-group-item-light p-3" to="collectionLogin">Purchase Laptop</Link>
                    {/* <Link class="list-group-item list-group-item-action list-group-item-light p-3" to="addItem">Add item</Link> */}
                </div>
          </div>
       
          <nav style={{"width":"100%","height":"58px"}} class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div class="container-fluid">
                {/* <button class="btn btn-light" id="sidebarToggle">&#9776;</button> */}
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                
                <div class="collapse navbar-collapse" id="navbarSupportedCon    tent">
                    <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                        <Link id="logoutButton2" onClick={logout} type="button"  style={{"border-radius":"40px"}} class="btn btn-secondary">Log out</Link>
                    </ul>
                </div>
            </div>
          </nav>
          </div>
            <div class="center" style={{"box-shadow": "0px 0px 4px 4px rgba(0,0,0,0.2) "}}>
          <h1>Add laptop</h1>
        <form action="/addItem" method="POST" >
          <div class="mb-3">
              <label for="laptopName" class="form-label">Laptop name & model</label>
              <input type="text" class="form-control" id="laptopName" name="laptopName" required/>
          </div>
            
          <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" step="any" class="form-control" id="price" name="price" required />
          </div>
          <div class="mb-3">
            <label for="imageUrl" class="form-label">Image Url</label>
            <input type="text" class="form-control" id="imageUrl" name="imageUrl" minlength="6"/>
          </div>
          <div class="text-center" style={{"text-align": "center;"}}>
          <button type="submit" style={{width:"100px","margin-right":"10%;"}}  class="btn btn-primary">Submit</button>
          <Link type="button" style={{width:"100px"}} to="adminDashboard" class="btn btn-outline-primary">Back</Link>
        </div>
        </form>
        </div>
        </div>
    )
}

export default AddItem;