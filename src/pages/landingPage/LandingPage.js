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
          <button className="writerai-button landing-page-header__navbar__buttons__button landing-page-header__navbar__buttons__button--secondary">
            Login
          </button>
          <button className="writerai-button landing-page-header__navbar__buttons__button landing-page-header__navbar__buttons__button--primary">
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
        <button className="writerai-button landing-page-header__buttons__button landing-page-header__buttons__button--primary">
          Get Started
        </button>
        <button className="writerai-button landing-page-header__buttons__button landing-page-header__buttons__button--secondary">
          Watch Demo
        </button>
      </div>
    </div>
  );
};
