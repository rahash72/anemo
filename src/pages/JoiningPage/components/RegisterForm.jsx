import React, { useState, useContext } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
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

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "10px 0 10px 0",
  },
  textField: {
    width: "100%",
  },
}));

const RegisterForm = (props) => {
  const classes = useStyles();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [showPassword, toggleShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => {
    toggleShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegisterSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvFOznWibkcC9X0GV2bFfBT_8AyDuH3NY",
      {
        method: "POST",
        body: JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!";

            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        history.replace("/blog");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box
        component="form"
        className="join-form"
        onSubmit={handleRegisterSubmit}
      >
        <TextField
          margin="normal"
          fullWidth
          required
          name="username"
          id="username"
          label="Username"
          variant="outlined"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          required
          name="email"
          id="email"
          type="email"
          label="Email Address"
          variant="outlined"
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
            style={{ margin: "15px 0 10px 0" }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign up
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
          Already have an account?
          <Link
            style={{ paddingLeft: "5px" }}
            component="button"
            variant="body1"
            onClick={() => {
              props.handleForm();
            }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default RegisterForm;
