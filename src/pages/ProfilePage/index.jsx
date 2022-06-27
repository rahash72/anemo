import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/AuthContext";
import { Grid, Hidden, Fade } from "@mui/material";
import "./styles.css";
import BasicInfo from "./components/BasicInfo";
import ListInfo from "./components/ListInfo";
import ListInfoEditable from "./components/ListInfoEditable";

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const [isEditable, toggleIsEditable] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/profile/" + authCtx.id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setUserData(data));
  }, []);

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
          {isEditable && (
            <ListInfoEditable
              userData={userData}
              setUserData={setUserData}
              handleEdit={handleEdit}
            />
          )}
          {!isEditable && <ListInfo userData={userData} />}
        </Grid>
      </Grid>
    </Fade>
  );
};

export default ProfilePage;
