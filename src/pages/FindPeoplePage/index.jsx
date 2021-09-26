import React, { useEffect, useState } from "react";
import { Hidden } from "@mui/material";
import DesktopView from "./components/DesktopView";
import MobileView from "./components/MobileView";

const FindPeoplePage = () => {
  return (
    <>
      <Hidden mdDown>
        <DesktopView />
      </Hidden>
      <Hidden mdUp>
        <MobileView />
      </Hidden>
    </>
  );
};

export default FindPeoplePage;
