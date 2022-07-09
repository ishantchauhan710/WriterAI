import React, { useState } from "react";
import AuthModal from "./components/AuthModal";
import LandingPageDrawer from "./components/LandingPageDrawer";

export const LandingPage = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState("1"); // 1: Login, 2: SignUp

  const openLoginModal = () => {
    setOpenAuthModal(true);
    setAuthTab("1");
  };

  const openSignUpModal = () => {
    setOpenAuthModal(true);
    setAuthTab("2");
  };

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
          Use the Power of Artificial Intelligence to write High Quality Blogs,
          Emails and Letters.
        </div>

        <div className="landing-page-header__subheading">
          WriterAI is a tool which automatically generates High Quality Content
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

        <div class="landing-page-header__illustration-container">
          <img src="https://img.freepik.com/free-vector/blogging-illustration-concept_114360-788.jpg?size=626&ext=jpg&ga=GA1.2.555459057.1642934042" />
        </div>
      </div>

      <div className="landing-page-footer"></div>
    </>
  );
};
