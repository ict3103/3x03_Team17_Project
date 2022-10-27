import { Link } from "react-router-dom";

function AddItem(){
  // window.localStorage.setItem("login",true);
  function logout(){
    window.location.href="/"; 
    }
    return (
        <div >
           <div className="d-flex" id="wrapper">
            <div className="border-end bg-white" style={{width:'250px',height:'800px'}} id="sidebar-wrapper">
                <div className="sidebar-heading border-bottom bg-light" id="dashHeader">Administration</div>
                <div className="list-group list-group-flush" id="dashItem">
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="collectionLogin">Purchase Laptop</Link>
                    {/* <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="addItem">Add item</Link> */}
                </div>
          </div>
       
          <nav style={{width:"100%",height:"58px"}} className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
                {/* <button className="btn btn-light" id="sidebarToggle">&#9776;</button> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedCon    tent">
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                        <Link id="logoutButton2" onClick={logout} type="button"  style={{"borderRadius":"40px"}} className="btn btn-secondary">Log out</Link>
                    </ul>
                </div>
            </div>
          </nav>
          </div>
            <div className="center" style={{"box-shadow": "0px 0px 4px 4px rgba(0,0,0,0.2) "}}>
          <h1>Add laptop</h1>
        <form action="/addItem" method="POST" >
          <div className="mb-3">
              <label htmlFor="laptopName" className="form-label">Laptop name & model</label>
              <input type="text" className="form-control" id="laptopName" name="laptopName" required/>
          </div>
            
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" step="any" className="form-control" id="price" name="price" required />
          </div>
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">Image Url</label>
            <input type="text" className="form-control" id="imageUrl" name="imageUrl" minlength="6"/>
          </div>
          <div className="text-center" style={{"text-align": "center;"}}>
          <button type="submit" style={{width:"100px","margin-right":"10%;"}}  className="btn btn-primary">Submit</button>
          <Link type="button" style={{width:"100px"}} to="adminDashboard" className="btn btn-outline-primary">Back</Link>
        </div>
        </form>
        </div>
        </div>
    )
}

export default AddItem;