import React, { useContext, useState, useEffect } from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Appbar from "./Appbar";
import AuthContext from "../../store/AuthContext";
import BlogCard from "./BlogCard";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "white",
    marginTop: "10px",
    marginBottom: "10px",
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80')`,
    height: "500px",
    textAlign: "center",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },
}));

function BlogPage(props) {
  const classes = useStyles();
  const authCtx = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/blogs/" + authCtx.id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setBlogs(data));
  }, []);
  return (
    <div className="BlogPage">
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Appbar setBlogs={setBlogs} />
        </Toolbar>
      </AppBar>

      <Box className={classes.hero}>
        <Box>{authCtx.university}</Box>
      </Box>
      {blogs.length === 0 && (
        <Typography
          sx={{ textAlign: "center", marginTop: "50px" }}
          variant="h5"
          color="text.secondary"
        >
          No Blogs Added
        </Typography>
      )}
      {blogs.length !== 0 &&
        blogs.map((blog) => {
          return <BlogCard blog={blog} key={blog._id} />;
        })}
    </div>
  );
}

export default BlogPage;
