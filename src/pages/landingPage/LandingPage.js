import React from "react";

export const LandingPage = () => {
  return (
    <div className="landing-page-header">
      <div className="landing-page-header__navbar">
        <div className="landing-page-header__navbar__logo">WriterAI</div>

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
          <button className="landing-page-header__navbar__buttons__button landing-page-header__navbar__buttons__button--secondary">Login</button>
          <button className="landing-page-header__navbar__buttons__button landing-page-header__navbar__buttons__button--primary">Sign Up</button>
        </div>
      </div>
    </div>
  );
};
