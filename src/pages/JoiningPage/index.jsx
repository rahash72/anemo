import React, { useState } from "react";
import {
  Grid,
  Hidden,
  Typography,
  Fade,
  Box,
  Card,
  Avatar,
} from "@mui/material";
import LoginForm from "./components/LoginForm";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import "./styles.css";
import RegisterForm from "./components/RegisterForm";

const JoiningPage = () => {
  const [showLoginForm, toggleLoginForm] = useState(true);

  const formHandler = () => {
    toggleLoginForm(!showLoginForm);
  };

  return (
    <Grid container spacing={3}>
      <Hidden smDown>
        <Fade in={true}>
          <Grid
            container
            item
            direction="column"
            justifyContent="center"
            alignItems="center"
            md={6}
            style={{ marginTop: "13vh" }}
          >
            <Typography
              className="left-header"
              variant="h2"
              component="span"
              gutterBottom
            >
              <img src="/images/Logo.png" className="logo" />
              Anemo
            </Typography>
            <Typography
              className="left-header"
              variant="h5"
              component="h5"
              gutterBottom
            >
              Your Campus, Right Away.
            </Typography>
          </Grid>
        </Fade>
      </Hidden>

      <Grid
        container
        item
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={12}
        md={6}
        style={{ marginTop: "13vh" }}
      >
        <Fade in={true}>
          <Card className="form-card">
            <Box className="lock-icon">
              <Avatar
                style={{
                  backgroundColor: "rgb(220, 0, 78)",
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
            </Box>
            {showLoginForm && <LoginForm handleForm={formHandler} />}
            {!showLoginForm && <RegisterForm handleForm={formHandler} />}
          </Card>
        </Fade>
      </Grid>
    </Grid>
  );
};

export default JoiningPage;
