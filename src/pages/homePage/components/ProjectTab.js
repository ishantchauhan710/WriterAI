import React, { useState } from "react";
import { ProjectMenuDialog } from "./ProjectMenuDialog";

export const ProjectTab = ({ projects, label }) => {
  return (
    <div className="home-page__tab-data">
      <div className="home-page__tab-data__section-label">{label}</div>
      <div className="home-page__tab-data__new-card-container">
        {projects.map((item) => (
          <div className="home-page__tab-data__content-card">
            <div className="home-page__tab-data__content-card__img">
              <img src={item.image} />
              <ProjectMenuDialog />
              <div className="home-page__tab-data__content-card__menu_button">
                <i className="material-icons">more_vert</i>
              </div>
            </div>
            <div className="home-page__tab-data__content-card__data">
              <div className="home-page__tab-data__content-card__data__title">
                {item.title}
              </div>
              <div className="home-page__tab-data__content-card__data__description">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
