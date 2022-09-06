import { TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from "react-hook-form";

const ControllerTextField = ({name}) => {
    
  const { control } = useForm();

    return (
      <>
        <Controller
          name={name}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField {...field} fullWidth label={name} />
          )}
        />
      </>
    );
};

export default ControllerTextField;