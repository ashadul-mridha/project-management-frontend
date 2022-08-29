import { Box, Button } from "@mui/material";
import React from "react";
import { MdAdd } from "react-icons/md";
import styles from "./project.module.css";
import ProjectcardTask from "./ProjectcardTask";
import ProjectStatusHeader from "./ProjectStatusHeader";

const ProjectCard = ({data}) => {
    
  return (
    <>
      <Box
        className={styles.ProjectCardWrapper}
        sx={{
          flexBasis: "300px",
          flexGrow: 0,
          flexShrink: 0,
        }}
      >
        <ProjectStatusHeader header={data?.name} />
        <Box className={styles.ProjectCardTaskWrapper}>
          {data?.tasks.map((data, index) => (
            <ProjectcardTask key={index} data={data} />
          ))}
        </Box>
        <Button
          sx={{ marginTop: "10px" }}
          fullWidth
          variant="outlined"
          startIcon={<MdAdd />}
        >
          Add Task
        </Button>
      </Box>
    </>
  );
};

export default ProjectCard;
