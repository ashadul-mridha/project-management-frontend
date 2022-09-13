import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';
import AppThemeProvider from './themes/AppThemeProvider';
import AuthContextProvider from './utils/providers/AuthContextProvider';
import NavbarContextProvider from './utils/providers/NavbarContextProvider';
//date pickers
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <AppThemeProvider>
        <NavbarContextProvider>
          <AuthContextProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <App />
            </LocalizationProvider>
          </AuthContextProvider>
        </NavbarContextProvider>
      </AppThemeProvider>
    </BrowserRouter>
  </>
);
