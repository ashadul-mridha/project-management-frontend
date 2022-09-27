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

const AddMeetingModal = () => {
  const {
    openAddMeeting,
    setOpenAddMeeting,
    // projectId,
    // statusId,
    // setCallTask,
    // showNotification,
    // setShowNotification,
  } = useNavbarContextHooks();

  const { getToken } = useAuthHooks();

  // hook form control
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { } });

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
    setOpenAddMeeting(false);
  };

  // react quill modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
    ],
  };

  const onSubmit = async (data) => {
    console.log("data", data, personName );
    // check task user added or not
    // if (personName.length > 0) {
    //   // create form data
    //   const formData = new FormData();
    //   formData.append("name", data.name);
    //   formData.append("desc", data.name);
    //   formData.append("projectId", projectId);
    //   formData.append("statusId", statusId);
    //   formData.append("priority", data.priority);
    //   formData.append("remain", data.remain);
    //   formData.append("assignUser", JSON.stringify(personName));
    //   Array.from(data.image).forEach((image) => {
    //     formData.append("image", image);
    //   });

    //   // inset task all data
    //   const url = `${process.env.REACT_APP_API_KEY}/task/imageUser`;
    //   const res = await axios({
    //     method: "post",
    //     url: url,
    //     data: formData,
    //     headers: {
    //       "Content-Type": `multipart/form-data`,
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   if (res.data.status) {
    //     setShowNotification({
    //       ...showNotification,
    //       status: true,
    //       message: "Task Create Successfull",
    //     });
    //     handleClose();
    //     setCallTask((prevState) => !prevState);
    //   } else {
    //     setShowNotification({
    //       ...showNotification,
    //       status: true,
    //       message: res.data.message,
    //     });
    //     handleClose();
    //     setCallTask((prevState) => !prevState);
    //   }
    // }
  };

  return (
    <>
      <Modal
        open={openAddMeeting}
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
              Add Meeting
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
              {/* meeting name  */}
              <Box sx={{ margin: "10px 0px 10px" }}>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "Please add meeting name",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Meeting Name"
                      size="small"
                    />
                  )}
                />
                {errors.name && (
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: "400" }}
                    variant="overline"
                    display="block"
                    gutterBottom
                    color={"primary"}
                  >
                    {errors.name.message}
                  </Typography>
                )}
              </Box>

              {/* meeting link  */}
              <Box sx={{ margin: "10px 0px 10px" }}>
                <Controller
                  name="link"
                  control={control}
                  rules={{
                    required: "Please add meeting link",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Meeting Link"
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

              {/* meeting password  */}
              <Box sx={{ margin: "10px 0px 10px" }}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Meeting Password"
                      size="small"
                    />
                  )}
                />
                {errors.password && (
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: "400" }}
                    variant="overline"
                    display="block"
                    gutterBottom
                    color={"primary"}
                  >
                    {errors.password.message}
                  </Typography>
                )}
              </Box>

              {/* meeting schedule  */}
              <Box sx={{ margin: "15px 0px 10px 0px" }}>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <Box>
                      <Controller
                        name="startTime"
                        control={control}
                        rules={{
                          required: "Please add when start meeting",
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
                          required: "Please add when end meeting",
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

              {/* meeting users  */}
              <Box sx={{ margin: "10px 0px 10px 0px" }}>
                <Grid container spacing={2}>
                  <Grid item lg={12}>
                    <Box>
                      <InputLabel id="demo-simple-select-standard-label">
                        Select Project
                      </InputLabel>
                      <Controller
                        name="project"
                        control={control}
                        rules={{
                          required: "Please select project",
                        }}
                        render={({ field }) => (
                          <Select {...field} fullWidth size="small">
                            {/* <MenuItem value={"selectproject"}>
                              Select Project
                            </MenuItem> */}
                            {projects?.map((project) => (
                              <MenuItem key={project.id} value={project.id}>
                                {project.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.project && (
                        <Typography
                          sx={{ fontSize: "12px", fontWeight: "400" }}
                          variant="overline"
                          display="block"
                          gutterBottom
                          color={"primary"}
                        >
                          {errors.project.message}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
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
                  modules={modules}
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
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
                Add Task
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddMeetingModal;
