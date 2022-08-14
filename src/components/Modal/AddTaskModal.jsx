import React from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import styles from './Taskmodal.module.css';
import { BsAlarm, BsFlag } from "react-icons/bs";
import Button from '@mui/material/Button'


const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#ffffff",
  boxShadow: 50,
  outline: "none",
  borderRadius: "8px",
  padding: "15px 15px"
};

const AddTaskModal = () => {
  const { openAddTask, setOpenAddTask } = useNavbarContextHooks();

  const handleClose = () => setOpenAddTask(false);

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
            <input type="text" name="name" id="name" placeholder="Task Name" />
          </Box>
          <Box className={styles.desc}>
            <input
              type="text"
              name="desc"
              id="desc"
              placeholder="Description"
            />
          </Box>
          <Box className={styles.iconBox}>
            <Box className={styles.rightSide}>
              <Button variant="text" color="primary">
                Today
              </Button>
              <Button variant="outline" color="secondary">
                Inbox
              </Button>
            </Box>
            <Box className={styles.leftSide}>
              <Tooltip
                className={styles.tooltipCustomClass}
                title="set priority"
                placement="bottom-start"
                arrow
              >
                <Box className={styles.leftSide__flagIcon}>
                  <BsFlag />
                </Box>
              </Tooltip>
              <Tooltip
                className={styles.tooltipCustomClass}
                title="set alarm"
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
