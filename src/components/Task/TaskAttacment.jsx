import { Box, Button, Stack, Typography } from '@mui/material';
import FileUploadIcon from "@mui/icons-material/FileUpload";
import React , {useEffect, useState, useRef} from 'react';
import styles from "./taskImage.module.css";
import TaskImage from './TaskImage';
import useNavbarContextHooks from '../../utils/hooks/useNavbarContext';
import useAuthHooks from '../../utils/hooks/useAuth';
import axios from 'axios';

const TaskAttacment = () => {

    const {
      taskId,
      setShowNotification,
      showNotification,
      setCallTask,
      callTask,
    } = useNavbarContextHooks();
    const { getToken } = useAuthHooks();
    const token = getToken();

    const [taskImage , setTaskImage] = useState([]);
    const fileEl = useRef();

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

      setTaskImage(res.data.data?.taskImages);
    };
    fetchData();
  }, [taskId, token, callTask]);

  // upload image
  const uploadImage = async () => {
    // apeend form data
    const formData = new FormData();
    formData.append("taskId", taskId);
    const TaskImg = fileEl.current.files;
    Array.from(TaskImg).forEach((image) => {
      formData.append("image", image);
    });

    const url = `${process.env.REACT_APP_API_KEY}/task/image`;

    const ImgRes = await axios({
      method: "post",
      url: url,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data`,
        Authorization: `Bearer ${token}`,
      },
    });

    if (ImgRes.data.status) {
      setShowNotification({
        ...showNotification,
        status: true,
        message: "Attacement Upload Successfull",
      });

      setCallTask((prevState) => !prevState);
    } else {
      console.log("image not upload");
    }
  };

  return (
    <>
      <Box sx={{ margin: "20px 0px" }}>
        <Typography
          sx={{ fontSize: "14px", fontWeight: 400 }}
          variant="h1"
          color="initial"
        >
          Images
        </Typography>
        <Box className={styles.AttacmentImageContainer}>
          {taskImage?.map((image) => (
            <TaskImage key={image.id} data={image} />
          ))}
        </Box>
      </Box>
      <Box sx={{ margin: "10px 0px" }}>
        <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
          <Button
            sx={{ pt: 1, pb: 1 }}
            fullWidth
            variant="contained"
            component="label"
          >
            Select Image
            <input multiple hidden accept="image/*" type="file" ref={fileEl} />
            <FileUploadIcon />
          </Button>
        </Stack>
      </Box>
      <Box className={styles.actionBtn}>
        {/* <Button onClick={handleClose} variant="contained" color="secondary">
          Cancel
        </Button> */}
        <Button
          onClick={uploadImage}
          sx={{ marginLeft: "10px" }}
          variant="contained"
          color="primary"
        >
          Upload Image
        </Button>
      </Box>
    </>
  );
};

export default TaskAttacment;