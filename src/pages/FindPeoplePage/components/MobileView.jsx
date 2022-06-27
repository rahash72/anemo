import React, { useState } from "react";

import { Grid, Fade } from "@mui/material";
import PeoplesList from "./PeoplesList";
import PeopleProfile from "./PeopleProfile";

const MobileView = () => {
  const [isProfile, setIsProfile] = useState(false);
  const [id, setId] = useState("");

  const handleProfile = (value) => {
    setIsProfile(value);
  };

  return (
    <Fade in={true}>
      <Grid container spacing={3}>
        {!isProfile && (
          <Grid container item direction="column" xs={12}>
            <PeoplesList setId={setId} handleShowProfile={handleProfile} />
          </Grid>
        )}
        {isProfile && (
          <Grid container item direction="column" xs={12}>
            <PeopleProfile
              id={id}
              isProfile={isProfile}
              handleShowProfile={handleProfile}
            />
          </Grid>
        )}
      </Grid>
    </Fade>
  );
};

export default MobileView;
