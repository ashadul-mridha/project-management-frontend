import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

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

export default function SelectProject({ projectName, setProjectName, allProject }) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProjectName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };


  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-checkbox-label">Project</InputLabel>
        <Select
          // size=""
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={projectName}
          onChange={handleChange}
          input={<OutlinedInput fullWidth label="Select Project" />}
          renderValue={(selected) =>
            selected.map((user) => user.name).join(", ")
          }
          MenuProps={MenuProps}
        >
          {allProject?.map((project) => (
            <MenuItem key={project.id} value={project}>
              <Checkbox checked={projectName.indexOf(project) > -1} />
              <ListItemText primary={project.name} />
            </MenuItem>
          ))}
        </Select>
        {projectName.length < 1 && (
          <Typography
            sx={{ fontSize: "12px", fontWeight: "400" }}
            variant="overline"
            display="block"
            gutterBottom
            color={"primary"}
          >
            please enter whice project do you add
          </Typography>
        )}
      </FormControl>
    </div>
  );
}
