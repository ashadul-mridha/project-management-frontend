import React from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import logoImage from "../../assets/image/login.png";
import { Typography, Button } from '@mui/material';
import Link from "@mui/material/Link";

const Login = () => {
    return (
      <>
        <Container>
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid item lg={6}>
              <Box>
                <Typography
                  sx={{
                    margin: "5px 0px",
                    fontSize: "25px",
                    fontWeight: "500",
                  }}
                  variant="h2"
                  color="initial"
                >
                  Login
                </Typography>
                <Box sx={{ margin: "15px 0px 15px 0px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />
                </Box>
                <Box sx={{ margin: "15px 0px 15px 0px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    fullWidth
                  />
                </Box>
                <Box sx={{ margin: "15px 0px 15px 0px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                  >
                    Login
                  </Button>
                </Box>
                <Typography sx={{ fontSize: "14px", fontWeight: '400'}} variant="p" color="#222222">
                  Don’t have an account? 
                  <Link
                  sx={{ marginLeft: '5px'}}
                    component="button"
                    variant="body2"
                    underline="always"
                    onClick={() => {
                      console.info("I'm a button.");
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Box>
                <img src={logoImage} alt="login" height={"100%"} width="100%" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </>
    );
};

export default Login;