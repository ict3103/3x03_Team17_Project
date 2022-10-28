import {
    Route,
    Redirect
  } from 'react-router-dom';
  
  //for authorized users
  function PrivateRoute({ children, IsValidJWT, ...rest }) {
    return (
      <Route
        {...rest}
        render={
          ({ location }) => (
            IsValidJWT
              ? (
                //redirect to the private routes if authenticated
                children
              ) : (
                <Redirect
                //redirect to login route if not authenticated
                  to={{
                    pathname: './Login',
                    state: { from: location }
                  }}
                />
              ))
        }
      />
    );
  }
  
  export default PrivateRoute;