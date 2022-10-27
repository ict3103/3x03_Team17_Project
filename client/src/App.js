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
import ProtectedRoutes from './components/boilerplates/ProtectedRoutes';
import PrivateRoute from './components/boilerplates/PrivateRoutes';
import PublicRoute from './components/boilerplates/PublicRoutes';


window.localStorage.setItem('true',true)
function App() {
    const isAuthenticated = window.localStorage.getItem('true')
    return (
        <div>
    <div>
      {/* react router for defining routes */}
      {/* <Router> */}
      <Suspense fallback="loading">
        {/* <Switch> */}
      <PublicRoute
            Exact path="/"
          >
        <Main />
      </PublicRoute>
      <PublicRoute
            path="/register"
          >
        <Register />
      </PublicRoute>
      <PublicRoute
           path="/collection"
          >
        <Collection />
      </PublicRoute>
      
      <PublicRoute
            path="/login"
          >
        <Login />
      </PublicRoute>
      <PrivateRoute
            path="/cart"
            isAuthenticated={!isAuthenticated}
          >
            <ShoppingCart />
      </PrivateRoute>
      <PrivateRoute
            path="/collectionLogin"
            isAuthenticated={!isAuthenticated}
          >
            <CollectionLogin />
      </PrivateRoute>
          <PrivateRoute
            path="/payment"
            isAuthenticated={!isAuthenticated}
          >
            <Payment />
          </PrivateRoute>
          <PrivateRoute
            path="/paymentComplete"
            isAuthenticated={!isAuthenticated}
          >
            <paymentComplete />
          </PrivateRoute>
          <PrivateRoute
            path="/verification"
            isAuthenticated={!isAuthenticated}
          >
            <VerificationPage />
          </PrivateRoute>
          <PrivateRoute
            path="/verifiedPage"
            isAuthenticated={!isAuthenticated}
          >
            <VerifiedPage />
          </PrivateRoute>
          <PrivateRoute
            path="/resetPassword/:token"
            isAuthenticated={!isAuthenticated}
          >
            <ResetPasswordPage />
          </PrivateRoute>
          <PrivateRoute
            path="/resetPasswordSuccess"
            isAuthenticated={!isAuthenticated}
          >
            <ResetSuccess />
          </PrivateRoute>
          <PrivateRoute
            path="/productdetails"
            isAuthenticated={!isAuthenticated}
          >
            <ProductDetails />
          </PrivateRoute>
      {/* </Switch> */}
      </Suspense>
      {/* </Router> */}
            </div>
            
        </div>
        
       
  );
}

export default App;
