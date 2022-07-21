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
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState("1"); // 1: Login, 2: SignUp
  const navigate = useNavigate();

  const openLoginModal = () => {
    setOpenAuthModal(true);
    setAuthTab("1");
  };

  const openSignUpModal = () => {
    setOpenAuthModal(true);
    setAuthTab("2");
  };

  useEffect(() => {
    const userLoggedIn = isUserLoggedIn();
    if (userLoggedIn === true) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="landing-page">
      <LandingHeader
        openLoginModal={openLoginModal}
        openSignUpModal={openSignUpModal}
      />
      <LandingHome openSignUpModal={openSignUpModal} />
      <LandingFeatures />
      <LandingPoweredBy />
      <LandingFooter />
      <AuthModal
        openAuthModal={openAuthModal}
        setOpenAuthModal={setOpenAuthModal}
        authTab={authTab}
        setAuthTab={setAuthTab}
      />
    </div>
  );
};
