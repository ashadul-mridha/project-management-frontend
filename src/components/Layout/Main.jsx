import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import AppRouter from "../../routes";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import ViewHeader from "../ViewHeader";

export default function Main( ) {
  const { showSideBar } = useNavbarContextHooks();

  return (
    <>
      <Box
        sx={
          showSideBar
            ? {
                marginLeft: "350px",
                marginTop: "50px",
              }
            : {
                marginLeft: "200px",
                marginTop: "50px",
              }
        }
      >
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ViewHeader />
              <AppRouter />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
