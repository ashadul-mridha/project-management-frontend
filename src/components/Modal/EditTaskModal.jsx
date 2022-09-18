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
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BsFlag } from "react-icons/bs";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";

// react hook form
import { Controller, useForm } from "react-hook-form";
import UserSelect from "../Form/UserSelect";

// date time picker
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";
import useAuthHooks from "../../utils/hooks/useAuth";
import EditTaskDetailsForm from "../Task/EditTaskDetailsForm";
import TaskAccordion from "../MuiCustomComponent/TaskAccordion";
import TaskAttacment from "../Task/TaskAttacment";

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
  // accordion of task
  const [expanded, setExpanded] = React.useState('panel1');

  // state of api calling data
  // const [personName, setPersonName] = React.useState([]);
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
    };
    fetchData();
  }, [taskId, token, callTask, reset]);


  // close task model
  const handleClose = () => {
    setOpenEditTask(false);
  };

  // accordion click
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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

            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography>Task</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <EditTaskDetailsForm />
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography>Attacment</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TaskAttacment />
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography>Add User</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                  Integer sit amet egestas eros, vitae egestas augue. Duis vel
                  est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography>Comment</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                  Integer sit amet egestas eros, vitae egestas augue. Duis vel
                  est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditTaskModal;
