import React from 'react';
import {Navigate } from "react-router-dom";

const PrivateRoute = ({ children, redirectTo }) => {
    const isAuth = true;

    return (
      <>
        {
            isAuth ? children : <Navigate to={redirectTo} />
        }
      </>
    );
};

export default PrivateRoute;