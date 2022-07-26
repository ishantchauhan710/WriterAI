import React, { useState } from "react";
import { AppState } from "../../../AppContext";
import { ProjectMenuDialog } from "./ProjectMenuDialog";

export const ProjectTab = ({ projects, label }) => {
  // We display this if no cover image of project exists
  const NO_IMAGE_PLACEHOLDER =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUjWAkNYLlQmBpc_dbcX-U_x5mQrZeBtDJYQ&usqp=CAU";

  const { editMode, setEditMode, editProject, setEditProject } = AppState();

  const [showPopupMenu, setShowPopupMenu] = useState(false);
  const [popupMenuPos, setPopupMenuPos] = useState({});

  const openMenu = (pos) => {
    setPopupMenuPos(pos);
    setShowPopupMenu(true);
  };

  const edit = (project) => {
    setEditMode(true);
    setEditProject(project);
  };

  return (
    <div className="home-page__tab-data">
      <div className="home-page__tab-data__section-label">{label}</div>
      <ProjectMenuDialog
        open={showPopupMenu}
        setOpen={setShowPopupMenu}
        pos={popupMenuPos}
        setPos={setPopupMenuPos}
      />
      <div className="home-page__tab-data__new-card-container">
        {projects
          .map((item, index) => (
            <div key={index} className="home-page__tab-data__content-card">
              <div
                className="home-page__tab-data__content-card__img"
              >
                <img
                  src={
                    item.coverPic === "" ? NO_IMAGE_PLACEHOLDER : item.coverPic
                  }
                />
                <div
                  onClick={(e) => openMenu(e)}
                  className="home-page__tab-data__content-card__menu_button"
                >
                  <i className="material-icons">more_vert</i>
                </div>
              </div>
              <div className="home-page__tab-data__content-card__data"
                onClick={() => edit(item)}>
                <div className="home-page__tab-data__content-card__data__title">
                  {item.title}
                </div>
                <div className="home-page__tab-data__content-card__data__description">
                  {item.description}
                </div>
              </div>
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
};
