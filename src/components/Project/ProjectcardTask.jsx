import React from 'react';
import styles from './project.module.css';
import { Box, Typography, IconButton } from "@mui/material";

import {
//   MdLogout,
//   MdPersonAdd,
//   MdSettings,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";

const ProjectcardTask = ({data}) => {
    return (
      <>
        <Box className={styles.projectTaskCard}>
          <IconButton
            sx={{ p: 0, margin: "0px 5px 0px 0px" }}
            aria-label="check"
          >
            <MdCheckBoxOutlineBlank color="#246fe0" />
          </IconButton>
          <Box>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#202020" }}
              variant="h6"
              component="div"
            >
              {data?.name}
            </Typography>

            <div style={{ fontSize: '12px'}} dangerouslySetInnerHTML={{ __html: data.desc }}></div>
          </Box>
        </Box>
      </>
    );
};

export default ProjectcardTask;