import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import TaskAttacment from "../Task/TaskAttacment";
import { useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import EditTaskDetailsForm from "../Task/EditTaskDetailsForm";
import Comment from "../Comment/Comment";
 
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
};

const closeBtn = {
    cursor: 'pointer'
}

const EditTaskModal = () => {
  const {
    openEditTask,
    setOpenEditTask,
  } = useNavbarContextHooks();

  // accordion of task
  const [expanded, setExpanded] = useState('panel1');

  // close task model
  const handleClose = () => {
    setOpenEditTask(false);
  };

  // accordion click
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
            <Box sx={closeBtn} onClick={handleClose}>
              <AiOutlineCloseSquare size={25} color="#DB4C3F" />
            </Box>
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

            {/* <Accordion
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
            </Accordion> */}

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
                <Comment />
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditTaskModal;
