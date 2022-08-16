import React from 'react';
import {Box, Typography, IconButton, MenuItem, ListItemIcon, Menu} from '@mui/material';
import { displayflex } from "../../themes/commonStyles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MdLogout, MdPersonAdd, MdSettings } from 'react-icons/md';

const ProjectStatusHeader = ({ header }) => {
    
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
      <Box sx={{ ...displayflex, padding: "3px 0px" }}>
        <Typography
          sx={{ fontSize: "14px", fontWeight: 700, color: "#202020" }}
          variant="h6"
          color="initial"
        >
          {header}
        </Typography>
        <IconButton
          onClick={handleClick}
          sx={{ fontSize: "14px" }}
          aria-label="editdelete"
        >
          <MoreHorizIcon />
        </IconButton>
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
          <ListItemIcon>
            <MdPersonAdd fontSize="small" />
          </ListItemIcon>
          Add Section
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
          Delete Section
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProjectStatusHeader;