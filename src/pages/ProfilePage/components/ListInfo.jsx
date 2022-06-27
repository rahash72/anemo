import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Divider, Chip, Button, Typography } from "@mui/material";
import AuthContext from "../../../store/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import BlogCard from "../../BlogPage/BlogCard";
const ListInfo = ({ userData }) => {
  const authCtx = useContext(AuthContext);
  const [viewBlog, setViewBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const handleViewBlog = () => {
    if (!viewBlog) {
      fetch("http://localhost:8080/profile/myblogs/" + authCtx.id)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setBlogs(data);
        });
    }
    setViewBlog(!viewBlog);
  };

  let year = userData.grad_year
    ? new Date(userData.grad_year).getFullYear()
    : null;
  return (
    <List>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Name" />
      </Divider>
      <ListItem className="list-item">
        <ListItemText>{userData.name}</ListItemText>
      </ListItem>
      {userData.bio && (
        <>
          <Divider variant="middle" textAlign="left">
            <Chip color="primary" variant="outlined" label="Bio" />
          </Divider>
          <ListItem className="list-item">
            <ListItemText>{userData.bio}</ListItemText>
          </ListItem>
        </>
      )}
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="College" />
      </Divider>
      <ListItem className="list-item">
        <ListItemText>{userData.collegeName}</ListItemText>
      </ListItem>
      {userData.specialization && (
        <>
          <Divider variant="middle" textAlign="left">
            <Chip color="primary" variant="outlined" label="Specialization" />
          </Divider>
          <ListItem className="list-item">
            <ListItemText>{userData.specialization}</ListItemText>
          </ListItem>
        </>
      )}
      {userData.grad_year && (
        <>
          <Divider variant="middle" textAlign="left">
            <Chip
              color="primary"
              variant="outlined"
              label="Year of Graduation"
            />
          </Divider>
          <ListItem className="list-item">
            <ListItemText>{year}</ListItemText>
          </ListItem>
        </>
      )}
      {userData.connect && (
        <>
          <Divider variant="middle" textAlign="left">
            <Chip color="primary" variant="outlined" label="Connect" />
          </Divider>
          <ListItem className="list-item">
            <ListItemText>{userData.connect}</ListItemText>
          </ListItem>
        </>
      )}
      {userData.skills && (
        <>
          <Divider variant="middle" textAlign="left">
            <Chip color="primary" variant="outlined" label="Skills" />
          </Divider>
          <ListItem className="list-item">
            <ListItemText>{userData.skills}</ListItemText>
          </ListItem>
        </>
      )}
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="My Blogs" />
      </Divider>

      {viewBlog && (
        <>
          <ListItem className="list-item">
            <Button onClick={handleViewBlog} variant="outlined" fullWidth>
              Hide Blogs
            </Button>
          </ListItem>

          {blogs.length === 0 && (
            <Typography
              sx={{ textAlign: "center", marginBottom: "20px" }}
              variant="body1"
              color="text.secondary"
            >
              No Blogs Added
            </Typography>
          )}
          {blogs.length !== 0 &&
            blogs.map((blog) => {
              return (
                <ListItem>
                  <BlogCard blog={blog} key={blog._id} />
                </ListItem>
              );
            })}
        </>
      )}
      {!viewBlog && (
        <ListItem className="list-item">
          <Button onClick={handleViewBlog} variant="contained" fullWidth>
            View Blogs
          </Button>
        </ListItem>
      )}
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Your Items" />
      </Divider>
      <ListItem className="list-item">
        <Button variant="contained">Become a Seller</Button>
      </ListItem>
    </List>
  );
};

export default ListInfo;
