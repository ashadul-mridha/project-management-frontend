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
// react dnd
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <AppThemeProvider>
          <AuthContextProvider>
            <NavbarContextProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DndProvider backend={HTML5Backend}>
                  <App />
                </DndProvider>
              </LocalizationProvider>
            </NavbarContextProvider>
          </AuthContextProvider>
      </AppThemeProvider>
    </BrowserRouter>
  </>
);
