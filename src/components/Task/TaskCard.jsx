import React from 'react';
import { Typography, Box, IconButton, Tooltip, Menu, MenuItem, Divider, ListItemIcon } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import {
  MdLogout,
  MdPersonAdd,
  MdSettings,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";

const TaskCard = ({data}) => {
     const [anchorEl, setAnchorEl] = React.useState(null);
     const open = Boolean(anchorEl);
     const handleClick = (event) => {
       setAnchorEl(event.currentTarget);
     };
     const handleClose = () => {
       setAnchorEl(null);
     };
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
                sx={{ color: "#808080", fontSize: "12px", fontWeight: "400" }}
                variant="caption"
                display="block"
              >
                {data.desc}
              </Typography>

              <Typography
                sx={{ color: "#d1453b", fontSize: "12px", fontWeight: "400" }}
                variant="subtitle2"
                component="div"
              >
                {data.time}
              </Typography>
            </Box>
          </Box>
          <Tooltip title="Edit Task">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <DeleteOutlineIcon /> Delete Task
          </MenuItem>
          <MenuItem>
            <ModeEditOutlineIcon /> Edit Task
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <MdPersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <MdSettings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <MdLogout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    );
};

export default TaskCard;