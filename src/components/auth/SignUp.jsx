import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import React from "react";
import logoImage from "../../assets/image/login.png";
import { Stack } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

// react hooks form
import { Controller, useForm } from "react-hook-form";
import { insertFormData } from "../../api/axios";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";

const SignUp = () => {

  const { showNotification, setShowNotification } = useNavbarContextHooks();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  //after submit form
  const onSubmit = async (data) => {

    // apeend form data
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", data.image[0]);

    console.log(data.image[0]);

    const url = `${process.env.REACT_APP_API_KEY}/user/registration`;

    const res = await insertFormData(url, formData);

    if(res.data.status){
      reset({ name: "", email: "", password: "", image: "" });
      setShowNotification({
        ...showNotification,
        status: true,
        message: "user registration Successfull",
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
                Registration
              </Typography>
              {/* form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ margin: "15px 0px 15px 0px" }}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{
                      required: "Name Field Is Required",
                    }}
                    render={({ field }) => (
                      <TextField
                        helperText={errors?.name?.message}
                        error={errors.name ? true : false}
                        {...field}
                        fullWidth
                        label="Name"
                      />
                    )}
                  />
                </Box>
                <Box sx={{ margin: "15px 0px 15px 0px" }}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email field is required",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Please enter a valid email",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        helperText={errors?.email?.message}
                        error={errors.email ? true : false}
                        {...field}
                        fullWidth
                        label="Email"
                      />
                    )}
                  />
                </Box>
                <Box sx={{ margin: "15px 0px 15px 0px" }}>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password field is required",
                      minLength: {
                        value: 6,
                        message: "Password at last 6 digit",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        helperText={errors?.password?.message}
                        error={errors.password ? true : false}
                        {...field}
                        fullWidth
                        label="Password"
                      />
                    )}
                  />
                </Box>

                <Box sx={{ margin: "15px 0px 15px 0px" }}>
                  <Stack direction="column"  sx={{ mt: 2 }}>
                    <Button
                      sx={{ pt: 1, pb: 1 }}
                      fullWidth
                      color="secondary"
                      variant="contained"
                      component="label"
                    >
                      Upload Image
                      <input
                        {...register("image", {
                          required: "Upload image is required"
                        })}
                        hidden
                        accept="image/*"
                        type="file"
                      />
                      <FileUploadIcon />
                    </Button>
                    { errors.image && <Typography sx={{ fontSize : '15px', fontWeight: 500}} variant="caption" color="primary">{errors.image.message}</Typography> }
                  </Stack>
                </Box>
                <Box sx={{ margin: "15px 0px 15px 0px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                  >
                    Registration
                  </Button>
                </Box>
              </form>

              <Typography
                sx={{ fontSize: "14px", fontWeight: "400" }}
                variant="p"
                color="#222222"
              >
                Already have an account?
                <Link
                  style={{ paddingLeft: "5px", color: "#DB4C3F" }}
                  to={"/login"}
                >
                  login
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

export default SignUp;
