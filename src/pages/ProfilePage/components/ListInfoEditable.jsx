import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Divider, Chip, TextField } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const ListInfoEditable = () => {
  const [year, setYear] = React.useState(new Date());

  return (
    <List>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Name" />
      </Divider>
      <ListItem className="list-item">
        <TextField
          id="outlined-basic"
          value="Rahash Agarwal"
          variant="outlined"
          fullWidth
        />
      </ListItem>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Bio" />
      </Divider>
      <ListItem className="list-item">
        <TextField
          multiline
          id="outlined-basic"
          value="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia eos
          a sapiente tempora, perspiciatis alias error. Nobis accusantium unde
          perspiciatis possimus quidem iste ab id totam eveniet ducimus? Facere,
          dolor."
          variant="outlined"
          fullWidth
        />
      </ListItem>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Specialization" />
      </Divider>
      <ListItem className="list-item">
        <TextField
          id="outlined-basic"
          value="Computer Science and Engineering"
          variant="outlined"
          fullWidth
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
          value="Instagram: __rahash__"
          variant="outlined"
          fullWidth
        />
      </ListItem>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Skills" />
      </Divider>
      <ListItem className="list-item">
        <TextField
          multiline
          id="outlined-basic"
          value="Skills"
          variant="outlined"
          fullWidth
        />
      </ListItem>
    </List>
  );
};

export default ListInfoEditable;
