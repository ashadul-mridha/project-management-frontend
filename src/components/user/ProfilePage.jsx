import styles from "./user.module.css";
import { MenuItem, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

// react hooks form
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import useAuthHooks from "../../utils/hooks/useAuth";

const ProfilePage = () => {

  const { control, reset } = useForm({
    defaultValues: { userRole: "user", status: false },
  });

  const [image , setImage] = useState()

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
       if(res.data.status){
        const {name , email, userRole, image, active} = res.data.data;
        reset({ name: name, email: email, userRole: userRole, status: active });
        setImage(image)
       }
     };
     fetchData();
   }, [reset, token, url]);

 
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
                }}
                variant="h2"
                color="primary"
              >
                Profile Page
              </Typography>
              {/* form */}
              <form>
                <Grid container spacing={2}>
                  <Grid item lg={6} md={12}>
                    <Box>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            disabled
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

                  <Grid item lg={6} md={12}>
                    <Box>
                      <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            disabled
                            select
                            size="small"
                            label="Status"
                            color="primary"
                          >
                            <MenuItem value={true}>active</MenuItem>
                            <MenuItem value={false}>inactive</MenuItem>
                          </TextField>
                        )}
                      />
                    </Box>
                  </Grid>

                  <Grid item lg={6} md={12}>
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
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfilePage;
