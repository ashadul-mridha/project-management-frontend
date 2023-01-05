import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuthHooks from "../../utils/hooks/useAuth";
import useFilePreview from "../../utils/hooks/useFilePreview";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import PreviewImage from "../PreviewImage/PreviewImage";
import TaskImage from "./TaskImage";
import styles from "./taskImage.module.css";

const TaskAttacment = () => {
  // hook form control
  const { register, handleSubmit, control, reset } = useForm();

  const {
    taskId,
    setShowNotification,
    showNotification,
    setCallTask,
    callTask,
  } = useNavbarContextHooks();
  const { getToken } = useAuthHooks();
  const token = getToken();

  const [taskImage, setTaskImage] = useState([]);

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

  //watch image
  const image = useWatch({
    control,
    name: "image",
  });
  console.log(image);

  const [imagePreview] = useFilePreview(image);
  console.log(imagePreview);

  // upload image
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("taskId", taskId);
    Array.from(data.image).forEach((image) => {
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

      reset({ image: {} });
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ margin: "10px 0px 10px 0px" }}>
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
                  multiple
                  hidden
                  accept="image/*"
                  type="file"
                />
                <FileUploadIcon />
              </Button>
            </Stack>
            {imagePreview && image?.length ? (
              <PreviewImage itemData={imagePreview} />
            ) : null}
          </Box>
          <Box className={styles.actionBtn}>
            <Button
              type="submit"
              sx={{ marginLeft: "10px" }}
              variant="contained"
              color="primary"
            >
              Upload Image
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default TaskAttacment;
