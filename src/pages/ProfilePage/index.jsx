import React, { useState } from "react";

import { Grid, Hidden, Fade } from "@mui/material";
import "./styles.css";
import BasicInfo from "./components/BasicInfo";
import ListInfo from "./components/ListInfo";
import ListInfoEditable from "./components/ListInfoEditable";

const ProfilePage = () => {
  const [isEditable, toggleIsEditable] = useState(false);

  const handleEdit = () => {
    toggleIsEditable(!isEditable);
  };

  return (
    <Fade in={true}>
      <Grid container spacing={3}>
        <Hidden mdDown>
          <Grid container item md={4}></Grid>
          <Grid
            container
            item
            direction="column"
            alignItems="center"
            md={4}
            xs={12}
            position="fixed"
          >
            <BasicInfo isEditable={isEditable} handleEdit={handleEdit} />
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid
            container
            item
            direction="column"
            alignItems="center"
            md={4}
            xs={12}
          >
            <BasicInfo isEditable={isEditable} handleEdit={handleEdit} />
          </Grid>
        </Hidden>
        <Grid
          container
          item
          direction="column"
          md={8}
          xs={12}
          style={{ marginTop: "20px", borderLeft: "1px solid" }}
        >
          {isEditable && <ListInfoEditable />}
          {!isEditable && <ListInfo />}
        </Grid>
      </Grid>
    </Fade>
  );
};

export default ProfilePage;
