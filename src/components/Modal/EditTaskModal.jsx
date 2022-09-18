import React, { useEffect } from "react";
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
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";

// react hook form
import { Controller, useForm } from "react-hook-form";
import UserSelect from "../Form/UserSelect";

// date time picker
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";
import useAuthHooks from "../../utils/hooks/useAuth";

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
  // padding: "15px 15px",
};

const EditTaskModal = () => {
  const {
    openEditTask,
    setOpenEditTask,
    taskId,
    setCallTask,
    callTask,
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
  // const [users, setUsers] = React.useState([]);



  // get task current data
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_KEY}/task/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      reset({
        name: res.data.data.name,
        desc: res.data.data.desc,
        priority: res.data.data.priority,
        remain: res.data.data.remain,
      });
      // setPersonName([...res.data.data.users]);

      // const userRes = await axios.get("http://localhost:5000/api/user", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // setUsers(userRes.data.data);

      // setTaskImage(res.data.data?.taskImages);
    };
    fetchData();
  }, [taskId, token, callTask, reset]);


  // close task model
  const handleClose = () => {
    setOpenEditTask(false);
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
    console.log(data);
    // task update Request
    const res = await axios.put(
      `${process.env.REACT_APP_API_KEY}/task/${taskId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.status) {
      setShowNotification({
        ...showNotification,
        status: true,
        message: "Task Edit Successfull",
      });
      setCallTask((prevState) => !prevState);
    }

    // check task user added or not
    // if (personName.length > 0) {
    //   // create form data
    //   const formData = new FormData();
    //   formData.append("name", data.name);
    //   formData.append("desc", data.name);
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
        open={openEditTask}
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
              Edit Task
            </Typography>
          </Box>

          <Box
            sx={{
              margin: "6px 0px",
              py: 2,
              px: 1.5,
              maxHeight: "60vh",
              overflowY: "scroll",
            }}
          >

            {/* edit task  */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* task name  */}
                <Box sx={{ margin: "10px 0px 10px" }}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{
                      required: "Please add task name",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Task Name"
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

                {/* task users  */}
                {/* <Box sx={{ margin: "10px 0px 10px 0px" }}>
                <UserSelect
                  personName={personName}
                  setPersonName={setPersonName}
                  alluser={users}
                />
              </Box> */}

                {/* task remain  */}
                <Box sx={{ margin: "10px 0px 10px 0px" }}>
                  <Controller
                    name="remain"
                    control={control}
                    rules={{
                      required: "Please add remain time",
                    }}
                    render={({ field }) => (
                      <DateTimePicker
                        label="Remain Date"
                        disablePast
                        renderInput={(params) => (
                          <TextField fullWidth {...params} />
                        )}
                        {...field}
                      />
                    )}
                  />
                  {errors.remain && (
                    <Typography
                      sx={{ fontSize: "12px", fontWeight: "400" }}
                      variant="overline"
                      display="block"
                      gutterBottom
                      color={"primary"}
                    >
                      {errors.remain.message}
                    </Typography>
                  )}
                </Box>

                {/* task prioroty  */}
                <Box sx={{ margin: "10px 0px 10px 0px" }}>
                  <Tooltip title="set priority" placement="top-start" arrow>
                    <Box>
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
                </Box>
                {/* popup footer  */}
                <Box
                  sx={{
                    p: 2,
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
                    Edit Task
                  </Button>
                </Box>
            </form>



          </Box>

        </Box>
      </Modal>
    </>
  );
};

export default EditTaskModal;
