import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuthHooks from "../../utils/hooks/useAuth";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import styles from "./comment.module.css";

const CommentForm = () => {
  const {taskId, setShowNotification, showNotification, setCallTask } = useNavbarContextHooks();
  const { getUser, getToken } = useAuthHooks();
  const [showCommentForm, setShowCommentForm] = useState(false);

  const { userid , image} = getUser();
  const token = getToken();

  const handleShowCommentForm = () => {
    setShowCommentForm((prevState) => !prevState);
  };

  const { register, handleSubmit, reset, formState: { errors }  } = useForm();

  const onSubmit = async (data) => {

    const submitData = {
      text: data.text,
      taskId: taskId,
      userId: userid,
    };

    const url = `${process.env.REACT_APP_API_KEY}/comment`;

    const res = await axios({
      method: "post",
      url: url,
      data: submitData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.status) {

      setShowNotification({
        ...showNotification,
        status: true,
        message: "Comment Done",
      });
      reset({ text: ''});
      handleShowCommentForm();
      setCallTask((prevState) => !prevState);

    } else {
      
      setShowNotification({
        ...showNotification,
        status: true,
        message: res.data.message,
      });

    }

  }


  return (
    <>
      {!showCommentForm ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            padding: "5px",
          }}
        >
          <Avatar
            sx={{ width: 33, height: 33 }}
            src={`${process.env.REACT_APP_URL}/images/uploads/user/${image}`}
          />
          <Box className={styles.inputBox}>
            <input
              onFocus={handleShowCommentForm}
              type="text"
              name="comment"
              id="comment"
              placeholder="Comment"
            />
          </Box>
        </Box>
      ) : (
        <Box className={styles.commentForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              {...register("text", {
                required: "plese write some text",
              })}
              id="Comment"
              cols="10"
              rows="2"
              placeholder="Comment"
            ></textarea>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
                paddingTop: "5px",
              }}
            >
              <Button
                onClick={handleShowCommentForm}
                variant="contained"
                color="warning"
              >
                Cancel
              </Button>
              <Button
                sx={{ marginLeft: "7px" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Comment
              </Button>
            </Box>
          </form>
          {errors.text && (
            <Typography
              sx={{ fontSize: "11px", fontWeight: 400 }}
              variant="caption"
              color="primary"
            >
              {errors.text.message}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default CommentForm;
