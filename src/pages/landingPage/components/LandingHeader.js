import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingPageDrawer from './LandingPageDrawer'
import { isUserLoggedIn } from "../../../firebase/firebase";
import AuthModal from "./AuthModal";

const LandingHeader = () => {

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

  return (
    <div className="landing-page__header">
      <div className="landing-page__header__logo">
        <LandingPageDrawer
          openLoginModal={openLoginModal}
          openSignUpModal={openSignUpModal}
        />
        WriterAI
      </div>
      <div className="landing-page__header__links">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Features</a>
          </li>
          <li>
            <a href="#">Developers</a>
          </li>
          <li>
            <a href="#">Github</a>
          </li>
        </ul>
      </div>
      <div className="landing-page__header__buttons">
        <button className="landing-page__header__button landing-page__header__button--secondary writerai-button">
          Login
        </button>
        <button className="landing-page__header__button landing-page__header__button--primary writerai-button">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingHeader;
