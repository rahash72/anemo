import React, { useState, useContext } from "react";
import AuthContext from "../../store/AuthContext";
import Modal from "@mui/material/Modal";
import { Button, Box } from "@mui/material";
import { Add } from "@material-ui/icons";
import styled from "styled-components";
import { TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const ButtonText = styled.span`
  font-size: "40px";
  color: "blue";
`;

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

const Appbar = () => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const authCtx = useContext(AuthContext);

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const contentHandler = (event) => {
    setContent(event.target.value);
  };

  const submitHandler = () => {
    setmodalIsOpen(false);
    fetch("http://localhost:8080/blogs/new/", {
      method: "POST",
      body: JSON.stringify({
        userId: authCtx.id,
        title: title,
        content: content,
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
        toast.success(data.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div style={{ textAlign: "right", width: "100%" }}>
      <Button
        color="inherit"
        variant="outlined"
        onClick={() => setmodalIsOpen(true)}
      >
        <Add />
        <span className={ButtonText}>ADD BLOG</span>
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
            Add your blog here!
          </Typography>

          <TextField
            name="title"
            id="title"
            onChange={titleHandler}
            multiline
            fullWidth
            placeholder="Title"
            style={{ marginBottom: "15px" }}
          ></TextField>

          <TextField
            name="content"
            id="content"
            onChange={contentHandler}
            multiline
            fullWidth
            placeholder="Content"
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
            SUBMIT BLOG
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
    </div>
  );
};

export default Appbar;
