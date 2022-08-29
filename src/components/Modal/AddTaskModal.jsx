import axios from "axios";
import "../../../src/App.css";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { useRef } from "react";
import { BsAlarm, BsFlag } from "react-icons/bs";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import styles from "./Taskmodal.module.css";

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
  const { openAddTask, setOpenAddTask, getStatusId } = useNavbarContextHooks();

  // state of components
  const [prorityEL, setprorityEL] = React.useState(null);
  const [project, setProject] = useState(null);
  const [desc, setDesc] = useState("");
  const nameEL = useRef();
  const [projectEL, setProjectEL] = useState();
  const [priority, setPriority] = useState(4);

  // get all project
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_KEY}/project`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_JWT}`,
        },
      });
      setProject(res.data.data);
    };
    fetchData();
  }, []);

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
      remain: "2023-04-21"
    };
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/task`, data);
    console.log(res.data);
    if(res.data.status){
      handleClose();
      alert('Data Added Successfull')
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
                  {priority === 1 && <BsFlag color="yellow" />}
                  {priority === 2 && <BsFlag color="green" />}
                  {priority === 3 && <BsFlag color="red" />}
                  {priority === 4 && <BsFlag />}
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
                <MenuItem onClick={() => setPriority(1)}>
                  <ListItemIcon>
                    <BsFlag color="yellow" />
                  </ListItemIcon>
                  Prority 1
                </MenuItem>
                <MenuItem onClick={() => setPriority(2)}>
                  <ListItemIcon>
                    <BsFlag color="green" />
                  </ListItemIcon>
                  Prority 2
                </MenuItem>
                <MenuItem onClick={() => setPriority(3)}>
                  <ListItemIcon>
                    <BsFlag color="red" />
                  </ListItemIcon>
                  Prority 3
                </MenuItem>
                <MenuItem onClick={() => setPriority(4)}>
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
