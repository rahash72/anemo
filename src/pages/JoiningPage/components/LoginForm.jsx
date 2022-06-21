import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import "../styles.css";
import {
  Box,
  TextField,
  Link,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import AuthContext from "../../../store/AuthContext";
import toast from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "10px 0 10px 0",
  },
  textField: {
    width: "100%",
  },
}));

const LoginForm = (props) => {
  const classes = useStyles();
  const authCtx = useContext(AuthContext);
  const [showPassword, toggleShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => {
    toggleShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetch("http://localhost:8080/api/auth/signin/", {
      method: "POST",
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
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
        toast.success("Signed In Successfully");
        authCtx.login(data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" className="join-form" onSubmit={handleLoginSubmit}>
        <TextField
          required
          margin="normal"
          fullWidth
          name="username"
          id="username"
          label="Username"
          type="text"
          variant="outlined"
          autoFocus
        />
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            fullWidth
            required
            type="password"
            name="password"
            id="password"
            label="Password"
            variant="outlined"
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        {!isLoading && (
          <Button
            style={{
              margin: "15px 0 10px 0",
            }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
        {isLoading && (
          <LoadingButton
            style={{ margin: "15px 0 10px 0" }}
            loading
            variant="contained"
          >
            Submit
          </LoadingButton>
        )}
      </Box>
      <Box className="form-switch">
        <Typography variant="subtitle1" gutterBottom>
          Create Account?
          <Link
            style={{ paddingLeft: "5px" }}
            component="button"
            variant="body1"
            onClick={() => {
              props.handleForm();
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default LoginForm;
