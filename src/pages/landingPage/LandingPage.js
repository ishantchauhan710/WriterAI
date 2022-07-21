import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../firebase/firebase";
import AuthModal from "./components/AuthModal";
import LandingHeader from "./components/LandingHeader";

export const LandingPage = () => {


  return (
    <>
      <LandingHeader />
    </>
  );
};
