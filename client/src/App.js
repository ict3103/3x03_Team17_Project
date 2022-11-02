import './App.css';
import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useIdleTimer } from 'react-idle-timer'
import { useHistory } from "react-router-dom";
import './components/boilerplates/Main';
import Main from './components/boilerplates/Main';
import Login from './components/boilerplates/Login';
import Profile from "./components/boilerplates/Profile/Profile";
import Register from './components/boilerplates/register/Register';
import Collection from './components/boilerplates/Collection';
import ShoppingCart from './components/boilerplates/cart/ShoppingCart';
import VerificationPage from './components/boilerplates/register/VerificationPage';
import VerifiedPage from './components/boilerplates/register/VerifiedPage';
import ResetPasswordPage from './components/boilerplates/resetPassword/ResetPasswordPage';
import ResetSuccess from './components/boilerplates/resetPassword/ResetSuccessPage';
import Payment from './components/boilerplates/cart/Payment';
import PaymentComplete from './components/boilerplates/cart/PaymentComplete';
import ProductDetails from './components/boilerplates/ProductDetails';
import PrivateRoute from './components/boilerplates/routes/PrivateRoutes';
import PublicRoute from './components/boilerplates/routes/PublicRoutes';
import { Route} from "react-router-dom"
import {IsValidJWT,setAuthenToken } from './components/boilerplates/utils/Token'


function App() {
    const history = useHistory()
    const timeout = 900000
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

    if (isIdle && localStorage.getItem("token") !== null) {
        localStorage.removeItem("token")
        history.push("/login")
        alert("Your session has expired. Please Login again.")
    }

    //check jwt token
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenToken(token);
    }
    return (

      <div>
            {isIdle && localStorage.getItem("token") !== null}
      <div>

      
      <Route Exact path="/" component={Main}></Route>
      
      <PublicRoute Exact path="/collection" component={Collection}></PublicRoute>

      <PublicRoute Exact path="/register" component={Register}></PublicRoute>

      <PublicRoute Exact path="/productdetails" component={ProductDetails} ></PublicRoute>
      
      <PublicRoute Exact path="/login" component={Login}></PublicRoute>

      <PrivateRoute path="/cart" IsValidJWT={IsValidJWT} component={ShoppingCart} ></PrivateRoute>

      <PrivateRoute path="/payment" IsValidJWT={IsValidJWT} component={Payment}></PrivateRoute>

      <PrivateRoute path="/paymentComplete" IsValidJWT={IsValidJWT} component={PaymentComplete}></PrivateRoute>

      <PublicRoute path="/verification" IsValidJWT={IsValidJWT} component={VerificationPage}
      ></PublicRoute>

      <PublicRoute path="/verifiedPage" IsValidJWT={IsValidJWT} component={VerifiedPage}
      ></PublicRoute>

      <PublicRoute path="/resetPassword/:token"  component={ResetPasswordPage}
      ></PublicRoute>

      <PublicRoute path="/resetPasswordSuccess"  component={ResetSuccess}
      > </PublicRoute>
	  <PrivateRoute path="/profile" IsValidJWT={IsValidJWT} component={Profile} ></PrivateRoute>
          </div>
      </div>  
  );
}

export default App;
