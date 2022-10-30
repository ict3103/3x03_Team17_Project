import './App.css';
import React, { useState, Suspense,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

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
import Payment from './components/boilerplates/cart/Payment';
import PaymentComplete from './components/boilerplates/cart/PaymentComplete';
import CollectionLogin from './components/boilerplates/CollectionLogin';
import ProductDetails from './components/boilerplates/ProductDetails';
import PrivateRoute from './components/boilerplates/PrivateRoutes';
import PublicRoute from './components/boilerplates/PublicRoutes';
import { Route} from "react-router-dom"
import {IsValidJWT} from './components/boilerplates/Token'
import { setAuthenToken } from './components/boilerplates/Token';


function App() {
    //check jwt token
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenToken(token);
    }
    return (
    <div>
      <div>
      
      <Route Exact path="/" component={Main}></Route>
      
      <PublicRoute Exact path="/collection" component={Collection}></PublicRoute>

      <PublicRoute Exact path="/register" component={Register}></PublicRoute>

      <PublicRoute Exact path="/productdetails" IsValidJWT={!IsValidJWT} component={ProductDetails} ></PublicRoute>

    
      
      <PublicRoute Exact path="/login" component={Login}></PublicRoute>

      <PrivateRoute path="/cart" IsValidJWT={IsValidJWT} component={ShoppingCart} ></PrivateRoute>

      <PrivateRoute path="/payment" IsValidJWT={IsValidJWT} component={Payment}></PrivateRoute>

      <PrivateRoute path="/paymentComplete" IsValidJWT={IsValidJWT} component={PaymentComplete}></PrivateRoute>

      <PrivateRoute path="/verification" IsValidJWT={IsValidJWT} component={VerificationPage}
      ></PrivateRoute>

      <PrivateRoute path="/verifiedPage" IsValidJWT={IsValidJWT} component={VerifiedPage}
      ></PrivateRoute>

      <PrivateRoute path="/resetPassword/:token" IsValidJWT={IsValidJWT} component={ResetPasswordPage}
      ></PrivateRoute>

      <PrivateRoute path="/resetPasswordSuccess" IsValidJWT={IsValidJWT} component={ResetSuccess}
      > </PrivateRoute>
          </div>
      </div>  
  );
}

export default App;
