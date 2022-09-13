import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "../../../src/App.css";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Select, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { BsFlag } from "react-icons/bs";
import useAuthHooks from "../../utils/hooks/useAuth";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import styles from "./Taskmodal.module.css";

// react hook form
import { Controller, useForm } from "react-hook-form";
import { getData } from "../../api/axios";
import UserSelect from "../Form/UserSelect";

import DateFnsUtils from "@date-io/date-fns";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateTimePickeres from "../Form/DateTimePickeres";

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
  // padding: "15px 15px",
};

const AddTaskModal = () => {
  const {
    openAddTask,
    setOpenAddTask,
    getStatusId,
    setCallTask,
    callProject,
    showNotification,
    setShowNotification,
  } = useNavbarContextHooks();

  const { getToken } = useAuthHooks();
  const token = getToken();

  // hook form control
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { priority: "four" } });

  // state of api calling data
  const [personName, setPersonName] = React.useState([]);
  const [users, setUsers] = React.useState(false);

  // get all user
  const userUrl = "http://localhost:5000/api/user";

  //calling api via useEffect
  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(userUrl);
      console.log(res.data);
      setUsers(res.data.data);
    };

    fetchData();
  }, []);

  // state of components
  const [prorityEL, setprorityEL] = React.useState(null);
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("four");

  // close priority
  const open = Boolean(prorityEL);
  const handlePriority = (event) => {
    setprorityEL(event.currentTarget);
  };
  const closePriority = () => {
    setprorityEL(null);
  };

  // close task model
  const handleClose = () => setOpenAddTask(false);

  // add task click
  // const addTask = async () => {
  //   const statusId = await getStatusId(projectEL);
  //   const data = {
  //     name: nameEL.current.value,
  //     desc,
  //     projectId: projectEL,
  //     statusId: statusId,
  //     priority,
  //     remain: "2023-04-21",
  //   };
  //   // task request
  //   const res = await axios.post(`${process.env.REACT_APP_API_KEY}/task`, data);

  //   const taskId = res.data.data.id;

  //   if (res.data.status && fileEl.current.files.length > 0) {
  //     // apeend form data
  //     const formData = new FormData();
  //     formData.append("taskId", taskId);
  //     const TaskImg = fileEl.current.files;
  //     Array.from(TaskImg).forEach((image) => {
  //       formData.append("image", image);
  //     });

  //     const taskRes = await axios({
  //       method: "post",
  //       url: `${process.env.REACT_APP_API_KEY}/task/image`,
  //       data: formData,
  //       headers: {
  //         "Content-Type": `multipart/form-data`,
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(taskRes.data);

  //     if (taskRes.data.status) {
  //       setShowNotification({
  //         ...showNotification,
  //         status: true,
  //         message: "Task Create Successfull",
  //       });
  //       handleClose();
  //       setCallTask((prevState) => !prevState);
  //     } else {
  //       console.log("image not upload");
  //     }
  //   } else {
  //     setShowNotification({
  //       ...showNotification,
  //       status: true,
  //       message: "Task Create Successfull",
  //     });
  //     handleClose();
  //     setCallTask((prevState) => !prevState);
  //   }
  // };

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
    console.log(data);
  };

  return (
    <>
      <Modal
        open={openAddTask}
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
              Add Task
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
              {/* task name  */}
              <Box sx={{ margin: "10px 0px 0px 0px" }}>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "Please add task name",
                  }}
                  render={({ field }) => (
                    <TextField
                      helperText={errors?.name?.message}
                      error={errors.name ? true : false}
                      {...field}
                      fullWidth
                      label="Task Name"
                      size="small"
                    />
                  )}
                />
              </Box>
              {/* task desc  */}
              <Box sx={{ margin: "10px 0px 0px 0px" }}>
                <Controller
                  name="desc"
                  control={control}
                  // rules={{
                  //   required: "Please enter task description",
                  // }}
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
                {/*    */}
              </Box>

              {/* select user and priority and time  */}
              <Box className={styles.iconBox}>
                <Box className={styles.rightSide}>
                  <UserSelect
                    personName={personName}
                    setPersonName={setPersonName}
                    alluser={users}
                  />
                </Box>
                <Box className={styles.leftSide}>
                  <Tooltip title="set priority" placement="top-start" arrow>
                    <Box
                    // className={styles.leftSide__flagIcon}
                    >
                      <Controller
                        name="priority"
                        autoWidth
                        size="small"
                        control={control}
                        render={({ field }) => (
                          <Select
                            sx={{
                              color: "#fff",
                              paddingRight: "0px",
                              position: "static",
                              "& .MuiSvgIcon-root": {
                                color: "white",
                              },
                              "& .MuiSelect-select": {
                                paddingRight: "0px",
                              },
                              "& .MuiOutlinedInput-root": {
                                position: "static",
                              },
                              "& .Mui-focused": {
                                position: "static",
                              },
                            }}
                            {...field}
                          >
                            <MenuItem value="first">
                              <BsFlag color="yellow" />
                            </MenuItem>
                            <MenuItem value="second">
                              <BsFlag color="green" />
                            </MenuItem>
                            <MenuItem value="thired">
                              <BsFlag color="red" />
                            </MenuItem>
                            <MenuItem value="four">
                              <BsFlag color="black" />
                            </MenuItem>
                          </Select>
                        )}
                      />
                    </Box>
                  </Tooltip>
                  <Tooltip
                    className={styles.tooltipCustomClass}
                    title="Goto Pro"
                    placement="bottom-start"
                    arrow
                  >
                    <Box className={styles.leftSide__alarmIcon}>
                      <DateTimePickeres />
                      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Controller
                          name="MUIPicker"
                          control={control}
                          render={({ field: { ref, ...rest } }) => (
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              label="Date   dialog"
                              // format="MM/dd/yyyy"
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                              {...rest}
                            />
                          )}
                        />
                      </MuiPickersUtilsProvider> */}
                      {/* <BsAlarm /> */}
                    </Box>
                  </Tooltip>
                </Box>
              </Box>

              {/* select a image  */}
              <Box sx={{ margin: "5px 0px 5px 0px" }}>
                <Stack direction="column" sx={{ mt: 2 }}>
                  <Button
                    sx={{ pt: 1, pb: 1 }}
                    fullWidth
                    variant="contained"
                    component="label"
                  >
                    Upload Image
                    <input
                      {...register("image")}
                      hidden
                      accept="image/*"
                      type="file"
                    />
                    <FileUploadIcon />
                  </Button>
                </Stack>
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

export default AddTaskModal;
