import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import styles from "./project.module.css";

import { useDrag } from "react-dnd";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";

const ProjectcardTask = ({ data }) => {

  const id = data.id;
  // console.log('taskDetails', data);

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const { setOpenEditTask, setEditTaskId } = useNavbarContextHooks();

  const handleTaskDetails = async () => {
    setOpenEditTask(true);
    setEditTaskId(data.id);
  };

  // console.log(isDragging);
  const cssClass = isDragging ? styles.projectTaskCardDragOn : styles.projectTaskCard ;

  return (
    <>
      <Box ref={drag} onClick={handleTaskDetails} className={cssClass}>
        <IconButton sx={{ p: 0, margin: "0px 5px 0px 0px" }} aria-label="check">
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

          <div
            style={{ fontSize: "12px" }}
            dangerouslySetInnerHTML={{ __html: data.desc }}
          ></div>
        </Box>
      </Box>
    </>
  );
};

export default ProjectcardTask;
