import { Button, CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logoImage from "../../../assets/image/login.png";

// react hooks form
import { Controller, useForm } from "react-hook-form";
import useNavbarContextHooks from "../../../utils/hooks/useNavbarContext";

const UpdatePassword = () => {

  const { showNotification, setShowNotification } = useNavbarContextHooks();
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("reset_token");

  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm({ password: "", password_repeat: "" });
  let pwd = watch("password");

  //after submit form
  const onSubmit = async (data) => {
    
    const resetData = {
      password: data.password,
      token: resetToken,
    };
    // console.log(resetData);
    setLoading((prevState) => !prevState);
    const res = await axios.post(
      `${process.env.REACT_APP_API_KEY}/user/reset/password`,
      resetData
    );
    setLoading((prevState) => !prevState);

    if (res.data.status) {
      // const userData = res.data.data;
      navigate(`/`);
      setShowNotification({
        ...showNotification,
        status: true,
        message: 'Login with new password',
      });
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
                Password reset
              </Typography>
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
                Please enter a new password for your account.
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ margin: "15px 0px 15px 0px" }}>
                  <Controller
                    defaultValue={""}
                    name="password"
                    control={control}
                    rules={{
                      required: "You must specify a password",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="password"
                        label="Password"
                      />
                    )}
                  />
                  {errors?.password && <p>{errors.password.message}</p>}
                </Box>
                <Box sx={{ margin: "15px 0px 15px 0px" }}>
                  <Controller
                    defaultValue={"dfg"}
                    name="password_repeat"
                    control={control}
                    rules={{
                      required: "You must specify a password",
                      validate: (value) =>
                        value === pwd || "The passwords do not match",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="password"
                        label="Confirm Password"
                      />
                    )}
                  />
                  {errors?.password_repeat && (
                    <p> {errors.password_repeat.message}</p>
                  )}
                </Box>
                <Box sx={{ margin: "15px 0px 15px 0px" }}>
                  {loading ? (
                    <CircularProgress
                      color="primary"
                    />
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

              {/* <Typography
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
              </Typography> */}
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

export default UpdatePassword;
