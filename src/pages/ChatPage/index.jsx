import React from "react";
import { Hidden } from "@material-ui/core";
import DesktopView from "./components/DesktopView";
const ChatPage = () => {
  return (
    <>
      <Hidden mdDown>
        <DesktopView />
      </Hidden>
    </>
  );
};

export default ChatPage;
