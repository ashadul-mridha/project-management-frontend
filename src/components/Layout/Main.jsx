import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import AppRouter from "../../routes";
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
                overflowY: "scroll",
                width: "100%",
                maxHeight: "100vh",
                height: "100vh",
                background: "#ffffff",
              }
            : {
                paddingTop: "50px",
                overflowY: "scroll",
                width: "100%",
                maxHeight: "100vh",
                height: "100vh",
                background: "#ffffff",
              }
        }
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AppRouter />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
