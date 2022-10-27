import {
    Route,
    Redirect
  } from 'react-router-dom';
  
  //for authorized users
  function PrivateRoute({ children, isAuthenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={
          ({ location }) => (
            isAuthenticated
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