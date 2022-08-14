import React from 'react';
import Box from "@mui/material/Box";
import MainFilter from '../MainFilter/MainFilter';
import useNavbarContextHooks from '../../utils/hooks/useNavbarContext';
import ProjectAccordion from '../projectAccordion/ProjectAccordion';


const LeftBar = () => {
  
  const { showSideBar} = useNavbarContextHooks();

    return (
      <>
        <Box
          sx={
            showSideBar
              ? {
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  width: "350px",
                  height: "100vh",
                  overflowY: "auto",
                  position: "fixed",
                  left: 0,
                  top: "0px",
                  boxSizing: "border-box",
                  paddingTop: "80px",
                  zindex: 999,
                }
              : {
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  width: "350px",
                  height: "100vh",
                  overflow: "hidden",
                  position: "fixed",
                  left: -350,
                  top: "50px",
                  boxSizing: "border-box",
                  paddingTop: "30px",
                  zindex: 999,
                }
          }
        >
          <MainFilter />
          <ProjectAccordion />
        </Box>
      </>
    );
};

export default LeftBar;