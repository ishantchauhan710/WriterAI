import Lottie from "lottie-react";
import landingPageAnimation from "../../../../res/animations/landing_page_anim.json";
import React from "react";

export const LandingHome = ({ openSignUpModal }) => {
  return (
    <div id="home" className="landing-page__home">
      <div className="landing-page__home__left">
        <div className="landing-page__home__left__text-tertiary mv-10">
          Writing content is easy
        </div>
        <div className="landing-page__home__left__text-primary mv-10">
          Use the Power of Artificial Intelligence to write high quality content
        </div>
        <div className="landing-page__home__left__text-secondary mv-10">
          WriterAI is an AI based content writing tool that helps users easily
          write high quality emails, blogs, letters, thesis and other stuff. One can share their project with others and work as a team.
        </div>
        <div className="landing-page__home__left__buttons">
          <button
            onClick={() => openSignUpModal()}
            className="writerai-button landing-page__home__left__button--primary mv-10"
          >
            Try now
          </button>
          <button
            onClick={() => {
              window.open("https://github.com/ishantchauhan710/WriterAI");
            }}
            className="writerai-button landing-page__home__left__button--secondary mv-10"
          >
            Source Code
          </button>
        </div>
      </div>

      <div className="landing-page__home__right">
        <Lottie
          style={{ width: "100%", height: "100%" }}
          animationData={landingPageAnimation}
          loop={true}
        />
      </div>
    </div>
  );
};
