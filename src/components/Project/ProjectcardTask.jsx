import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import styles from "./project.module.css";

import { useDrag } from "react-dnd";
import { MdCheckBoxOutlineBlank, MdDeleteOutline } from "react-icons/md";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import useAuthHooks from "../../utils/hooks/useAuth";
import axios from "axios";

const ProjectcardTask = ({ data }) => {

  const {
    showNotification,
    setShowNotification,
    setOpenEditTask,
    setEditTaskId,
    setCallTask,
  } = useNavbarContextHooks();
  const { getToken } = useAuthHooks();

  // task id
  const id = data.id;
  // token 
  const token = getToken();
  // delete task url
  const deleteurl = `${process.env.REACT_APP_API_KEY}/task/${id}`;

  // task deleted
  const handleTaskDelete = async () => {
    console.log("task delete", id);
    const res = await axios.delete(deleteurl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(res.data.status){

      setCallTask((prevState) => !prevState);
      setShowNotification({
        ...showNotification,
        status: true,
        message: res.data.message,
      });

    }
  };

  // console.log('taskDetails', data);

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleTaskDetails = async () => {
    setOpenEditTask(true);
    setEditTaskId(data.id);
  };

  // console.log(isDragging);
  const cssClass = isDragging ? styles.projectTaskCardDragOn : styles.projectTaskCard ;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
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

          <Typography
            sx={{
              color: "#808080",
              fontSize: "12px",
              fontWeight: "400",
            }}
          >
            {new Date(data.remain).toUTCString().substring(0, 16)}
          </Typography>

          {/* <div
            style={{ fontSize: "12px" }}
            dangerouslySetInnerHTML={{ __html: data.desc }}
          ></div> */}
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <MdDeleteOutline onClick={handleTaskDelete} color="red" size={23} />
      </Box>
    </Box>
  );
};

export default ProjectcardTask;
