import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom';

export type ProtectedRouteProps = {
    isAuth: boolean;
} & RouteProps;

const ProtectedRoute = ({isAuth, ...routeProps}: ProtectedRouteProps) => {   
    if(isAuth) {
      return <Route {...routeProps} />;
    } else {
      return <Redirect to="/" />;
    }
};

export default ProtectedRoute;