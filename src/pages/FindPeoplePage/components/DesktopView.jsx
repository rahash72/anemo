import React, { useState } from "react";

import { Grid, Fade, Divider } from "@mui/material";
import PeoplesList from "./PeoplesList";
import PeopleProfile from "./PeopleProfile";

const DesktopView = () => {
  const [isProfile, setIsProfile] = useState(false);

  const handleProfile = (value) => {
    setIsProfile(value);
  };

  return (
    <Fade in={true}>
      <Grid container spacing={3}>
        <Grid
          container
          item
          direction="column"
          style={{
            paddingRight: "10px",
            borderRight: "1px solid",
          }}
          xs={4}
        >
          <PeoplesList handleShowProfile={handleProfile} />
        </Grid>
        <Grid
          container
          item
          direction="column"
          style={{
            height: "92vh",
          }}
          xs={8}
        >
          <PeopleProfile
            isProfile={isProfile}
            handleShowProfile={handleProfile}
          />
        </Grid>
      </Grid>
    </Fade>
  );
};

export default DesktopView;
