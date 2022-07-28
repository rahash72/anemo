import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../store/AuthContext";
import {
  Avatar,
  Typography,
  Button,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

const BasicInfo = (props) => {
  const authCtx = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [picEdit, setPicEdit] = useState(false);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/pic/" + authCtx.id, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.blob();
        }
      })
      .then((blob) => {
        const objectUrl = URL.createObjectURL(blob);
        console.log(objectUrl);
        setImage(objectUrl);
      });
  }, [picEdit]);

  useEffect(() => {
    if (!selectedImage) {
      setPreview(image);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage, picEdit]);

  const handleDPUpdate = (selectedImage) => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    fetch("http://localhost:8080/profile/upload/" + authCtx.id, {
      method: "POST",
      body: formData,
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
        toast.success("Profile Pic Updated!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
    console.log(selectedImage);
  };

  const handleDPDelete = () => {
    setPreview(null);
    fetch("http://localhost:8080/deletePic/" + authCtx.id, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          return res.then((data) => {
            let errorMessage = data.message;

            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        toast.success("Profile Pic Removed!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      {!picEdit && (
        <>
          <Avatar
            alt="Profile"
            src={image}
            style={{ height: "200px", marginTop: "100px", width: "200px" }}
          ></Avatar>
          <IconButton
            onClick={() => {
              setPicEdit(true);
            }}
            style={{ marginTop: "20px" }}
            variant="contained"
          >
            <EditIcon color="primary" />
          </IconButton>
        </>
      )}
      {picEdit && (
        <>
          <Avatar
            alt="Profile"
            src={preview}
            style={{ height: "200px", marginTop: "100px", width: "200px" }}
          ></Avatar>
          <ButtonGroup style={{ marginTop: "20px" }}>
            <IconButton size="large" variant="contained" component="label">
              <FileUploadIcon size="large" />
              <input
                type="file"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                  handleDPUpdate(event.target.files[0]);
                }}
                hidden
              />
            </IconButton>
            <IconButton
              onClick={() => {
                setSelectedImage(null);
                handleDPDelete();
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => setPicEdit(false)}>
              <DoneIcon />
            </IconButton>
          </ButtonGroup>
        </>
      )}
      <Typography style={{ marginTop: "80px" }} variant="h4">
        {authCtx.username}
      </Typography>
      {props.isEditable && (
        <Button
          onClick={props.handleEdit}
          style={{ marginTop: "50px" }}
          variant="outlined"
        >
          Cancel
        </Button>
      )}
      {!props.isEditable && (
        <Button
          onClick={props.handleEdit}
          style={{ marginTop: "50px" }}
          variant="contained"
        >
          Edit Profile
        </Button>
      )}
    </>
  );
};

export default BasicInfo;
