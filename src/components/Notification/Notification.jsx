import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import React from 'react';
import useNavbarContextHooks from '../../utils/hooks/useNavbarContext';

const Notification = ({message}) => {

    const {
      showNotification,
      setShowNotification,
    } = useNavbarContextHooks();

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setShowNotification({
        ...showNotification,
        status : ''
      });
    };

    return (
      <>
        <Snackbar
          sx={{ backgroundColor: "whitesmoke" }}
          open={showNotification.status}
          autoHideDuration={3000}
          message={showNotification.message}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {showNotification.message}
          </Alert>
        </Snackbar>
      </>
    );
};

export default Notification;