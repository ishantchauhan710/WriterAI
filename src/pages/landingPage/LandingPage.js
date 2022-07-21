import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../firebase/firebase";
import AuthModal from "./components/AuthModal";
import { LandingFeatures } from "./components/LandingFeatures";
import { LandingFooter } from "./components/LandingFooter";
import LandingHeader from "./components/LandingHeader";
import { LandingHome } from "./components/LandingHome";
import { LandingPoweredBy } from "./components/LandingPoweredBy";

export const LandingPage = () => {


  return (
    <>
      <LandingHeader />
      <LandingHome />
      <LandingFeatures />
      <LandingPoweredBy />
      <LandingFooter />
    </>
  );
};
