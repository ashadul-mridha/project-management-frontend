import { Button, CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useState } from "react";
import { Link, } from "react-router-dom";
import logoImage from "../../../assets/image/login.png";

// react hooks form
import { Controller, useForm } from "react-hook-form";
import useNavbarContextHooks from "../../../utils/hooks/useNavbarContext";

const EnterEmail = () => {
  const { showNotification, setShowNotification } = useNavbarContextHooks();

//   let navigate = useNavigate();
const [success , setSuccess] = useState(false);
const [loading, setLoading] = useState(false);

  const { handleSubmit, control } = useForm();

  //after submit form
  const onSubmit = async (data) => {

    // console.log(data);

    setLoading((prevState) => !prevState);
    const res = await axios.post(
      `${process.env.REACT_APP_API_KEY}/user/forgot/password`,
      data
    );
    setLoading((prevState) => !prevState);

    if (res.data.status) {
      setSuccess((prevState) => !prevState);
      console.log(res.data);
    } else {
      setShowNotification({
        ...showNotification,
        status: true,
        message: res.data.message,
      });
    }


  };
  return (
    <>
      <Box>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid item lg={6}>
            <Box>
              <img src={logoImage} alt="login" height={"300px"} width="100%" />
            </Box>
          </Grid>
          <Grid
            item
            lg={6}
            sx={{
              backgroundColor: "#dddddd",
              height: "calc(100vh - 30px)",
              alignSelf: "center",
            }}
          >
            <Box
              sx={{
                padding: "0px 100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  margin: "10px 0px",
                  fontSize: "25px",
                  fontWeight: "500",
                  textAlign: "left",
                }}
                variant="h2"
                color="initial"
              >
                Forgot your password? 
              </Typography>
              {success ? (
                <Typography
                  sx={{
                    margin: "5px 0px 15px 0px",
                    fontSize: "14px",
                    fontWeight: "400",
                    textAlign: "left",
                    textTransform: "lowercase",
                  }}
                  variant="p"
                  color="initial"
                >
                  You’ve been emailed a password reset link.
                </Typography>
              ) : (
                <>
                  <Typography
                    sx={{
                      margin: "5px 0px",
                      fontSize: "14px",
                      fontWeight: "400",
                      textAlign: "left",
                      textTransform: "lowercase",
                    }}
                    variant="p"
                    color="initial"
                  >
                    To reset your password, please enter the email address of
                    your account ❤.
                  </Typography>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ margin: "15px 0px 15px 0px" }}>
                      <Controller
                        name="email"
                        defaultValue={""}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField {...field} fullWidth label="Email" />
                        )}
                      />
                    </Box>
                    <Box sx={{ margin: "15px 0px 15px 0px" }}>
                      {loading ? (
                        <CircularProgress color="primary" />
                      ) : (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          size="large"
                        >
                          Reset my password
                        </Button>
                      )}
                    </Box>
                  </form>
                </>
              )}

              <Typography
                sx={{ fontSize: "14px", fontWeight: "400" }}
                variant="p"
                color="#222222"
              >
                Go Login?
                <Link
                  style={{ paddingLeft: "5px", color: "#DB4C3F" }}
                  to={"/login"}
                >
                  Go Login
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: "100%",
            padding: "6px 0px 0px 0px",
          }}
        >
          <Typography
            variant="subtitle2"
            color="primary"
            sx={{ textAlign: "center" }}
          >
            &#169; {new Date().getFullYear()} Decode Lab. All rights reserved
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default EnterEmail;
