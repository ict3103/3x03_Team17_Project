import './App.css';
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route} from 'react-router-dom';
import './components/boilerplates/Main';
import Main from './components/boilerplates/Main';
import Login from './components/boilerplates/Login';
import Register from './components/boilerplates/Register';
import Collection from './components/boilerplates/Collection';
import AdminDashboard from './components/boilerplates/AdminDashboard';
import AddItem from './components/boilerplates/AddItem';
import EditItem from './components/boilerplates/EditItem';
import CollectionLogin from './components/boilerplates/CollectionLogin';
import ShoppingCart from './components/boilerplates/ShoppingCart';

import VerificationPage from './components/boilerplates/VerificationPage';
import VerifiedPage from './components/boilerplates/VerifiedPage';
import ResetPasswordPage from './components/boilerplates/ResetPasswordPage';
import ResetSuccess from './components/boilerplates/ResetSuccessPage';
import Payment from './components/boilerplates/Payment';
import CheckoutForm from "./components/boilerplates/CheckoutForm";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51LfJR6CpB9vLLqcRnXQzXe50A06kntHbOSGnqXjH9peDgkHA50IzCByrzVAgVPqW7h4w55zQwq5i59FPFGwW9CRz00HkchsoUs");


function App() {
  const [clientSecret, setClientSecret] = useState("");
  const options = {
    clientSecret,
  };
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div>
       <Route path="/addItem">
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
      </Route>
      <Route path="/cart">
        <ShoppingCart></ShoppingCart>
      </Route>
       <Route path="/collection">
        <Collection ></Collection>   
      </Route>
      <Route path="/collectionLogin">
        <CollectionLogin ></CollectionLogin>   
      </Route>
      <Route path="/verification">
        <Main></Main>
        <VerificationPage></VerificationPage>
      </Route>
      <Route path="/verifiedPage">
        <VerifiedPage></VerifiedPage>
      </Route>
      <Route exact path="/">
        <Main></Main>
      </Route>
      <Route path="/login">
        <Main></Main>
        <Login></Login>
      </Route>
      <Route path="/register">
        <Main></Main>
        <Register></Register>
      </Route>
      <Route path="/resetPassword/:token">
        <Main></Main>
        <ResetPasswordPage ></ResetPasswordPage>
      </Route>
      <Route path="/resetPasswordSuccess">
        <Main></Main>
        <ResetSuccess ></ResetSuccess>
      <Route path="/payment">
        <Payment></Payment>
      </Route>
      <Route path="/create-payment-intent">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      </Route>
    </div>
  );
}

export default App;
