import './App.css';
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route} from 'react-router-dom';
import './components/boilerplates/Main';
import Main from './components/boilerplates/Main';
import Login from './components/boilerplates/Login';
import Register from './components/boilerplates/register/Register';
import Collection from './components/boilerplates/Collection';
import ShoppingCart from './components/boilerplates/cart/ShoppingCart';
import VerificationPage from './components/boilerplates/register/VerificationPage';
import VerifiedPage from './components/boilerplates/register/VerifiedPage';
import ResetPasswordPage from './components/boilerplates/resetPassword/ResetPasswordPage';
import ResetSuccess from './components/boilerplates/resetPassword/ResetSuccessPage';
import Payment from './components/boilerplates/cart/Payment'
import CollectionLogin from './components/boilerplates/CollectionLogin';
import ProductDetails from './components/boilerplates/ProductDetails';
import { useIdleTimer } from 'react-idle-timer'
import { useHistory } from "react-router-dom";



function App() {
    const history = useHistory()
    const timeout = 3000
    const [remaining, setRemaining] = useState(timeout)
    const [elapsed, setElapsed] = useState(0)
    const [lastActive, setLastActive] = useState(+new Date())
    const [isIdle, setIsIdle] = useState(false)

    const handleOnActive = () => setIsIdle(false)
    const handleOnIdle = () => setIsIdle(true)

    const {
        getRemainingTime,
        getLastActiveTime,
        getElapsedTime
    } = useIdleTimer({
        timeout,
        onActive: handleOnActive,
        onIdle: handleOnIdle
    })

    useEffect(() => {
        setRemaining(getRemainingTime())
        setLastActive(getLastActiveTime())
        setElapsed(getElapsedTime())

        setInterval(() => {
            setRemaining(getRemainingTime())
            setLastActive(getLastActiveTime())
            setElapsed(getElapsedTime())
        }, 1000)
    }, [])

    if (isIdle && window.localStorage.getItem("login") === 'true') {
        window.localStorage.setItem("login", false)
        history.push("/login")
        alert("Your session has expired. Please Login again.")
    }



    return (
        <div>
            {/* <div>
          <h1>Timeout: {timeout}ms</h1>
          <h1>Time Remaining: {remaining}</h1>
          <h1>Time Elapsed: {elapsed}</h1>
          <h1>Last Active: {format(lastActive, 'MM-dd-yyyy HH:MM:ss.SSS')}</h1>
          <h1>Idle: {isIdle.toString()}</h1>
          <h1>Idle: {window.localStorage.getItem("login")}</h1>
        </div> */}
            <div>

                {isIdle && window.localStorage.getItem("login") === 'true'}

            </div>
    <div>
      <Route exact path="/">
        <Main></Main>
      </Route>
      <Route path="/collection">
        <Collection ></Collection>   
      </Route>
      <Route path="/register">
        <Main></Main>
        <Register></Register>
      </Route>
      <Route path="/login">
        <Main></Main>
        <Login></Login>
      </Route>
      <Route path="/cart">
        <ShoppingCart></ShoppingCart>
      </Route>
      <Route path="/payment">
        <Payment></Payment>
      </Route>
      <Route path="/verification">
        <Main></Main>
        <VerificationPage></VerificationPage>
      </Route>
      <Route path="/verifiedPage">
        <VerifiedPage></VerifiedPage>
      </Route>
      <Route path="/resetPassword/:token">
        <Main></Main>
        <ResetPasswordPage ></ResetPasswordPage>
      </Route>
      <Route path="/resetPasswordSuccess">
        <Main></Main>
        <ResetSuccess ></ResetSuccess>
      </Route>
      <Route path="/collectionlogin">
        <CollectionLogin ></CollectionLogin>   
      </Route>
      <Route path="/productdetails">
        <ProductDetails></ProductDetails>
      </Route>
       {/* <Route path="/addItem">
        <AddItem >
        </AddItem>  
      </Route>
      <Route path="/editItem">
        <EditItem >
        </EditItem>  
      </Route>
      <Route path="/adminDashboard">
        <AdminDashboard >
        </AdminDashboard>  
      </Route> */}
            </div>
        </div>
  );
}

export default App;
