import React, { useRef } from "react";

import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const ProjectStatus = ({ status , setStatus}) => {
  const statusEl = useRef(null);

  //find learge id
  const leargeId = status.reduce(
    (prevState, currentData) => Math.max(prevState, currentData.id),
    -1
  );

  //handle status
  const handleStatus = () => {
    setStatus((prevState) => [
      ...prevState,
      { id: leargeId + 1, name: statusEl.current.value, active: true },
    ]);
    statusEl.current.value = " ";
  };

  //remove status
  const removeStatus = (id) => {
    const data = status.filter((singleStatus) => singleStatus.id !== id);
    setStatus(data);
  };

  return (
    <>
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
              sx={{ color: "black", fontSize: "10px !important" }}
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
        {status.length < 1 && (
          <Typography
            sx={{ fontSize: "12px", fontWeight: "400" }}
            variant="overline"
            display="block"
            gutterBottom
            color={"primary"}
          >
            Status was Required
          </Typography>
        )}
      </Box>
    </>
  );
};

export default ProjectStatus;