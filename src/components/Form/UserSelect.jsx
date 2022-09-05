import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   { id: 1, name: "Ashadul" },
//   { id: 2, name: "Sani" },
//   { id: 3, name: "Sourav" },
//   { id: 4, name: "Mufid" },
//   { id: 5, name: "Hridoy" }
// ];

export default function UserSelect({ personName, setPersonName, alluser }) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  console.log("user", personName);

  return (
    <div>
      <FormControl sx={{ mt: 1, width: "100%" }}>
        <InputLabel id="demo-multiple-checkbox-label">User</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput fullWidth label="User" />}
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
        </Select>
      </FormControl>
    </div>
  );
}
