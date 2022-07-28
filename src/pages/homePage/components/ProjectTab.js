import React, { useState } from "react";
import { AppState } from "../../../AppContext";
import { ProjectMenuDialog } from "../components/dialogs/ProjectMenuDialog";

export const ProjectTab = ({
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
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAZlBMVEUzMzP///8cHBwsLCxqamopKSnS0tLq6ur8/PwmJia0tLT19fUfHx+Li4s4ODgRERGbm5uFhYV6enrFxcViYmKqqqoZGRldXV1vb2/g4OBJSUk3NzdAQEBSUlLw8PDW1tYGBgbBwcE0vFRNAAAB2ElEQVR4nO3ZXW+CMBSA4ZZS145uDhzoVvfh//+TawWNW4DdQeJ5Hy9MiBf1zaFAUAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB3wvxj7fUtzx7Lea9+7SUuzXx86n+0Ye1FLqzbaPcwJyXbr73IhXWVfimsMdZYm7/+MNZX+smuvcplbVOTtGEY772KYz/wTmaT6MvdV3sc/YHUJr7Oe+nbaBSpTVSVkjj9eLnARGWvGYQ2KQ65SBqU7nI01HUYdhehTcKH0y5F2RTDwdBoXRd9FKFNfNicb86a4b/nJClKfyZJbaJiilK9DDfxvnbnU6mPIraJsvvD+5AkNC43SZ/zniK2SVTpRrY/kE4clzeXPCp1IbhJZt59jPGc5Pr4l6LIbRLTraxut+ki/OuR2NXWim2ifJmmo/2ub6ck2RVy58SXVd5FTs7115x+SkQ38a+/puNmTjqpTVKSqSZS5yTsb04YmlyeAd3EoMhtUo4Piegmh2qCOwWhTbw6PsfnUdHIbPK0DUWY9C2vSffg3h7nnLRuhL0etc3k/nrxNfGW436FZjOvXXuFK7ChmCXuFToAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDd+gE3BBvfW5jSuQAAAABJRU5ErkJggg==";

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
      <ProjectMenuDialog
        open={showPopupMenu}
        setOpen={setShowPopupMenu}
        pos={popupMenuPos}
        setPos={setPopupMenuPos}
        setShowDeleteDialog={setShowDeleteDialog}
        setProjectToDelete={setProjectToDelete}
        setShowShareDialog={setShowShareDialog}
        setShowRevokeProjectDialog={setShowRevokeProjectDialog}
      />
      <div className="home-page__tab-data__new-card-container">
        {projects.map((item, index) => (
            <div key={index} className="home-page__tab-data__content-card">
              <div className="home-page__tab-data__content-card__img">
                <img
                  src={
                    item.coverPic === "" ? NO_IMAGE_PLACEHOLDER : item.coverPic
                  }
                />
                <div
                  onClick={(e) => openMenu(e, item)}
                  className="home-page__tab-data__content-card__menu_button"
                >
                  <i className="material-icons">more_vert</i>
                </div>
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
          ))}
      </div>
    </div>
  );
};
