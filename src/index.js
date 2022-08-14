import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';
import AppThemeProvider from './themes/AppThemeProvider';
import NavbarContextProvider from './utils/providers/NavbarContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <AppThemeProvider>
        <NavbarContextProvider>
          <App />
        </NavbarContextProvider>
      </AppThemeProvider>
    </BrowserRouter>
  </>
);
