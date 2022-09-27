import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


export default function SelectProject({ projectName, setProjectName, allProject }) {

  const handleChange = (event) => {
    setProjectName(event.target.value);
  };


  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Project</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={projectName}
          label="Select Project"
          onChange={handleChange}
        >
          {allProject?.map((project) => (
            <MenuItem value={project.id}>{project.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
