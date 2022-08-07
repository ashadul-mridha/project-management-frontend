import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import AppThemeProvider from './themes/AppThemeProvider';
import NavbarContextProvider from './utils/providers/NavbarContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppThemeProvider>
    <NavbarContextProvider>
      <App />
    </NavbarContextProvider>
  </AppThemeProvider>
);
