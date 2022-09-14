import { Box, Button } from "@mui/material";
import React from "react";
import { MdAdd } from "react-icons/md";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import styles from "./project.module.css";
import ProjectcardTask from "./ProjectcardTask";
import ProjectStatusHeader from "./ProjectStatusHeader";

const ProjectCard = ({ data }) => {

  const {id , projectId} = data;
  const { setOpenAddTask , setProjectId, setStatusId } =
    useNavbarContextHooks();

  const handleAddTaskButton = () => {
    setOpenAddTask((prevState) => !prevState);
    setProjectId(projectId);
    setStatusId(id);
  };

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
          onClick={handleAddTaskButton}
        >
          Add Task
        </Button>
      </Box>
    </>
  );
};

export default ProjectCard;
