import React, { useState, useContext } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Divider, Chip, TextField, Button } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AuthContext from "../../../store/AuthContext";
import toast from "react-hot-toast";
const ListInfoEditable = ({ userData, setUserData, handleEdit }) => {
  const [year, setYear] = useState(userData.grad_year);
  const [bio, setBio] = useState(userData.bio);
  const [connect, setConnect] = useState(userData.connect);
  const [spec, setSpec] = useState(userData.specialization);
  const [skills, setSkills] = useState(userData.skills);
  const authCtx = useContext(AuthContext);
  const submitHandler = () => {
    fetch("http://localhost:8080/profile/edit", {
      method: "POST",
      body: JSON.stringify({
        userId: authCtx.id,
        grad_year: year,
        bio: bio,
        connect: connect,
        specialization: spec,
        skills: skills,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = data.message;

            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        toast.success("Profile Updated!");
        setUserData(data);
        handleEdit();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <List>
      <Button onClick={submitHandler} variant="contained" fullWidth>
        SAVE
      </Button>
      <Divider style={{ marginTop: "20px" }} variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Bio" />
      </Divider>
      <ListItem className="list-item">
        <TextField
          multiline
          id="outlined-basic"
          value={bio}
          variant="outlined"
          placeholder="Add Bio"
          fullWidth
          onChange={(event) => setBio(event.target.value)}
        />
      </ListItem>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Specialization" />
      </Divider>
      <ListItem className="list-item">
        <TextField
          id="outlined-basic"
          value={spec}
          placeholder="Add Specialization"
          variant="outlined"
          fullWidth
          onChange={(event) => setSpec(event.target.value)}
        />
      </ListItem>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Year of Graduation" />
      </Divider>
      <ListItem className="list-item">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year"]}
            value={year}
            onChange={(newValue) => {
              setYear(newValue);
            }}
            renderInput={(params) => (
              <TextField fullWidth {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
      </ListItem>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Connect" />
      </Divider>
      <ListItem className="list-item">
        <TextField
          multiline
          id="outlined-basic"
          placeholder="Share Your Socials"
          value={connect}
          variant="outlined"
          fullWidth
          onChange={(event) => setConnect(event.target.value)}
        />
      </ListItem>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Skills" />
      </Divider>
      <ListItem className="list-item">
        <TextField
          multiline
          id="outlined-basic"
          value={skills}
          placeholder="Display Your Skills"
          variant="outlined"
          onChange={(event) => setSkills(event.target.value)}
          fullWidth
        />
      </ListItem>
    </List>
  );
};

export default ListInfoEditable;
