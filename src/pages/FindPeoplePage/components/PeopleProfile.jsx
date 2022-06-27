import { Typography, Box, IconButton } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Divider, Chip, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import BlogCard from "../../BlogPage/BlogCard";

const PeopleProfile = (props) => {
  const [userData, setUserData] = useState();
  const [viewBlog, setViewBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const handleViewBlog = () => {
    if (!viewBlog) {
      fetch("http://localhost:8080/profile/myblogs/" + props.id)
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
  useEffect(() => {
    setViewBlog(false);
    props.id &&
      fetch("http://localhost:8080/profile/" + props.id)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setUserData(data);
        });
  }, [props.isProfile, props.id]);

  return (
    <>
      {!props.isProfile && (
        <Typography
          style={{ textAlign: "center", marginTop: "40vh" }}
          variant="h6"
        >
          Click on a profile to display.
        </Typography>
      )}
      {props.isProfile && userData && (
        <Box style={{ overflow: "auto" }}>
          <Box style={{ textAlign: "right" }}>
            <IconButton
              onClick={() => {
                props.handleShowProfile(false);
              }}
            >
              <CancelOutlinedIcon fontSize="large" color="primary" />
            </IconButton>
          </Box>
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
                  <Chip
                    color="primary"
                    variant="outlined"
                    label="Specialization"
                  />
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
                  <ListItemText>
                    {new Date(userData.grad_year).getFullYear()}
                  </ListItemText>
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
          </List>
        </Box>
      )}
    </>
  );
};

export default PeopleProfile;
