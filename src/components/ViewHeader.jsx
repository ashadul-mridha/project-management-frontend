import React from 'react';
import { Typography, Box } from "@mui/material";


const ViewHeader = ({data}) => {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginBottom: "20px",
            // position: "sticky",
            // top: 0,
            // backgroundColor: "#ffffff",
            // paddingTop: "50px",
            // paddingBottom: "10px",
            // zIndex: 1
          }}
        >
          <Typography
            variant="h1"
            component="div"
            sx={{ fontSize: "20px", fontWeight: "700" }}
            color="#000"
          >
            {data?.name}
          </Typography>
          <Typography
            variant="p"
            component={"p"}
            sx={{
              fontSize: "12px",
              fontWeight: "400",
              marginLeft: "8px",
              marginTop: "0px",
              marginBottom: "0px",
            }}
            color="grey"
          >
            {/* {data?.name} */}
          </Typography>
        </Box>
      </>
    );
};

export default ViewHeader;