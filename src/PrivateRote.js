import React, { useContext } from 'react';
import { Route,Navigate} from 'react-router-dom';
import {authContext} from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token,admin } = useContext(authContext);
  return token? children : <Navigate to="/authentication/sign-in" />;
/*  we are spreading routeProps to be able to access this routeProps in the component. */
};

export default PrivateRoute;