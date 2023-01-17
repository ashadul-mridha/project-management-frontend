import { Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "../../../src/App.css";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";

// react hook form
import { Controller, useForm } from "react-hook-form";

// date time picker
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";
import useAuthHooks from "../../utils/hooks/useAuth";
// import SelectProject from "../Form/SelectProject";
import UserSelect from "../Form/UserSelect";

// import {

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate( -50%, -50%)",
  width: 600,
  bgcolor: "#ffffff",
  boxShadow: 50,
  outline: "none",
  borderRadius: "8px",
  // padding: "10px 10px",
};

const AddBookingModal = () => {
  const {
    openAddBooking,
    setOpenAddBooking,
    setCallBooking,
    showNotification,
    setShowNotification,
  } = useNavbarContextHooks();

  const { getToken } = useAuthHooks();

  // hook form control
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  // state of api calling data
  const [personName, setPersonName] = React.useState([]);
  const [users, setUsers] = React.useState(false);
  const [projects, setProjects] = React.useState(false);

  // get all user
  const userUrl = `${process.env.REACT_APP_API_KEY}/user`;
  const token = getToken();

  //calling api via useEffect
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(userUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.data);
    };

    fetchData();
  }, [token, userUrl]);

  // get all project
  const projectUrl = `${process.env.REACT_APP_API_KEY}/project`;

  //calling api via useEffect
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(projectUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(res.data.data);
    };

    fetchData();
  }, [projectUrl, token]);

  // close task model
  const handleClose = () => {
    reset();
    setPersonName([]);
    setOpenAddBooking(false);
  };

  // react quill modules
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const onSubmit = async (data) => {
    /* Merging the data object with the personName array. */
    const allData = {
      ...data,
      users: personName,
    };

    console.log(allData);

    /* Sending a POST request to the server. */
    // const url = `${process.env.REACT_APP_API_KEY}/meeting`;
    const res = await axios({
      method: "post",
    //   url: url,
      data: allData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // if (res.data.status) {
    //   setShowNotification({
    //     ...showNotification,
    //     status: true,
    //     message: "New Booking Added",
    //   });
    //   handleClose();
    //   setCallBooking((prevState) => !prevState);
    // } else {
    //   setShowNotification({
    //     ...showNotification,
    //     status: true,
    //     message: res.data.message,
    //   });
    //   handleClose();
    //   setCallBooking((prevState) => !prevState);
    // }

  };

  return (
    <>
      <Modal
        open={openAddBooking}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.main,
              p: 2,
              borderBottom: "1px solid gray",
              borderRadius: "10px 10px 0px 0px",
            }}
          >
            <Typography
              sx={{ fontSize: "16px", fontWeight: 700 }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Add Booking
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                margin: "6px 0px",
                py: 2,
                px: 1.5,
                maxHeight: "60vh",
                overflowY: "scroll",
              }}
            >
              {/* booking title  */}
              <Box sx={{ margin: "10px 0px 10px" }}>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: "Please add booking title",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Booking Title"
                      size="small"
                    />
                  )}
                />
                {errors.title && (
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: "400" }}
                    variant="overline"
                    display="block"
                    gutterBottom
                    color={"primary"}
                  >
                    {errors.title.message}
                  </Typography>
                )}
              </Box>

              {/* booking address &  place  */}
              <Box sx={{ margin: "10px 0px 10px" }}>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <Box>
                      <Controller
                        name="link"
                        control={control}
                        rules={{
                          required: "Please add booking address",
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Booking address"
                            size="small"
                          />
                        )}
                      />
                      {errors.link && (
                        <Typography
                          sx={{ fontSize: "12px", fontWeight: "400" }}
                          variant="overline"
                          display="block"
                          gutterBottom
                          color={"primary"}
                        >
                          {errors.link.message}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box>
                      <Controller
                        name="place"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Booking Place"
                            size="small"
                          />
                        )}
                      />
                      {errors.place && (
                        <Typography
                          sx={{ fontSize: "12px", fontWeight: "400" }}
                          variant="overline"
                          display="block"
                          gutterBottom
                          color={"primary"}
                        >
                          {errors.place.message}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* booking schedule  */}
              <Box sx={{ margin: "15px 0px 10px 0px" }}>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <Box>
                      <Controller
                        name="startTime"
                        control={control}
                        rules={{
                          required: "Please add when start booking",
                        }}
                        render={({ field }) => (
                          <DateTimePicker
                            label="Start Time"
                            disablePast
                            renderInput={(params) => (
                              <TextField size="small" fullWidth {...params} />
                            )}
                            {...field}
                          />
                        )}
                      />
                      {errors.startTime && (
                        <Typography
                          sx={{ fontSize: "12px", fontWeight: "400" }}
                          variant="overline"
                          display="block"
                          gutterBottom
                          color={"primary"}
                        >
                          {errors.startTime.message}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box>
                      <Controller
                        name="endTime"
                        control={control}
                        rules={{
                          required: "Please add when end booking",
                        }}
                        render={({ field }) => (
                          <DateTimePicker
                            label="End Time"
                            disablePast
                            renderInput={(params) => (
                              <TextField size="small" fullWidth {...params} />
                            )}
                            {...field}
                          />
                        )}
                      />
                      {errors.endTime && (
                        <Typography
                          sx={{ fontSize: "12px", fontWeight: "400" }}
                          variant="overline"
                          display="block"
                          gutterBottom
                          color={"primary"}
                        >
                          {errors.endTime.message}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* client name & phone  */}
              <Box sx={{ margin: "10px 0px 10px" }}>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <Box>
                      <Controller
                        name="clientName"
                        control={control}
                        rules={{
                          required: "Please add Client Name",
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Client Name"
                            size="small"
                          />
                        )}
                      />
                      {errors.clientName && (
                        <Typography
                          sx={{ fontSize: "12px", fontWeight: "400" }}
                          variant="overline"
                          display="block"
                          gutterBottom
                          color={"primary"}
                        >
                          {errors.clientName.message}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box>
                      <Controller
                        name="clientPhone"
                        rules={{
                          required: "Please add Client Phone",
                        }}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Client phone"
                            size="small"
                          />
                        )}
                      />
                      {errors.clientPhone && (
                        <Typography
                          sx={{ fontSize: "12px", fontWeight: "400" }}
                          variant="overline"
                          display="block"
                          gutterBottom
                          color={"primary"}
                        >
                          {errors.clientPhone.message}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* client name & phone  */}
              <Box sx={{ margin: "10px 0px 10px" }}>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <Box>
                      <Controller
                        name="clientEmail"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Client Email"
                            size="small"
                          />
                        )}
                      />
                      {errors.clientEmail && (
                        <Typography
                          sx={{ fontSize: "12px", fontWeight: "400" }}
                          variant="overline"
                          display="block"
                          gutterBottom
                          color={"primary"}
                        >
                          {errors.clientEmail.message}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box>
                      <Controller
                        name="clientAddress"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Client Address"
                            size="small"
                          />
                        )}
                      />
                      {errors.clientAddress && (
                        <Typography
                          sx={{ fontSize: "12px", fontWeight: "400" }}
                          variant="overline"
                          display="block"
                          gutterBottom
                          color={"primary"}
                        >
                          {errors.clientAddress.message}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* booking users  */}
              <Box sx={{ margin: "10px 0px 10px 0px" }}>
                <Grid container spacing={2}>
                  <Grid item lg={12}>
                    <Box>
                      <UserSelect
                        personName={personName}
                        setPersonName={setPersonName}
                        alluser={users}
                        validation={false}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* task desc  */}
              <Box sx={{ margin: "10px 0px 10px 0px" }}>
                <Controller
                  name="desc"
                  control={control}
                  theme="snow"
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      modules={modules}
                      placeholder={"Write Description"}
                      onChange={(text) => {
                        field.onChange(text);
                      }}
                    />
                  )}
                />
              </Box>
            </Box>
            {/* popup footer  */}
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
                onClick={handleClose}
                sx={{ marginRight: "10px" }}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Booking
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddBookingModal;
