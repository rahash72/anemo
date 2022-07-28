import React, { useState, useContext } from "react";
import AuthContext from "../../../store/AuthContext";
import Modal from "@mui/material/Modal";
import { Button, Box } from "@mui/material";
import { Add } from "@material-ui/icons";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
import Input from "@mui/material/Input";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonSearchTwoToneIcon from "@mui/icons-material/PersonSearchTwoTone";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  select: {
    "&:before": {
      borderColor: "red",
    },
    color: "white",
    "&:before": {
      borderColor: "var(--galaxy-blue)",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderColor: "var(--galaxy-blue)",
    },
  },
  icon: { color: "white" },
  label: { color: "white" },
}));

const Appbar = ({ category, setCategory, title, setTitle }) => {
  const classes = useStyles();
  return (
    <div style={{ textAlign: "right", width: "100%" }}>
      <Input
        placeholder="Search"
        disableUnderline
        onChange={(event) => setTitle(event.target.value)}
        sx={{
          float: "left",
          color: "white",
          marginTop: "10px",
        }}
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment sx={{ color: "white" }} position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
      <FormControl
        sx={{
          m: 1,
          minWidth: 150,
          color: "white",
          "&.MuiOutlinedInput-root": {
            borderColor: "white!important",
            color: "white!important",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
            color: "white",
          },
        }}
        size="small"
      >
        <InputLabel
          sx={{
            color: "white",
            "&.Mui-focused": {
              borderColor: "white",
              color: "white",
            },
            "&.MuiOutlinedInput-root": {
              borderColor: "white!important",
              color: "white!important",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
              color: "white",
            },
          }}
          id="demo-simple-select-label"
        >
          Category
        </InputLabel>
        <Select
          className={classes.select}
          inputProps={{
            classes: {
              icon: classes.icon,
              root: classes.root,
            },
          }}
          sx={{
            color: "white",

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
              color: "white",
            },
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={(event) => setCategory(event.target.value)}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"Product"}>Product</MenuItem>
          <MenuItem value={"Services"}>Services</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Appbar;
