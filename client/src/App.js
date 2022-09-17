import './App.css';
import React from "react";
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



function App() {

  return (
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
  );
}

export default App;
