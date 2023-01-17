import * as React from "react";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import ListItemText from "@mui/material/ListItemText";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// import Select from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };


export default function UserSelect({ personName, setPersonName, alluser, validation }) {

  // on select and checkbox change
  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

  // console.log("user", personName, alluser);

  // on autocomplee change
  const autoCompleteChange = (event, value) => {
    setPersonName(value);
  }

  return (
    <div>
      <FormControl sx={{ width: "100%", my: 1 }} size="small">
        {/* <InputLabel id="demo-multiple-checkbox-label">User</InputLabel>
        <Select
          // size=""
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput fullWidth label="Select User" />}
          renderValue={(selected) =>
            selected.map((user) => user.name).join(", ")
          }
          MenuProps={MenuProps}
        >
          {alluser?.map((user) => (
            <MenuItem key={user.id} value={user}>
              <Checkbox checked={personName.indexOf(user) > -1} />
              <ListItemText primary={user.name} />
            </MenuItem>
          ))}
        </Select> */}
        <Autocomplete
          multiple
          id="tags-outlined"
          options={alluser}
          getOptionLabel={(option) => option.name}
          filterSelectedOptions
          onChange={autoCompleteChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select User"
              size="small"
              placeholder="Please select user"
            />
          )}
        />
        {validation && (
          <>
            {personName.length < 1 && (
              <Typography
                sx={{ fontSize: "12px", fontWeight: "400" }}
                variant="overline"
                display="block"
                gutterBottom
                color={"primary"}
              >
                Must Assigne This Project With People
              </Typography>
            )}
          </>
        )}
      </FormControl>
    </div>
  );
}
