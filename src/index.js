import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';
import AppThemeProvider from './themes/AppThemeProvider';
import AuthContextProvider from './utils/providers/AuthContextProvider';
import NavbarContextProvider from './utils/providers/NavbarContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <AppThemeProvider>
        <NavbarContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </NavbarContextProvider>
      </AppThemeProvider>
    </BrowserRouter>
  </>
);
