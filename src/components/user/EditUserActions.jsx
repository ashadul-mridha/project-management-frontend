import { Check, Save } from "@mui/icons-material";
import { CircularProgress, Fab } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import useAuthHooks from "../../utils/hooks/useAuth";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";

function EditUserActions({ params, rowId, setRowId, setFetchUser }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // use navbar hooks
  const { showNotification, setShowNotification } = useNavbarContextHooks();
  const { getToken } = useAuthHooks();
  const token = getToken();

  const { id, name, phone, userRole, email, address, active } = params.row;

  const handleSubmit = async () => {
    const data = {
      name,
      phone,
      userRole,
      email,
      address,
      active,
    };

    setLoading(true);

    const putUrl = `${process.env.REACT_APP_API_KEY}/user/${id}`;
    const res = await axios({
      method: "put",
      url: putUrl,
      data: data,
      headers: {
        "Content-Type": `multipart/form-data`,
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.status) {
      setShowNotification({
        ...showNotification,
        status: true,
        message: "User Profile Update Successfull",
      });
      setSuccess(true);
      setFetchUser((prevState) => !prevState);
      setRowId(null);
    } else {
      setShowNotification({
        ...showNotification,
        status: true,
        message: res.data.message,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Box
        sx={{
          m: 1,
          position: "relative",
        }}
      >
        {success ? (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              bgcolor: "success.main",
              "&:hover": { bgcolor: "success.dark" },
            }}
          >
            <Check />
          </Fab>
        ) : (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              backgroundColor: "success.main",
              "&:hover": { backgroundColor: "success.dark" },
            }}
            disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
          >
            <Save />
          </Fab>
        )}
        {loading && (
          <CircularProgress
            color="primary"
            size={52}
            sx={{
              color: "success.main",
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </>
  );
}

export default EditUserActions;
