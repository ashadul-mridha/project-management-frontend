import React from 'react';
import {Navigate } from "react-router-dom";

const PrivateRoute = ({ children, redirectTo }) => {
    

    return (
      <>
        { localStorage.getItem("userInfo") ? (
          children
        ) : (
          <Navigate to={redirectTo} />
        )}
      </>
    );
};

export default PrivateRoute;