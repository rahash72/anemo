import React, { useState } from "react";

import { Avatar, Typography, Button } from "@mui/material";

const BasicInfo = (props) => {
  return (
    <>
      <Avatar
        alt="Profile"
        src="/images/user.png"
        style={{ height: "200px", marginTop: "100px", width: "200px" }}
      ></Avatar>
      <Typography style={{ marginTop: "80px" }} variant="h4">
        Rubix
      </Typography>
      {props.isEditable && (
        <Button
          onClick={props.handleEdit}
          style={{ marginTop: "50px" }}
          variant="outlined"
        >
          Save
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
