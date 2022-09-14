import React from 'react';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
// import dayjs from "dayjs";

const DateTimePickeres = () => {
    
  const [value, setValue] = React.useState();
  console.log(value);

    return (
      <>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="DateTimePicker"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
      </>
    );
};

export default DateTimePickeres;