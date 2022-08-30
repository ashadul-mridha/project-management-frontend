import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import { Outlet } from "react-router-dom";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";

export default function Main() {
  const { showSideBar } = useNavbarContextHooks();

  return (
    <>
      <Box
        sx={
          showSideBar
            ? {
                marginLeft: "350px",
                paddingTop: "50px",
                width: "100%",
              }
            : {
                paddingTop: "50px",
                overflowY: "scroll",
                width: "100%",
              }
        }
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Outlet />
              {/* <DashboardRouter /> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
