import React from 'react';
import Navbar from './Navbar';
import Box from "@mui/material/Box";
import {displayflex} from '../../themes/commonStyles.js';
import LeftBar from './LeftBar';
import Main from './Main';
// import AddProjectModal from '../Modal/AddProjectModal';
// import AddTaskModal from '../Modal/AddTaskModal';
// import EditTaskModal from '../Modal/EditTaskModal';

const HomeLayout = () => {

    return (
      <>
        <Box>
          <Navbar />
        </Box>
        <Box
          sx={{
            ...displayflex,
            marginTop: "50px",
          }}
        >
          <LeftBar />
          <Main />
        </Box>
        {/* secure modal component  */}
        {/* <AddProjectModal />
        <AddTaskModal />
        <EditTaskModal /> */}
      </>
    );
};

export default HomeLayout;