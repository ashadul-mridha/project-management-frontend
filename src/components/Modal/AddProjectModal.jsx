import React, { useRef, useState } from "react";
import axios from 'axios';

import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  borderRadius: "10px",
};

const AddProjectModal = () => {

  const { openAddProject, setOpenAddProject } = useNavbarContextHooks();
  // state of project modal
  const nameEl = useRef(null);
  const imageEl = useRef(null);
  const statusEl = useRef(null);
  const [status, setStatus] = useState([
    { id: 0, name: "start", active: true },
    { id: 2, name: "Complete", active: true },
  ]);
  const [file, setFile] = useState(null);

  const handleClose = () => setOpenAddProject(false);

  //find learge id
  const leargeId = status.reduce( (prevState , currentData) => Math.max(prevState, currentData.id) , -1);

  //handle status
  const handleStatus = () => {
    setStatus((prevState) => [
      ...prevState,
      { id: leargeId + 1 , name: statusEl.current.value, active: true },
    ]);
    statusEl.current.value = ' ';
  };

  //remove status
  const removeStatus = (id) => {
    const data = status.filter((singleStatus) => singleStatus.id !== id);
    setStatus(data);
  }

  //get project file
  const handleFile = () => {
    setFile(imageEl.current.files[0]);
  };

  const addStatus = () => {
    // console.log(nameEl.current.value, file , status);
    const formData = new FormData();
    formData.append("name", nameEl.current.value );
    formData.append("image", imageEl.current.files[0]);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_KEY}/project`,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    })
      .then(function (response) {
        
        // if project insert successfull
        if (response.data.status) {
          //status insert
          const statusData = status.map((singleStatus, index) => {
            return {
              name: singleStatus.name,
              projectId: response.data.data.id,
              active: true,
            };
          });

          axios({
            method: "post",
            url: `${process.env.REACT_APP_API_KEY}/projectStatus`,
            data: statusData,
          })
            .then(function (response) {
              //handle success
              if(response.data.status){
                handleClose();
              }
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
        }

      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });


     


    };

    

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
              inputRef={nameEl}
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
                onClick={handleFile}
              >
                Upload Image
                <input hidden accept="image/*" type="file" ref={imageEl} />
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
              {status.map((data, index) => (
                <Box
                  key={data.id}
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
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "black",
                    }}
                    variant="overline"
                    display="block"
                    gutterBottom
                  >
                    {data?.name}
                  </Typography>
                  <IconButton
                    onClick={() => removeStatus(data.id)}
                    sx={{ color: "black" }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Box>
              ))}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignitems: "center",
                  padding: "1px 0px",
                  marginTop: "10px",
                }}
              >
                <TextField
                  inputRef={statusEl}
                  id="outlined-basic"
                  label="Enter Status"
                  variant="outlined"
                  size="small"
                  fullWidth
                  color="primary"
                />
              </Box>
              <Button
                sx={{ pt: 1, pb: 1, mt: 1 }}
                variant="contained"
                component="label"
                size="small"
                onClick={handleStatus}
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
            <Button onClick={addStatus} variant="contained" color="primary">
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddProjectModal;
