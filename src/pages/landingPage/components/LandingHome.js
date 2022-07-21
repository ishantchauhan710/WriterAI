import React from "react";

export const LandingHome = () => {
  return (
    <div className="landing-page__home">
      <div className="landing-page__home__left">
        <div className="landing-page__home__left__text-tertiary mv-10">
          Writing content is easy
        </div>
        <div className="landing-page__home__left__text-primary mv-10">
          Use the Power of Artificial Intelligence to write high quality content
        </div>
        <div className="landing-page__home__left__text-secondary mv-10">
          WriterAI is an AI based content writing tool that helps users easily write blogs and directly publish them to platforms like hashnode, medium, and dev.to! Just provide the AI with an overview of the topic
          and you will get the results instantly. 
        </div>
        <div className="landing-page__home__left__buttons">
        <button className="writerai-button landing-page__home__left__button--primary mv-10">Try now</button>
        <button className="writerai-button landing-page__home__left__button--secondary mv-10">Source Code</button>
          
        </div>
      </div>

      <div className="landing-page__home__right">Right</div>
    </div>
  );
};
