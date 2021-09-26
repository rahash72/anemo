import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Button, Box } from "@mui/material";
import { Add } from "@material-ui/icons";
import styled from "styled-components";
import { TextField, Typography } from "@mui/material";

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
            name="story"
            id="summary"
            multiline
            fullWidth
            placeholder="Write a Blog."
            style={{ marginBottom: "15px" }}
          ></TextField>

          <Button
            color="primary"
            variant="contained"
            fullWidth
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
