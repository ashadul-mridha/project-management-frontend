import React from 'react';
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

const UsersList = ({ avatarSize }) => {
  return (
    <>
      <AvatarGroup
        sx={{
          "& .MuiAvatar-root": {
            width: avatarSize,
            height: avatarSize,
            fontSize: 14,
            backgroundColor: (theme) => theme.palette.primary.main,
          },
        }}
        spacing="medium"
        total={7}
        max={6}
      >
        <Avatar
          alt="Remy Sharp"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        />
        <Avatar
          alt="Travis Howard"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        />
        <Avatar
          alt="Agnes Walker"
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        />
        <Avatar
          alt="Trevor Henderson"
          src="https://images.unsplash.com/photo-1629467057571-42d22d8f0cbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        />
        <Avatar
          alt="Travis Howard"
          src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        />
      </AvatarGroup>
    </>
  );
};

export default UsersList;