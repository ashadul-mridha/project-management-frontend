// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { MdEventAvailable } from "react-icons/md";
// import CustomMenu from "../MuiCustomComponent/CustomMenu";
import UsersList from "../MuiCustomComponent/UsersList";

const BookingCard = ({ data }) => {


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };



  // custom menu call to action
  // const menuItemData = [
  //   { icon: <DeleteOutlineIcon />, name: "Delete Task" },
  //   { icon: <ModeEditOutlineIcon />, name: "Edit Task" },
  // ];

  const compoId = "account-menu";

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
              <MdEventAvailable color="#eb8909" />
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
                {new Date(data.link).toUTCString().substring(0, 16)}
              </Typography>

              <Typography
                sx={{ color: "#d1453b", fontSize: "12px", fontWeight: "400" }}
                variant="subtitle2"
                component="div"
              >
                {new Date(data.startDate).toUTCString().substring(0, 16)}
              </Typography>
            </Box>
          </Box>
          <Box>
            <UsersList data={data.users} avatarSize={25} />
          </Box>
        </Box>
        <Tooltip title="Task Action">
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

export default BookingCard;
