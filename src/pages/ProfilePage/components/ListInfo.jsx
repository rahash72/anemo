import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Divider, Chip, Button, Typography } from "@mui/material";
import AuthContext from "../../../store/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import BlogCard from "../../BlogPage/BlogCard";
import {
  Modal,
  Box,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import toast from "react-hot-toast";
import Ecommerce from "../../EcommercePage/components/Ecommerce";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ListInfo = ({ userData }) => {
  const authCtx = useContext(AuthContext);
  const [viewBlog, setViewBlog] = useState(false);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Product");
  const [description, setDesciption] = useState("");
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/profile/items/" + authCtx.id, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setItems(data);
      });
  }, []);

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

  const submitHandler = () => {
    fetch("http://localhost:8080/ecomm/addItem", {
      method: "POST",
      body: JSON.stringify({
        sellerId: authCtx.id,
        title: title,
        category: category,
        description: description,
        price: price,
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
        toast.success("Item Added");
        setmodalIsOpen(false);
        console.log(data);
        setTitle("");
        setCategory("Product");
        setPrice(0);
        setDesciption("");
        setItems(data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
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
        <Button
          onClick={() => setmodalIsOpen(true)}
          fullWidth
          variant="contained"
        >
          Add Item
        </Button>
        <Modal
          open={modalIsOpen}
          closeAfterTransition
          onClose={() => setmodalIsOpen(false)}
        >
          <Box sx={style}>
            <Typography
              component="h1"
              variant="h5"
              style={{ textAlign: "center", marginBottom: "15px" }}
            >
              Add New Item
            </Typography>

            <TextField
              name="title"
              id="title"
              onChange={(event) => setTitle(event.target.value)}
              multiline
              fullWidth
              placeholder="Title"
              value={title}
              style={{ marginBottom: "15px" }}
            ></TextField>

            <TextField
              name="description"
              id="description"
              onChange={(event) => setDesciption(event.target.value)}
              multiline
              fullWidth
              placeholder="Description"
              style={{ marginBottom: "15px" }}
            ></TextField>
            <ToggleButtonGroup
              fullWidth
              color="primary"
              value={category}
              exclusive
              style={{ marginBottom: "15px" }}
              onChange={(event) => setCategory(event.target.value)}
            >
              <ToggleButton value="Product">Product</ToggleButton>
              <ToggleButton value="Services">Services</ToggleButton>
            </ToggleButtonGroup>
            <TextField
              name="price"
              id="price"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupeeRoundedIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => setPrice(event.target.value)}
              fullWidth
              placeholder="Price"
              style={{ marginBottom: "15px" }}
            ></TextField>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={submitHandler}
              style={{ marginBottom: "15px" }}
            >
              {" "}
              SUBMIT
            </Button>

            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={() => setmodalIsOpen(false)}
            >
              BACK
            </Button>
          </Box>
        </Modal>
      </ListItem>
      <ListItem className="list-item">
        <Ecommerce items={items} />
      </ListItem>
    </List>
  );
};

export default ListInfo;
