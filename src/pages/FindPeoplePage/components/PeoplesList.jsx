import React, { useState, useEffect } from "react";

import { peoples } from "../data";
import {
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const PeoplesList = (props) => {
  const [yearFilter, setYearFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [filter, setFilter] = useState("Name");
  const [filteredPeoples, setFilteredPeoples] = useState(peoples);

  const handleFilterChange = (event) => {
    if (event.target.value === "Clear") {
      return setFilter("Name");
    }
    setFilter(event.target.value);
  };

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const handleCourseFilter = (event) => {
    setCourseFilter(event.target.value);
  };

  const handleProfile = (key) => {
    console.log(key);
  };

  const handleClearFilter = () => {
    setYearFilter("");
    setNameFilter("");
    setCourseFilter("");
  };

  useEffect(() => {
    if (yearFilter) {
      setFilteredPeoples(
        peoples.filter(
          (peoples) =>
            peoples.username.toLowerCase().includes(nameFilter.toLowerCase()) &&
            peoples.course.toLowerCase().includes(courseFilter.toLowerCase()) &&
            yearFilter.getFullYear() === peoples.year.getFullYear()
        )
      );
    } else {
      setFilteredPeoples(
        peoples.filter(
          (peoples) =>
            peoples.username.toLowerCase().includes(nameFilter.toLowerCase()) &&
            peoples.course.toLowerCase().includes(courseFilter.toLowerCase())
        )
      );
    }
  }, [yearFilter, nameFilter, courseFilter, peoples]);

  return (
    <>
      <FormControl margin="normal" fullWidth>
        <InputLabel id="filter-label">Filter by</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={filter}
          label="Filter By"
          onChange={handleFilterChange}
        >
          <MenuItem value="Name">Name</MenuItem>
          <MenuItem value="Year">Year of Graduation</MenuItem>
          <MenuItem value="Course">Course</MenuItem>
          <MenuItem value="Clear" onClick={handleClearFilter}>
            Clear Filters
          </MenuItem>
        </Select>
      </FormControl>

      {filter === "Name" && (
        <TextField
          value={nameFilter}
          onChange={handleNameFilter}
          label="Enter Name"
          margin="normal"
          fullWidth
        />
      )}
      {filter === "Year" && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year"]}
            value={yearFilter}
            onChange={(newValue) => {
              setYearFilter(newValue);
              console.log(yearFilter);
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                margin="normal"
                {...params}
                helperText={null}
              />
            )}
          />
        </LocalizationProvider>
      )}
      {filter === "Course" && (
        <TextField
          value={courseFilter}
          onChange={handleCourseFilter}
          label="Enter Course"
          margin="normal"
          fullWidth
        />
      )}
      {filteredPeoples.length === 0 && (
        <Typography marginTop="25vh" textAlign="center" variant="subtitle1">
          No Users Found
        </Typography>
      )}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Box style={{ maxHeight: "65vh", overflow: "auto" }}>
          {filteredPeoples.length !== 0 &&
            filteredPeoples.map((peoples) => {
              return (
                <>
                  <ListItemButton
                    key={peoples.key}
                    onClick={() => {
                      props.handleShowProfile(true);
                      handleProfile(peoples.key);
                    }}
                  >
                    <ListItemText
                      primary={peoples.username}
                      secondary={peoples.course}
                    />
                    <ListItemText
                      style={{ textAlign: "right" }}
                      secondary={peoples.year.getFullYear()}
                    />
                  </ListItemButton>
                  <Divider />
                </>
              );
            })}
        </Box>
      </List>
    </>
  );
};

export default PeoplesList;
