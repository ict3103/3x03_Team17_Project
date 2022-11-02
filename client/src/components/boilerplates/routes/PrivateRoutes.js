import {
    Route,
    Redirect
  } from 'react-router-dom';



  //for authorized users
  const PrivateRoute = ({component: Component,IsValidJWT, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
          IsValidJWT() ?
                <Component {...props} />
            : <Redirect to="/Login" />
        )} />
    );
};
  
  export default PrivateRoute;