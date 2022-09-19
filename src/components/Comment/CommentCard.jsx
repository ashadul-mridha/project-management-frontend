import React from "react";
import { Typography, Box, IconButton, Tooltip, Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import { MdCheckBoxOutlineBlank } from "react-icons/md";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import CustomMenu from "../MuiCustomComponent/CustomMenu";
// import UsersList from "../MuiCustomComponent/UsersList";

const CommentCard = ({ data }) => {
  const { setOpenEditTask, setEditTaskId } = useNavbarContextHooks();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTaskDetails = async () => {
    setOpenEditTask(true);
    setEditTaskId(data.id);
  };

  const menuItemData = [
    { icon: <DeleteOutlineIcon />, name: "Delete Comment" },
    { icon: <ModeEditOutlineIcon />, name: "Edit Comment" },
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
                <Avatar src={'lksfjlk'} />
              {/* <MdCheckBoxOutlineBlank color="#eb8909" /> */}
            </IconButton>
            <Box>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "400", color: "#202020" }}
                variant="h6"
                component="div"
              >
                Ashadul Islam
              </Typography>

              <Typography
                sx={{
                  color: "#808080",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                12 Aug 2022
                {/* {new Date(data.remain).toUTCString().substring(0, 16)} */}
                {/* {data.remain.substring(0, 10)} */}
              </Typography>

              <Typography
                sx={{ color: "#d1453b", fontSize: "12px", fontWeight: "400" }}
                variant="subtitle2"
                component="div"
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo, voluptas?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, repellat eaque. Voluptatibus dicta odit excepturi expedita praesentium eveniet debitis sequi!
              </Typography>
            </Box>
          </Box>
          <Box>
            {/* <UsersList data={data.users} avatarSize={25} /> */}
          </Box>
        </Box>
        <Tooltip title="Edit Task">
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
        </Tooltip>
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
