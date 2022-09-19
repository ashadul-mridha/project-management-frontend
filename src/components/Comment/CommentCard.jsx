import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import useAuthHooks from "../../utils/hooks/useAuth";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import CustomMenu from "../MuiCustomComponent/CustomMenu";
// import UsersList from "../MuiCustomComponent/UsersList";

const CommentCard = ({ data }) => {
  
  const { setOpenEditTask, setEditTaskId, setCallTask } =
    useNavbarContextHooks();
  const { getToken, getUser } = useAuthHooks();
  const token = getToken();
  const { userRole , userid } = getUser();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTaskDetails = async () => {
    setOpenEditTask(true);
    setEditTaskId(data.id);
  };

  const handleDeleteComment = async () => {
    const url = `${process.env.REACT_APP_API_KEY}/comment/${data?.id}`;
    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.status) {
      setCallTask((prevState) => !prevState);
    }
  }

  const menuItemData = [
    { icon: <DeleteOutlineIcon />, name: "Delete Comment", action : handleDeleteComment },
    // { icon: <ModeEditOutlineIcon />, name: "Edit Comment" },
  ];

  const compoId = "comment-menu";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #dbdbdb",
          padding: "5px",
        }}
      >
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
              <Avatar
                src={`${process.env.REACT_APP_URL}/images/uploads/user/${data?.user.image}`}
              />
            </IconButton>
            <Box>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "400", color: "#202020" }}
                variant="h6"
                component="div"
              >
                {data?.user.name}
              </Typography>

              <Typography
                sx={{
                  color: "#808080",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                {new Date(data?.createdAt).toUTCString().substring(0, 16)}
              </Typography>

              <Typography
                sx={{ color: "#d1453b", fontSize: "12px", fontWeight: "400" }}
                variant="subtitle2"
                component="div"
              >
                {data?.text}
              </Typography>
            </Box>
          </Box>
          <Box>{/* <UsersList data={data.users} avatarSize={25} /> */}</Box>
        </Box>
        {userRole === "admin" ? (
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? compoId : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreHorizIcon />
          </IconButton>
        ) : (
          data?.user.id === userid && (
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? compoId : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MoreHorizIcon />
            </IconButton>
          )
        )}
      </Box>
      <CustomMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        open={open}
        menuItemData={menuItemData}
        compoId={compoId}
      />
    </>
  );
};

export default CommentCard;
