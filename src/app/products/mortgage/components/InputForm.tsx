"use client";

import React from "react";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export function InputForm() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

        <br />
        <Button variant="contained">Hello world</Button>
      </FormControl>
    </>
  );
}
