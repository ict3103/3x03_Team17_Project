import {
    Route,
    Redirect
  } from 'react-router-dom';
  
  //for all users
  function PublicRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={() => (children)
        }
      />
    );
  }
  
  export default PublicRoute;