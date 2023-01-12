import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button, MenuItem, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import styles from "./user.module.css";

// react hooks form
import axios from "axios";
import { Controller, useForm, useWatch } from "react-hook-form";
import useAuthHooks from "../../utils/hooks/useAuth";
import useFilePreview from "../../utils/hooks/useFilePreview";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import PreviewImage from "../PreviewImage/PreviewImage";

const ProfilePage = () => {
  const { control, reset, register, handleSubmit } = useForm({
    defaultValues: { userRole: "user", status: false },
  });

  const [image, setImage] = useState();
  const [edit, setEdit] = useState(false);
  const [reFetchUser, setReFetchUser] = useState(false);

  // use navbar hooks
  const { showNotification, setShowNotification } = useNavbarContextHooks();
  // get user data by id
  const { getToken, getUser } = useAuthHooks();
  const token = getToken();
  const { userid } = getUser();
  const url = `${process.env.REACT_APP_API_KEY}/user/${userid}`;
  useEffect(() => {
    const fetchData = async () => {
      // console.log('user', userid);
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status) {
        const { name, email, phone, address, userRole, image, active } =
          res.data.data;
        reset({
          name: name,
          email: email,
          phone: phone,
          address: address,
          userRole: userRole,
          status: active,
        });
        setImage(image);
      }
    };
    fetchData();
  }, [reset, token, url, reFetchUser]);

  // enable & disable edit
  const toggleEdit = () => {
    setEdit((prevState) => !prevState);
  };

  // watch upload image and preview
  const newUploadImage = useWatch({
    control,
    name: "image",
  });
  const [imagePreview] = useFilePreview(newUploadImage);

  // update user profile
  const onSubmit = async (data) => {
    // create form data
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("image", data.image[0]);

    // inset task all data
    const putUrl = `${process.env.REACT_APP_API_KEY}/user/${userid}`;
    const res = await axios({
      method: "put",
      url: putUrl,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data`,
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(res.data);

    if (res.data.status) {
      setShowNotification({
        ...showNotification,
        status: true,
        message: "User Profile Update Successfull",
      });
      setReFetchUser((prevState) => !prevState);
      setEdit((prevState) => !prevState);
    } else {
      setShowNotification({
        ...showNotification,
        status: true,
        message: res.data.message,
      });
      setReFetchUser((prevState) => !prevState);
      setEdit((prevState) => !prevState);
    }
  };

  return (
    <>
      <Box className={styles.WrapperContainer}>
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item lg={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                my: 1,
              }}
            >
              <Typography
                sx={{
                  margin: "5px 0px 20px 0px",
                  fontSize: "20px",
                  fontWeight: "500",
                }}
                variant="h2"
                color="primary"
              >
                Profile Page
              </Typography>
              <Button
                onClick={toggleEdit}
                variant="outlined"
                size="small"
                color="primary"
              >
                Edit
              </Button>
            </Box>
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                spacing={2}
                justifyContent={"center"}
                alignItems="center"
              >
                <Grid item lg={6} md={12}>
                  <Box>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          disabled={!edit}
                          size="small"
                          label="Name"
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item lg={6} md={12}>
                  <Box>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          disabled
                          size="small"
                          label="Email"
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item lg={6} md={12}>
                  <Box>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          disabled={!edit}
                          size="small"
                          label="Phone"
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item lg={6} md={12}>
                  <Box>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          disabled={!edit}
                          size="small"
                          label="Address"
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item lg={6} md={12}>
                  <Box>
                    <Controller
                      name="userRole"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          disabled
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
                {edit ? (
                  <>
                    <Grid item lg={6} md={12}>
                      <Box sx={{}}>
                        <Stack direction="column">
                          <Button
                            sx={{ pt: 1, pb: 1 }}
                            fullWidth
                            variant="contained"
                            component="label"
                          >
                            Upload New Image
                            <input
                              {...register("image")}
                              multiple
                              hidden
                              accept="image/*"
                              type="file"
                            />
                            <FileUploadIcon />
                          </Button>
                        </Stack>
                      </Box>
                    </Grid>
                  </>
                ) : (
                  <Grid item lg={6} md={12}></Grid>
                )}

                <Grid item lg={6} md={12}>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ marginBottom: "12px" }}
                  >
                    Uploaded Profile Picture
                  </Typography>
                  <Box sx={{ height: "300px", width: "100%" }}>
                    <img
                      src={`${process.env.REACT_APP_URL}/images/uploads/user/${image}`}
                      alt="user"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Grid>

                {!edit && (
                  <>
                    <Grid item lg={6} md={12}>
                      {imagePreview ? (
                        <Typography variant="h6" color="primary">
                          Preview New Upload Picture
                        </Typography>
                      ) : null}
                      <Box sx={{ height: "300px", width: "100%" }}>
                        {imagePreview ? (
                          <PreviewImage
                            singleimg
                            itemData={imagePreview}
                            height={300}
                            width={"auto"}
                          />
                        ) : null}
                      </Box>
                    </Grid>
                  </>
                )}
              </Grid>
              {!edit && (
                <Box
                  sx={{
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    p: 2,
                    borderTop: "1px solid gray",
                    borderRadius: "0px 0px 10px 10px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onClick={toggleEdit}
                    sx={{ marginRight: "10px" }}
                    variant="contained"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Edit Profile
                  </Button>
                </Box>
              )}
            </form>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfilePage;
