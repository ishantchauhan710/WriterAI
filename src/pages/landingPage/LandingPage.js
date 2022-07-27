import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../security/firebase";
import AuthModal from "./components/other/AuthModal";
import { LandingFeatures } from "./components/main/LandingFeatures";
import { LandingFooter } from "./components/main/LandingFooter";
import LandingHeader from "./components/main/LandingHeader";
import { LandingHome } from "./components/main/LandingHome";
import { LandingPoweredBy } from "./components/main/LandingPoweredBy";

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
