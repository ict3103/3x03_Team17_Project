import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../styles/collection.css'
import { Link } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';
import { useHistory } from "react-router-dom";

function ProductDetails() {
    const [collectionData, setCollectionData] = useState([])
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/collection").then((response) => {
            setCollectionData(response.data.collection)
        })
    }, [])
    const history = useHistory()
    const handleCartButton = (e) => {
        window.localStorage.setItem("ProductDetails", e.target.value)
        window.localStorage.getItem('login') === "true" ?
            window.location.href = "/cart" : window.location.href = "/login"
    }


    return (<div >
        {window.localStorage.getItem('login') === "false" ?
            <nav class="navbar navbar-expand-lg navbar-dark" style={{ "background-color": "rgba(0, 0, 0)" }}>
                <div class="container-fluid"> <FaReact className="App-logo" />
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/collection">Shop</Link>
                            </li>
                        </ul>
                        <form class="d-flex">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link class="nav-link" aria-current="page" to="register">Register</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="btn btn-dark" to="login" style={{ "border-radius": "30px;", "background-color": "transparent" }} role="button">Login</Link>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </nav>
            : <div />
        }



        {collectionData.filter(laptopId => laptopId[0] == window.localStorage.getItem("ProductDetails")).map((val) => {
            return <div style={{ "text-align": "center", "backgroundImage": "url('https://t3.ftcdn.net/jpg/01/72/90/92/360_F_172909278_plxmQjlUaw14rJv7qyHrrlc8UJMh0weg.jpg')", "background-repeat": "no-repeat", "background-size": "100%" }}>
                <br></br>
                <h2 > {val[1]} </h2>
                <br></br>
                <img src={require(`../../${val[2]}`)} style={{ "height": "160px", "width": "254px" }} class="card-img-top" alt=".." />
                <br></br>
                <br></br>
                <p id="laptopPrice">Price: ${val[3]}</p>
                <br></br>
                <p id="laptopPrice">Description:</p>
                <p style={{ "width": "70%", "margin": "0 auto" }}><mark style={{ "background-color": "white" }}>{val[4]}</mark></p>
                <br></br>
                <div >
                    <div style={{ "text-align": "center", "position": "relative", "padding-right": "45%", "padding-left": "45%" }}>
                        <button style={{ "padding": "0px" }} id="productButton" type="button" onClick={handleCartButton} value={val[0]} class="btn btn-primary btn-lg" >Purchase</button>
                    </div>

                    <br></br>
                </div>
                <div id="backButton1">
                    {window.localStorage.getItem('login') === "true" ?
                        <Link to="/adminDashboard" class="btn btn-secondary btn-lg">Back</Link>
                        :
                        <Link to="/collection" class="btn btn-secondary btn-lg">Back</Link>
                    }

                </div>
            </div>

        })
        }

    </div>

    )
}






export default ProductDetails;
