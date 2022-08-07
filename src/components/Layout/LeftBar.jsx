import React from 'react';
import Box from "@mui/material/Box";
import MainFilter from '../MainFilter/MainFilter';


const LeftBar = () => {
    return (
      <>
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.secondary.main,
            width: '350px',
            height: '100vh',
            overflow: 'hidden',
            position: 'fixed',
            left: 0,
            top: '50px',
            boxSizing: 'border-box',
            paddingTop: '30px'
          }}
        >
          <MainFilter />
        </Box>
      </>
    );
};

export default LeftBar;