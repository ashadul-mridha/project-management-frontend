import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import React from "react";

const UsersList = ({ avatarSize, data }) => {
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
        total={data.length}
        max={5}
      >
        {data.map((user) => (
          <Avatar
            key={user.id}
            alt={user.image}
            src={`${process.env.REACT_APP_URL}/images/uploads/user/${user.image}`}
          />
        ))}
      </AvatarGroup>
    </>
  );
};

export default UsersList;
