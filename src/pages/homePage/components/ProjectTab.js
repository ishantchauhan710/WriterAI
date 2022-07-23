import React, { useState } from "react";
import { ProjectMenuDialog } from "./ProjectMenuDialog";

export const ProjectTab = ({ projects, label }) => {

  const [showPopupMenu,setShowPopupMenu] =  useState(false);
  const [popupMenuPos,setPopupMenuPos] =  useState({});
  

  const openMenu = (pos) => {
    setShowPopupMenu(true);
    setPopupMenuPos(pos)
  }

  return (
    <div className="home-page__tab-data">
      <div className="home-page__tab-data__section-label">{label}</div>
      <ProjectMenuDialog open={showPopupMenu} setOpen={setShowPopupMenu} pos={popupMenuPos} />
      <div className="home-page__tab-data__new-card-container">
        {projects.map((item, index) => (
          <div key={index} className="home-page__tab-data__content-card">
            <div className="home-page__tab-data__content-card__img">
              <img src={item.image} />
              <div onClick={(e) => openMenu(e)} className="home-page__tab-data__content-card__menu_button">
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
