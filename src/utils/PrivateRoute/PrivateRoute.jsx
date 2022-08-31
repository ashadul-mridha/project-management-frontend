import React from 'react';
import {Navigate } from "react-router-dom";
import useAuthHooks from '../hooks/useAuth';

const PrivateRoute = ({ children, redirectTo }) => {
    const { getUser } = useAuthHooks();

    const user = getUser(); 

    return (
      <>
        {user?.email ? (
          children
        ) : (
          <Navigate to={redirectTo} />
        )}
      </>
    );
};

export default PrivateRoute;