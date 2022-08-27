import React from 'react';
import PrivateRoute from './PrivateRoutes';
import PublicRoute from './PublicRoutes';

const AuthorizationContext  = React.createContext();

const Routes = () => {
   
  const token = localStorage.getItem('token');
  alert(token)
  // conditionally route based on the token value

  return (
    <AuthorizationContext.Provider value={token}>
      {!!token ? <PrivateRoute /> : <PublicRoute />}
    </AuthorizationContext.Provider>
  )
}

export default Routes;