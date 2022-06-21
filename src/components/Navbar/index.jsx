import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AuthContext from "../../store/AuthContext";
import SideBar from "../SideBar";
import "./styles.css";
import toast from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const drawerWidth = 250;

export default function ButtonAppBar() {
  const classes = useStyles();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    history.replace("/join");
    toast.success("Logged Out!");
    authCtx.logout();
  };

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        color="white"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img src="/images/Logo.png" className="nav-logo" />
            {authCtx.isLoggedIn && (
              <Link className="anemo-header" to="/blog">
                Anemo
              </Link>
            )}
            {!authCtx.isLoggedIn && (
              <Link className="anemo-header" to="/">
                Anemo
              </Link>
            )}
          </Typography>
          {isLoggedIn && (
            <div>
              <SideBar Logout={handleLogout} />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
