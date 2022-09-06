import axios from "axios";
import "../../../src/App.css";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { useRef } from "react";
import { BsAlarm, BsFlag } from "react-icons/bs";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import styles from "./Taskmodal.module.css";
import useAuthHooks from "../../utils/hooks/useAuth";
import { Stack } from "@mui/material";

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
  padding: "15px 15px",
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

  // state of components
  const [prorityEL, setprorityEL] = React.useState(null);
  const [project, setProject] = useState(null);
  const [desc, setDesc] = useState("");
  const nameEL = useRef();
  const fileEl = useRef();
  const [projectEL, setProjectEL] = useState();
  const [priority, setPriority] = useState("four");

  // get all project
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_KEY}/project`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProject(res.data.data);
    };
    fetchData();
  }, [token, callProject]);

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
  const addTask = async () => {
    const statusId = await getStatusId(projectEL);
    const data = {
      name: nameEL.current.value,
      desc,
      projectId: projectEL,
      statusId: statusId,
      priority,
      remain: "2023-04-21"
    };
    // task request
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/task`, data);
    
    const taskId = res.data.data.id;

    if (res.data.status && fileEl.current.files.length > 0) {

      // apeend form data
      const formData = new FormData();
      formData.append("taskId", taskId);
      const TaskImg = fileEl.current.files;
      Array.from(TaskImg).forEach((image) => {
        formData.append("image", image);
      });

      const taskRes = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_KEY}/task/image`,
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(taskRes.data);

      if (taskRes.data.status){
        setShowNotification({
          ...showNotification,
          status: true,
          message: "Task Create Successfull",
        }); 
        handleClose();
        setCallTask((prevState) => !prevState);
      }else {
        console.log('image not upload');
      }
      
    } else {
      setShowNotification({
        ...showNotification,
        status: true,
        message: "Task Create Successfull",
      }); 
      handleClose();
      setCallTask((prevState) => !prevState);
    }
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

  return (
    <>
      <Modal
        open={openAddTask}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className={styles.name}>
            <input
              ref={nameEL}
              type="text"
              name="name"
              id="name"
              placeholder="Task Name"
            />
          </Box>
          <Box className={styles.desc}>
            <ReactQuill
              placeholder={"Write Description"}
              theme="snow"
              modules={modules}
              value={desc}
              onChange={setDesc}
            />
          </Box>
          <Box className={styles.iconBox}>
            <Box className={styles.rightSide}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={project}
                // defaultValue={project[1]}
                getOptionLabel={(options) => options.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select Project"
                    size="small"
                  />
                )}
                onChange={(event, newValue) => {
                  setProjectEL(newValue.id);
                }}
              />
            </Box>
            <Box className={styles.leftSide}>
              <Tooltip
                className={styles.tooltipCustomClass}
                title="set priority"
                placement="bottom-start"
                arrow
              >
                <Box
                  onClick={handlePriority}
                  className={styles.leftSide__flagIcon}
                >
                  {priority === "first" && <BsFlag color="yellow" />}
                  {priority === "second" && <BsFlag color="green" />}
                  {priority === "thired" && <BsFlag color="red" />}
                  {priority === "four" && <BsFlag />}
                </Box>
              </Tooltip>
              <Menu
                anchorEl={prorityEL}
                id="priority-level"
                open={open}
                onClose={closePriority}
                onClick={closePriority}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => setPriority("first")}>
                  <ListItemIcon>
                    <BsFlag color="yellow" />
                  </ListItemIcon>
                  Prority 1
                </MenuItem>
                <MenuItem onClick={() => setPriority("second")}>
                  <ListItemIcon>
                    <BsFlag color="green" />
                  </ListItemIcon>
                  Prority 2
                </MenuItem>
                <MenuItem onClick={() => setPriority("thired")}>
                  <ListItemIcon>
                    <BsFlag color="red" />
                  </ListItemIcon>
                  Prority 3
                </MenuItem>
                <MenuItem onClick={() => setPriority("four")}>
                  <ListItemIcon>
                    <BsFlag />
                  </ListItemIcon>
                  Prority 4
                </MenuItem>
              </Menu>
              <Tooltip
                className={styles.tooltipCustomClass}
                title="Goto Pro"
                placement="bottom-start"
                arrow
              >
                <Box className={styles.leftSide__alarmIcon}>
                  <BsAlarm />
                </Box>
              </Tooltip>
            </Box>
          </Box>
          <Box sx={{ margin : '10px 0px'}}>
            <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
              <Button
                sx={{ pt: 1, pb: 1 }}
                fullWidth
                variant="contained"
                component="label"
              >
                Upload Image
                <input multiple hidden accept="image/*" type="file" ref={fileEl} />
                <FileUploadIcon />
              </Button>
            </Stack>
          </Box>
          <Box className={styles.actionBtn}>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button
              onClick={addTask}
              sx={{ marginLeft: "10px" }}
              variant="contained"
              color="primary"
            >
              Add Task
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddTaskModal;
