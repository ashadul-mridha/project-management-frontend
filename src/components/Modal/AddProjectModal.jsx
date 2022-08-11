import React from 'react';

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useNavbarContextHooks from '../../utils/hooks/useNavbarContext';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Stack from "@mui/material/Stack";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: 'none',
  borderRadius: '10px'
};

const AddProjectModal = () => {
    const { openAddProject, setOpenAddProject } = useNavbarContextHooks(); 

const handleClose = () => setOpenAddProject(false);
    return (
      <>
        <Modal
          open={openAddProject}
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
                Add Project
              </Typography>
            </Box>
            {/* modal input field  */}
            <Box
              sx={{
                margin: "10px 0px",
                p: 2,
                maxHeight: "60vh",
                overflowY: "scroll",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
                fullWidth
                color="primary"
              />
              <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
                <Button
                  sx={{ pt: 1, pb: 1 }}
                  fullWidth
                  variant="contained"
                  component="label"
                >
                  Upload Image
                  <input hidden accept="image/*" multiple type="file" />
                  <FileUploadIcon />
                </Button>
              </Stack>
              <Box sx={{ mt: 2 }}>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "500" }}
                  variant="h2"
                  display="block"
                  gutterBottom
                  color={"primary"}
                >
                  What task statuses do you want?
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "gray",
                    marginTop: "5px",
                  }}
                  variant="caption"
                  display="block"
                >
                  Add Statues
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignitems: "center",
                    border: "1px solid gray",
                    padding: "0.5px 5px",
                    marginTop: "1px",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: "500", color: "black" }}
                    variant="overline"
                    display="block"
                    gutterBottom
                  >
                    Start
                  </Typography>
                  <IconButton sx={{ color: "black" }}>
                    <ClearIcon />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignitems: "center",
                    border: "1px solid gray",
                    padding: "0.5px 5px",
                    marginTop: "5px",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: "500", color: "black" }}
                    variant="overline"
                    display="block"
                  >
                    In Progress
                  </Typography>
                  <IconButton sx={{ color: "black" }}>
                    <ClearIcon />
                  </IconButton>
                </Box>
                <Button
                  sx={{ pt: 1, pb: 1, mt: 1 }}
                  variant="contained"
                  component="label"
                  size="small"
                >
                  <AddIcon />
                  Add Status
                </Button>
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
              <Button variant="contained" color="primary">
                Add
              </Button>
            </Box>
          </Box>
        </Modal>
      </>
    );
};

export default AddProjectModal;