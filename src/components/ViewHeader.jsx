import React from 'react';
import { Typography, Box } from "@mui/material";


const ViewHeader = () => {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            component="div"
            sx={{ fontSize: "20px", fontWeight: "700" }}
            color="#000"
          >
            Today
          </Typography>
          <Typography
            variant="p"
            component={"p"}
            sx={{ fontSize: "12px", fontWeight: "400", marginLeft : '8px', marginTop: '0px', marginBottom: '0px' }}
            color="grey"
          >
            Sun 7 Aug
          </Typography>
        </Box>
      </>
    );
};

export default ViewHeader;