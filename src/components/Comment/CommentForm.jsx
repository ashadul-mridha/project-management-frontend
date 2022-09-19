import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import styles from "./comment.module.css";

const CommentForm = () => {
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleShowCommentForm = () => {
    setShowCommentForm((prevState) => !prevState);
  };

  console.log(showCommentForm);
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
          <Avatar src="dsfsdfsd" />
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
          <textarea
            name="comment"
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
        </Box>
      )}
    </>
  );
};

export default CommentForm;
