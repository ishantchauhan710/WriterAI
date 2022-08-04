import React, { useState } from "react";
import { AppState } from "../../../AppContext";
import { ProjectMenuDialog } from "../components/dialogs/ProjectMenuDialog";

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
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR4AAACwCAMAAADudvHOAAAALVBMVEUXFxczMzMYGBgxMTEmJiYpKSkjIyMuLi4UFBQgICAdHR02NjYaGhorKyshISG6et2LAAADYUlEQVR4nO3b4ZKjIBBGUUTUFjDv/7gLtBqjZmp+TVLb98zu1iaSKvMVNoKMcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAT/JO8vwUs/hPn9J3GVN3FD99Pt9l7E6yfPqUvsh8TqfrP31KXyRf0um6ie6jRNOZsvI+1pdpsZtPHI96rTbPw7PmE46NZnFGRrPaO9LBpRbLWqmPbdKUbcQTbypNeh3JJdw0mT50vn9KZLn56o9ToSmN0qWViZsh6a/xjNcyfAqxhjV84Gz/XI0nDc7n8uPbX59vG26HW5PeUjylu/xQZ309dupPk6V4UnB1Hur9S0gtESmuQ7hYi0eWdJw6iJuHGkHX90uIcq5F9uIZahYaQ5Y8vNThfjx/yHI87iUcHaheBzN78SzlXrjFI/EYy246FiBz8fg675rdcwZRLqmhvBW0BJ1uA83Fs78MqfWafvRakMXldUqR4n6BWY1H1lXUVos1De/FDem1/1iNR9d2+pKIxFCO9LN2obmVoX3gtxpPm4AtNZxtKtbe9vo6LduHTMbTFi7SVPpO2MesbcDS8WwtPzbj0WXUModYtnRS2Mvxow3vhuORVoHLDaCmU5dP5+fdYItkrc4m43Fr/3i0sX3Jp6lWrG9r9bEYjz6SGDWlclXJaQrfMunb0ofBeLyuKHt9gLzIdam9HWhrZSbj0d6hg/td07yWJpPx6Lphuefp3n712iBYjaflEvSxV7xbXdVQjMfTnonersa3UBar8bSLK9Tbv/RDPGZ7T4unfPsppeF+v0FnOp5pnTXE+GY3hl59zmg8w7sRfRX3WYXFeNqkM71/cq5TMv2vxXj8XlvuHabsxuKRZno7prttF0u5ad5amomnm4YhFMuhf1y0vtW1diHY2aGxP6jp1udaN9tXDu2ej75MxHPe4V085HqBnXdJlQ8Z2T132R6WHpc2N3vI7jvZf2ic+qqrfzSf4XWhULxeWVuzYjKxda45ZCGu12ttfm542p9bPMf8MnbZuLIu/FZ8h5jr1qc8bo8tDG/8PtriSKlebntBCqTTyOX3cWrZeTdNtUcug1lvZpj6FfFhWmtQ+Xd5nDemmleGpjjW6cOYL7t2sVpzMTqIAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPhj/wCiDBpotpF+QwAAAABJRU5ErkJggg==";

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
        {projects &&
          projects
            .map((item, index) => (
              <div key={index} className="home-page__tab-data__content-card">
                <div className="home-page__tab-data__content-card__img">
                  <img
                    src={
                      item.coverPic === ""
                        ? NO_IMAGE_PLACEHOLDER
                        : item.coverPic
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
