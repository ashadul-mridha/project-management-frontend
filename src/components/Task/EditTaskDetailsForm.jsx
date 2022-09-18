import axios from 'axios';
import React, { useEffect } from 'react';
import ReactQuill from "react-quill";
import "../../../src/App.css";
import useAuthHooks from '../../utils/hooks/useAuth';
import useNavbarContextHooks from '../../utils/hooks/useNavbarContext';


// date time picker
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// react hook form
import { Controller, useForm } from "react-hook-form";
import { Box } from '@mui/system';
import { Button, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import { BsFlag } from 'react-icons/bs';



const EditTaskDetailsForm = () => {
  const {
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
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { priority: "four" } });

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
    };
    fetchData();
  }, [taskId, token, callTask, reset]);

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
  };

  return (
    <>
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
                renderInput={(params) => <TextField fullWidth {...params} />}
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
          {/* <Button
            onClick={handleClose}
            sx={{ marginRight: "10px" }}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button> */}
          <Button type="submit" variant="contained" color="primary">
            Edit Task
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EditTaskDetailsForm;