import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../firebase/firebase";
import AuthModal from "./components/AuthModal";
import LandingPageDrawer from "./components/LandingPageDrawer";

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
    <>
      <AuthModal
        openAuthModal={openAuthModal}
        setOpenAuthModal={setOpenAuthModal}
        authTab={authTab}
        setAuthTab={setAuthTab}
      />
      <div className="landing-page-header">
        <div className="landing-page-header__navbar">
          <div className="landing-page-header__navbar__logo">
            <LandingPageDrawer
              openLoginModal={openLoginModal}
              openSignUpModal={openSignUpModal}
            />
            WriterAI
          </div>

          <div className="landing-page-header__navbar__links">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Source Code</a>
              </li>
            </ul>
          </div>

          <div className="landing-page-header__navbar__buttons">
            <button
              onClick={() => openLoginModal()}
              className="writerai-button landing-page-header__navbar__buttons__button landing-page-header__navbar__buttons__button--secondary"
            >
              Login
            </button>
            <button
              onClick={() => openSignUpModal()}
              className="writerai-button landing-page-header__navbar__buttons__button landing-page-header__navbar__buttons__button--primary"
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="landing-page-header__heading">
          Use the Power of{" "}
          <span className="writerai-text-tint-primary">
            Artificial Intelligence
          </span>{" "}
          to write High Quality Blogs, Emails and Letters.
        </div>

        <div className="landing-page-header__subheading">
          <span className="writerai-text-tint-primary">WriterAI</span> is a tool
          which automatically generates{" "}
          <span className="writerai-text-tint-primary">
            High Quality Content
          </span>{" "}
          for your all needs! Just provide the AI with an overview of the topic
          and you will get the results instantly
        </div>

        <div className="landing-page-header__buttons">
          <button
            onClick={() => openSignUpModal()}
            className="writerai-button landing-page-header__buttons__button landing-page-header__buttons__button--primary"
          >
            Get Started
          </button>
          <button className="writerai-button landing-page-header__buttons__button landing-page-header__buttons__button--secondary">
            Watch Demo
          </button>
        </div>
      </div>

      <div className="landing-page-footer">
        <img src="hashnode_white.png" />
        <img style={{transform: "scale(1.3)"}} src="planetscale_white.png" />
        <img style={{transform: "scale(1.3)"}} src="firebase_white.png" />
        <img style={{transform: "scale(1.6)"}} src="linode_white.png" />
      </div>
    </>
  );
};
