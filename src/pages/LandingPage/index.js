import React from "react";
import SocialMedia from "./components/SocialMedia";
import HeroSection from "./HeroSection";
import { homeObjOne, homeObjTwo, homeObjThree } from "./Data";

const LandingPage = () => {
  return (
    <>
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeObjTwo} />
      <HeroSection {...homeObjThree} />
      <SocialMedia />
    </>
  );
};

export default LandingPage;
