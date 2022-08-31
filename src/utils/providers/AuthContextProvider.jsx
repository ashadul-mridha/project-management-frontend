import React, { createContext } from 'react';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {

    let navigate = useNavigate();

    // set user to localhost
    const setUserToBrowser = (data) => {
        const dataStringfy = JSON.stringify(data);
        localStorage.setItem('userInfo', dataStringfy);
        // navigate("/");
    }

    // get user from browser
    const getUser = () => {
        const user = localStorage.getItem('userInfo');
        const parseUser = JSON.parse(user);
        return parseUser;
    }

    const getToken = () => {
        const user = localStorage.getItem("userInfo");
        const parseUser = JSON.parse(user);
        return parseUser?.jwtToken;
    }

    // remove user From Browser or logout
    const logout = () => {
        localStorage.removeItem('userInfo');
        // window.location.reload();
        navigate('/login');
    }

    return (
      <AuthContext.Provider
        value={{ setUserToBrowser, getUser, logout, getToken }}
      >
        {children}
      </AuthContext.Provider>
    );
};

export default AuthContextProvider;