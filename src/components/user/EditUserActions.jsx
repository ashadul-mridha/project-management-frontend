import { Box } from '@mui/system';
import React, { useState } from 'react'
import {CircularProgress, Fab} from '@mui/material'
import { Check, Save } from '@mui/icons-material';

function EditUserActions({ params, rowId, setRowId }) {
    const [loading , setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        console.log('handle submit click');
    }

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

export default EditUserActions