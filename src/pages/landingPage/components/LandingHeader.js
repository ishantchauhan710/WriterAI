import React, { useEffect, useState } from "react";
import LandingPageDrawer from "./LandingPageDrawer";

const LandingHeader = ({openLoginModal,openSignUpModal}) => {
 

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
        <button onClick={() => openLoginModal()} className="landing-page__header__button landing-page__header__button--secondary writerai-button">
          Login
        </button>
        <button onClick={() => openSignUpModal()} className="landing-page__header__button landing-page__header__button--primary writerai-button">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingHeader;
