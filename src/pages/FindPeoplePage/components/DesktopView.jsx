import React, { useState } from "react";

import { Grid, Fade } from "@mui/material";
import PeoplesList from "./PeoplesList";
import PeopleProfile from "./PeopleProfile";

const DesktopView = () => {
  const [isProfile, setIsProfile] = useState(false);
  const [id, setId] = useState("");

  const handleProfile = (value) => {
    setIsProfile(value);
  };

  return (
    <Fade in={true}>
      <Grid container height="100%" spacing={3}>
        <Grid
          container
          item
          height="100%"
          overflow="auto"
          direction="column"
          style={{
            paddingRight: "10px",
            borderRight: "1px solid",
          }}
          xs={4}
        >
          <PeoplesList setId={setId} handleShowProfile={handleProfile} />
        </Grid>
        <Grid
          overflow="auto"
          container
          item
          direction="column"
          height="100%"
          xs={8}
        >
          <PeopleProfile
            id={id}
            isProfile={isProfile}
            handleShowProfile={handleProfile}
          />
        </Grid>
      </Grid>
    </Fade>
  );
};

export default DesktopView;
