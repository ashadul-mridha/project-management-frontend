// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { MdCheckBoxOutlineBlank, MdDeleteOutline } from "react-icons/md";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
// import CustomMenu from "../MuiCustomComponent/CustomMenu";
import UsersList from "../MuiCustomComponent/UsersList";
// react dnd
import { useDrag } from "react-dnd";
import axios from "axios";
import useAuthHooks from "../../utils/hooks/useAuth";

const TaskCard = ({ data }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const {
    setOpenEditTask,
    setEditTaskId,
    showNotification,
    setShowNotification,
    setCallTask,
  } = useNavbarContextHooks();

  const { getToken } = useAuthHooks();

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // task id
  const id = data.id;
  // token
  const token = getToken();
  // delete task url
  const deleteurl = `${process.env.REACT_APP_API_KEY}/task/${id}`;
  // task deleted
  const handleTaskDelete = async () => {
    const res = await axios.delete(deleteurl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.status) {
      setCallTask((prevState) => !prevState);
      setShowNotification({
        ...showNotification,
        status: true,
        message: res.data.message,
      });
    }
  };

  const handleTaskDetails = async () => {
    setOpenEditTask(true);
    setEditTaskId(data.id);
  };

  // custom menu call to action
  // const menuItemData = [
  //   { icon: <DeleteOutlineIcon />, name: "Delete Task" },
  //   { icon: <ModeEditOutlineIcon />, name: "Edit Task" },
  // ];

  // const compoId = "account-menu";

  const cardWrapCss = isDragging
    ? {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #dbdbdb",
        padding: "5px",
        opacity: "0.2",
      }
    : {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #dbdbdb",
        padding: "5px",
      };

  return (
    <>
      <Box sx={cardWrapCss} ref={drag}>
        <Box
          onClick={handleTaskDetails}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
            }}
          >
            <IconButton
              sx={{ p: 0, margin: "0px 5px 0px 0px" }}
              aria-label="check"
            >
              <MdCheckBoxOutlineBlank color="#eb8909" />
            </IconButton>
            <Box>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "400", color: "#202020" }}
                variant="h6"
                component="div"
              >
                {data.name}
              </Typography>

              <Typography
                sx={{
                  color: "#808080",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                {new Date(data.end_time).toUTCString().substring(0, 16)}
                {/* {data.end_time.substring(0, 10)} */}
              </Typography>

              <Typography
                sx={{ color: "#d1453b", fontSize: "12px", fontWeight: "400" }}
                variant="subtitle2"
                component="div"
              >
                {/* {new Date(data.end_time).toUTCString().substring(0, 16)} */}
              </Typography>
            </Box>
          </Box>
          <Box>
            <UsersList data={data.users} avatarSize={25} />
          </Box>
        </Box>
        <Tooltip title="Delete Task">
          {/* <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? compoId : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreHorizIcon />
          </IconButton> */}
          <IconButton onClick={handleTaskDelete} size="small" sx={{ ml: 2 }}>
            <MdDeleteOutline color="red" size={23} />
          </IconButton>
        </Tooltip>
      </Box>
      {/* <CustomMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        open={open}
        menuItemData={menuItemData}
        compoId={compoId}
      /> */}
    </>
  );
};

export default TaskCard;
