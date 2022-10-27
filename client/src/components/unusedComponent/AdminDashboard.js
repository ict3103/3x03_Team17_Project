import '../../styles/dashBoard.css'
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AdminDashboard(){
    // window.localStorage.setItem("login",true);
    // function openCart(){
    //   window.location.href="/cart"; 
    //   }

      function handleCartButton(){
        // window.localStorage.getItem('login')==="true" ? 
        // window.location.href="/cart":window.location.href="/login"
    }
    const data = [
      {
        name: 'January',
        Sales: 40000,
        Profit: 24000,
        amt: 2400,
      },
      {
        name: 'Februrary',
        Sales: 30000,
        Profit: 13980,
        amt: 2210,
      },
      {
        name: 'March',
        Sales: 20000,
        Profit: 30000,
        amt: 2290,
      },
      {
        name: 'April',
        Sales: 27800,
        Profit: 39080,
        amt: 2000,
      },
      {
        name: 'May',
        Sales: 1890,
        Profit: 4800,
        amt: 2181,
      },
      {
        name: 'June',
        Sales: 23900,
        Profit: 58000,
        amt: 2500,
      },
      {
        name: 'July',
        Sales: 54900,
        Profit: 73000,
        amt: 2100,
      },
    ];
      function logout(){
        window.location.href="/"; 
        }
    
    return (<div>
     {/* sidebar*/}
      <div className="d-flex" id="wrapper">
    <div className="border-end bg-white" style={{width:"250px"}} id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom bg-light" id="dashHeader">Administration</div>
        <div className="list-group list-group-flush" id="dashItem">
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="collectionLogin">Purchase Laptop</Link>
            {/* <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="addItem">Add item</Link> */}
        </div>
    </div>
    {/* navbar */}
    <div id="page-content-wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom" style={{"height":"70px"}}>
                    <div className="container-fluid">
                        {/* <button className="btn btn-light" id="sidebarToggle">&#9776;</button> */}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                        
                        <div className="collapse navbar-collapse" id="navbarSupportedCon    tent">
                            
                            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                            
                            <li><button id="cartButton" onClick={handleCartButton} className="btn btn-outline-dark rounded-circle" 
                            ><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg></button></li>
                            <li><Link id="logoutButton2" onClick={logout} type="button"  style={{borderRadius:"40px"}} className="btn btn-secondary">Log out</Link></li>   
                            </ul>
                        </div>
                    </div>
                    
                </nav>

        {/* card */}
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row" style={{"padding-top":"10px"}}>
        
                    <div className="col-sm-7">
                        <div className="card" id="card1" style={{"height":"250px"}}>
                            <div className="row"  >
                                <div className="col-sm-7"   >
                                  <div style={{"padding-left":"30px"}}>
                                    <h5 className="card-title" >Congratulations # 🎉</h5>
                                    <p className="card-text">You are the best seller of the month!</p>
                                    <h5>$43000</h5>
                                  </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="card-body pb-0 px-0 px-md-4">
                                        <img
                                            src="images/background_images/man-with-laptop-light.png"
                                            height="140"
                                            alt="View Badge User"
                                            data-app-dark-img="illustrations/man-with-laptop-dark.png"
                                            data-app-light-img="illustrations/man-with-laptop-light.png"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-4 order-1">
                        <div className="row" >
                          <div className="col-lg-6 col-md-12 col-6 mb-4">
                            <div className="card"  style={{"height":"250px"}}>
                              <div className="card-body" >
                                <div className="card-title d-flex alignItems-start justify-content-between">
                                  <div className="avatar flex-shrink-0">
                                  </div>
                                  <div className="dropdown">
                                    <button
                                      className="btn p-0"
                                      type="button"
                                      id="cardOpt3"
                                      data-bs-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    >
                                      <i className="bx bx-dots-vertical-rounded"></i>
                                    </button>
                            
                                  </div>
                                </div>
                                <span className="fw-semibold d-block mb-1">Profit</span>
                                <h3 className="card-title mb-2">$12,628</h3>
                                <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +72.80%</small>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-12 col-6 mb-4">
                            <div className="card" style={{"height":"250px"}}>
                              <div className="card-body">
                                <div className="card-title d-flex alignItems-start justify-content-between">
                                  <div className="avatar flex-shrink-0">
                                  </div>
                                  <div className="dropdown">
                                    <button
                                      className="btn p-0"
                                      type="button"
                                      id="cardOpt6"
                                      data-bs-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    >
                                      <i className="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                  
                                  </div>
                                </div>
                                <span>Sales</span>
                                <h3 className="card-title text-nowrap mb-1">$4,3000</h3>
                                <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +28.42%</small>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
          <div className="col-12" style={{"margin-left":"35px","width":"1300px"}}>
                  <div className="card">
                  <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
        <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Profit" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
                  </div>
              </div>
              </div>
        </div>
</div>

</div>
)

}



export default AdminDashboard