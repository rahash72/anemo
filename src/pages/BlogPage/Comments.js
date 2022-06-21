import { Typography, IconButton } from "@mui/material";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import React, { useState, useContext } from "react";
import AuthContext from "../../store/AuthContext";
import Modal from "@mui/material/Modal";
import { Button, Box } from "@mui/material";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";

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

const Comments = ({ blog }) => {
  const authCtx = useContext(AuthContext);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [comment, setComment] = useState("");

  const commentHandler = (event) => {
    setComment(event.target.value);
  };

  const submitHandler = () => {
    setmodalIsOpen(false);
    fetch("http://localhost:8080/blogs/add_comment/", {
      method: "POST",
      body: JSON.stringify({
        userId: authCtx.id,
        blogId: blog._id,
        comment: comment,
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
        toast.success("Comment Posted!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <Typography sx={{ marginTop: "12px" }} paragraph color="text.secondary">
        Comments
        <IconButton
          onClick={() => setmodalIsOpen(true)}
          sx={{ float: "right" }}
        >
          <AddCommentOutlinedIcon />
        </IconButton>
      </Typography>
      {blog.comments.length === 0 && (
        <Typography variant="body2">No Comments</Typography>
      )}
      {blog.comments.length !== 0 &&
        blog.comments.map((comment) => {
          return (
            <>
              <Typography sx={{ marginTop: "15px" }}>
                {comment.comment}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {comment.username}
              </Typography>
            </>
          );
        })}
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
            Add Comment
          </Typography>

          <TextField
            name="comment"
            id="comment"
            onChange={commentHandler}
            multiline
            fullWidth
            placeholder="Comment"
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
    </>
  );
};

export default Comments;
