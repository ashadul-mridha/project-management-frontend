import React, { useState, useEffect } from "react";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import UserSelect from "../Form/UserSelect";
import { getData } from "../../api/axios";
import axios from "axios";
import useAuthHooks from "../../utils/hooks/useAuth";

// react hook form 
import { Controller, useForm } from "react-hook-form";
import ProjectStatus from "../Form/ProjectStatus";

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

  const {
    openAddProject,
    setOpenAddProject,
    setCallProject,
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
  } = useForm({ defaultValues: {} });

  // state of api calling data
  const [personName, setPersonName] = React.useState([]);
  const [users, setUsers] = React.useState(false);

  // state of project status
  const [status, setStatus] = useState([
    { id: 0, name: "start", active: true },
  ]);

  // get all user
  const userUrl = "http://localhost:5000/api/user";

  //calling api via useEffect
  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(userUrl);
      setUsers(res.data.data);
    }
    
    fetchData();

  }, []);
  

  const handleClose = () => setOpenAddProject(false);

    const statusData = status.map((singleStatus, index) => {
      return {
        name: singleStatus.name,
      };
    });


    const onSubmit = async (data) => {

      if (statusData.length > 0 && personName.length > 0) {

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("image", data.image[0]);
        formData.append("project_status", JSON.stringify(statusData));
        formData.append("assignUser", JSON.stringify(personName));

        const url = `${process.env.REACT_APP_API_KEY}/project/all`;

        const res = await axios({
          method: "post",
          url: url,
          data: formData,
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.status) {
          reset({ name: "", image: "" });
          setPersonName([])
          setStatus([{ id: 0, name: "start", active: true }]);
          setCallProject((prevState) => !prevState);
          handleClose();
          setShowNotification({
            ...showNotification,
            status: true,
            message: "Project Create Successfull",
          });
        }

      }
    }

    

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

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                margin: "10px 0px",
                p: 2,
                maxHeight: "60vh",
                overflowY: "scroll",
              }}
            >
              <Box sx={{ margin: "10px 0px 0px 0px" }}>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "Name Field Is Required",
                  }}
                  render={({ field }) => (
                    <TextField
                      helperText={errors?.name?.message}
                      error={errors.name ? true : false}
                      {...field}
                      fullWidth
                      label="Name"
                      size="small"
                    />
                  )}
                />
              </Box>
              {/* select a image  */}
              <Box sx={{ margin: "15px 0px 15px 0px" }}>
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
              {/* select status */}
              <ProjectStatus status={status} setStatus={setStatus} />
              {/* select user */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "500" }}
                  variant="h2"
                  display="block"
                  gutterBottom
                  color={"primary"}
                >
                  Assign People
                </Typography>

                <UserSelect
                  personName={personName}
                  setPersonName={setPersonName}
                  alluser={users}
                  validation={true}
                />
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
                Add
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddProjectModal;
