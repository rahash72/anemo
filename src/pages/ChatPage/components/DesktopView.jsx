import React, { useState } from "react";
import ChatList from "./ChatList";
import { Grid, Fade, Typography } from "@mui/material";
import Chat from "./Chat";

const DesktopView = () => {
  const [isChat, setIsChat] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleChat = (value) => {
    setIsChat(value);
  };

  return (
    <Fade in={true}>
      <Grid container style={{ height: "100%" }}>
        <Grid
          container
          item
          overflow="auto"
          direction="column"
          style={{
            height: "100%",
            paddingRight: "10px",
            borderRight: "1px solid",
          }}
          xs={3}
        >
          <ChatList setName={setName} setId={setId} handleChat={handleChat} />
        </Grid>
        <Grid
          container
          item
          direction="column"
          style={{ height: "100%" }}
          xs={9}
        >
          {!isChat && (
            <Typography
              style={{ textAlign: "center", marginTop: "40vh" }}
              variant="h6"
            >
              Click on a chat to display.
            </Typography>
          )}
          {isChat && <Chat id={id} name={name} setId={setId} />}
        </Grid>
      </Grid>
    </Fade>
  );
};

export default DesktopView;
