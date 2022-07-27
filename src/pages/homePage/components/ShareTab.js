import React, { useState } from "react";
import { AppState } from "../../../AppContext";
import { ProjectMenuDialog } from "./ProjectMenuDialog";

export const ShareTab = ({
  projects,
  label,
  setShowDeleteDialog,
  setProjectToDelete,
  setShowShareDialog,
  setProjectToShare,
  setRevokeAccessProject,
  setShowRevokeProjectDialog,
}) => {
  // We display this if no cover image of project exists
  const NO_IMAGE_PLACEHOLDER =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUjWAkNYLlQmBpc_dbcX-U_x5mQrZeBtDJYQ&usqp=CAU";

  const { editMode, setEditMode, editProject, setEditProject } = AppState();

  const [showPopupMenu, setShowPopupMenu] = useState(false);
  const [popupMenuPos, setPopupMenuPos] = useState({});

  const openMenu = (pos, projectItem) => {
    setPopupMenuPos(pos);
    setShowPopupMenu(true);
    setProjectToDelete(projectItem);
    setProjectToShare(projectItem);
    setRevokeAccessProject(projectItem);
  };

  const edit = (project) => {
    setEditMode(true);
    setEditProject(project);
  };

  return (
    <div className="home-page__tab-data">
      <div className="home-page__tab-data__section-label">{label}</div>
      <div className="home-page__tab-data__new-card-container">
        {projects && projects.map((item, index) => (
            <div key={index} className="home-page__tab-data__content-card">
              <div className="home-page__tab-data__content-card__img">
                <img
                  src={
                    item.coverPic === "" ? NO_IMAGE_PLACEHOLDER : item.coverPic
                  }
                />
              </div>
              <div
                className="home-page__tab-data__content-card__data"
                onClick={() => edit(item)}
              >
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
