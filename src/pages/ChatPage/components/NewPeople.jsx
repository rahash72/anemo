import React, { useState, useEffect, useContext } from "react";
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
import AuthContext from "../../../store/AuthContext";
const NewPeople = (props) => {
  const authCtx = useContext(AuthContext);
  const [yearFilter, setYearFilter] = useState(new Date(0).getFullYear());
  const [nameFilter, setNameFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [filter, setFilter] = useState("Name");
  const [peoples, setPeoples] = useState([]);

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

  const handleClearFilter = () => {
    setYearFilter(new Date(0).getFullYear());
    setNameFilter("");
    setCourseFilter("");
  };

  useEffect(() => {
    let url = new URL("http://localhost:8080/messages/" + authCtx.id);
    url.search = new URLSearchParams({
      grad_year: new Date(yearFilter).getFullYear(),
      specialization: courseFilter,
      username: nameFilter,
    });
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setPeoples(data);
      });
  }, [yearFilter, nameFilter, courseFilter]);

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
      {!peoples && (
        <Typography marginTop="25vh" textAlign="center" variant="subtitle1">
          No Users Found
        </Typography>
      )}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Box style={{ maxHeight: "65vh", overflow: "auto" }}>
          {peoples &&
            peoples.map((people) => {
              return (
                <>
                  <ListItemButton
                    key={people._id}
                    onClick={() => {
                      props.setName(people.name);
                      props.setId(people._id);
                      props.handleShowProfile(true);
                    }}
                  >
                    <ListItemText
                      primary={people.name}
                      secondary={people.specialization}
                    />
                    <ListItemText
                      style={{ textAlign: "right" }}
                      secondary={
                        people.grad_year
                          ? new Date(people.grad_year).getFullYear()
                          : null
                      }
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

export default NewPeople;
