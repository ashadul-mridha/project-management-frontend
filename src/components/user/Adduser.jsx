import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button, MenuItem, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import styles from "./user.module.css";

// react hooks form
import { Controller, useForm, useWatch } from "react-hook-form";
import { insertFormData } from "../../api/axios";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import useFilePreview from "../../utils/hooks/useFilePreview";
import PreviewImage from "../PreviewImage/PreviewImage";

const AddUser = () => {
  const { showNotification, setShowNotification } = useNavbarContextHooks();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { userRole: "user" } });

  //after submit form
  const onSubmit = async (data) => {
    // apeend form data
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("image", data.image[0]);

    const url = `${process.env.REACT_APP_API_KEY}/user/registration`;

    const res = await insertFormData(url, formData);

    if (res.data.status) {
      reset({
        name: "",
        email: "",
        password: "",
        image: "",
        phone: "",
        address: "",
      });
      setShowNotification({
        ...showNotification,
        status: true,
        message: "New user add successfull",
      });
    } else {
      setShowNotification({
        ...showNotification,
        status: true,
        message: res.data.message,
      });
    }
  };

  // image preview
  const image = useWatch({
    control,
    name: "image",
  });

  const [imagePreview] = useFilePreview(image);

  return (
    <>
      <Box className={styles.WrapperContainer}>
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item lg={12}>
            <Box>
              <Typography
                sx={{
                  margin: "5px 0px 20px 0px",
                  fontSize: "20px",
                  fontWeight: "500",
                  textAlign: "center",
                }}
                variant="h2"
                color="primary"
              >
                Add New user
              </Typography>
              {/* form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item lg={8} md={12}>
                    <Box>
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
                            size="small"
                            label="Name"
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={8} md={12}>
                    <Box>
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
                            size="small"
                            label="Email"
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={8} md={12}>
                    <Box>
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
                            size="small"
                            label="Password"
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={8} md={12}>
                    <Box>
                      <Controller
                        name="userRole"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            select
                            size="small"
                            label="User Role"
                            color="primary"
                          >
                            <MenuItem value="user">user</MenuItem>
                            <MenuItem value="admin">admin</MenuItem>
                          </TextField>
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={8} md={12}>
                    <Box>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            helperText={errors?.phone?.message}
                            error={errors.phone ? true : false}
                            {...field}
                            fullWidth
                            size="small"
                            label="Phone"
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={8} md={12}>
                    <Box>
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            helperText={errors?.address?.message}
                            error={errors.address ? true : false}
                            {...field}
                            fullWidth
                            size="small"
                            label="Address"
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={8} md={12}>
                    <Box>
                      <Stack direction="column" sx={{ my: 1 }}>
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
                              required: "Upload image is required",
                            })}
                            hidden
                            accept="image/*"
                            type="file"
                          />
                          <FileUploadIcon />
                        </Button>
                        {errors.image && (
                          <Typography
                            sx={{ fontSize: "15px", fontWeight: 500 }}
                            variant="caption"
                            color="primary"
                          >
                            {errors.image.message}
                          </Typography>
                        )}
                      </Stack>
                      {imagePreview && image?.length ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <PreviewImage
                            itemData={imagePreview}
                            height={250}
                            width={250}
                            singleimg
                          />
                        </Box>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item lg={8} md={12}>
                    <Box sx={{ margin: "5px 0px" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                      >
                        Add New User
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>

              {/* <Typography
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
              </Typography> */}
            </Box>
          </Grid>
          {/* <Grid item lg={8}>
            <Box>
              <img src={logoImage} alt="login" height={"100%"} width="100%" />
            </Box>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
};

export default AddUser;
