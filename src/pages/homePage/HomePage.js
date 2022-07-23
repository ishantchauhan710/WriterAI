import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormDialog from "../../components/FormDialog";
import {
  getUserToken,
  isUserLoggedIn,
  loggedInUserToken,
  logoutUser,
} from "../../firebase/firebase";
import { ProfileTab } from "./components/ProfileTab";
import { ProjectTab } from "./components/ProjectTab";

export const HomePage = () => {
  const projects = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/07/05/18/10/butterfly-7303688__480.jpg",
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/02/00/04/dog-7236774__340.jpg",
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/07/21/00/chicken-7249273__340.jpg",
    },
    {
      id: 4,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/07/05/18/10/butterfly-7303688__480.jpg",
    },
    {
      id: 5,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/02/00/04/dog-7236774__340.jpg",
    },
    {
      id: 6,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/07/21/00/chicken-7249273__340.jpg",
    },
    {
      id: 7,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/07/05/18/10/butterfly-7303688__480.jpg",
    },
    {
      id: 8,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/02/00/04/dog-7236774__340.jpg",
    },
    {
      id: 9,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/07/21/00/chicken-7249273__340.jpg",
    },
    {
      id: 10,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/07/05/18/10/butterfly-7303688__480.jpg",
    },
    {
      id: 11,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/02/00/04/dog-7236774__340.jpg",
    },
    {
      id: 12,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/07/21/00/chicken-7249273__340.jpg",
    },
  ];

  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  const createNew = () => {
    setShowNewProjectDialog(true);
  };

  const openCreatePage = () => {
    navigate("/create");
  };

  const getUserToken = () => {
    const token = loggedInUserToken;
    setToken(token);
  };

  useEffect(() => {
    const userLoggedIn = isUserLoggedIn();
    if (userLoggedIn !== true) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getUserToken();
  }, []);

  const [showProjectsTab, setShowProjectsTab] = useState(false);
  const [showSharedTab, setShowSharedTab] = useState(false);
  const [showPublishedTab, setShowPublishedTab] = useState(false);
  const [showProfileTab, setShowProfileTab] = useState(false);

  const [activateProjectsTab, setActivateProjectsTab] = useState(false);
  const [activateSharedTab, setActivateSharedTab] = useState(false);
  const [activatePublishedTab, setActivatePublishedTab] = useState(false);
  const [activateProfileTab, setActivateProfileTab] = useState(false);

  const showProjects = () => {
    setShowProjectsTab(true);
    setShowSharedTab(false);
    setShowPublishedTab(false);
    setShowProfileTab(false);
  };

  const showShared = () => {
    setShowProjectsTab(false);
    setShowSharedTab(true);
    setShowPublishedTab(false);
    setShowProfileTab(false);
  };

  const showPublished = () => {
    setShowProjectsTab(false);
    setShowSharedTab(false);
    setShowPublishedTab(true);
    setShowProfileTab(false);
  };

  const showProfile = () => {
    setShowProjectsTab(false);
    setShowSharedTab(false);
    setShowPublishedTab(false);
    setShowProfileTab(true);
  };

  useEffect(() => {
    showProjects();
  }, []);

  return (
    <div className="home-page">
      {showNewProjectDialog === true && (
        <FormDialog
          open={showNewProjectDialog}
          setOpen={setShowNewProjectDialog}
          title="Create Project"
          message="Enter the name of the project you want to create?"
          fieldPlaceholder="Eg. Hashnode Project Blog"
          yesText="Create"
          noText="Cancel"
          yesActionFunction={openCreatePage}
        />
      )}
      <div className="home-page__tab">
        <div
          className={`home-page__tab-item ${
            showProjectsTab === true ? "home-page__tab-item--active" : ""
          }`}
          onClick={() => showProjects()}
        >
          <div className="home-page__tab-item__image">
            <i
              className={`material-icons home-page__tab-item__image__icon ${
                showProjectsTab === true
                  ? "home-page__tab-item__image__icon--active"
                  : ""
              }`}
            >
              note_add
            </i>
          </div>
          <div
            className={`home-page__tab-item__text ${
              showProjectsTab === true
                ? "home-page__tab-item__text--active"
                : ""
            }`}
          >
            Projects
          </div>
        </div>

        <div
          className={`home-page__tab-item ${
            showSharedTab === true ? "home-page__tab-item--active" : ""
          }`}
          onClick={() => showShared()}
        >
          <div className="home-page__tab-item__image">
            <i
              className={`material-icons home-page__tab-item__image__icon ${
                showSharedTab === true
                  ? "home-page__tab-item__image__icon--active"
                  : ""
              }`}
            >
              people
            </i>
          </div>
          <div
            className={`home-page__tab-item__text ${
              showSharedTab === true ? "home-page__tab-item__text--active" : ""
            }`}
          >
            Shared
          </div>
        </div>

        <div
          className={`home-page__tab-item ${
            showPublishedTab === true ? "home-page__tab-item--active" : ""
          }`}
          onClick={() => showPublished()}
        >
          <div className="home-page__tab-item__image">
            <i
              className={`material-icons home-page__tab-item__image__icon ${
                showPublishedTab === true
                  ? "home-page__tab-item__image__icon--active"
                  : ""
              }`}
            >
              publish
            </i>
          </div>
          <div
            className={`home-page__tab-item__text ${
              showPublishedTab === true
                ? "home-page__tab-item__text--active"
                : ""
            }`}
          >
            Published
          </div>
        </div>

        <div
          className={`home-page__tab-item ${
            showProfileTab === true ? "home-page__tab-item--active" : ""
          }`}
          onClick={() => showProfile()}
        >
          <div className="home-page__tab-item__image">
            <i
              className={`material-icons home-page__tab-item__image__icon ${
                showProfileTab === true
                  ? "home-page__tab-item__image__icon--active"
                  : ""
              }`}
            >
              account_circle
            </i>
          </div>
          <div
            className={`home-page__tab-item__text ${
              showProfileTab === true ? "home-page__tab-item__text--active" : ""
            }`}
          >
            Profile
          </div>
        </div>
      </div>

      <div className="home-page__main">
        <div className="home-page__header">
          <div className="home-page__header__logo ">WriterAi</div>

          <div className="home-page__header__buttons">
            {showProfileTab === false && (
              <button onClick={() => createNew()} className="writerai-button">
                Create New
              </button>
            )}
          </div>
        </div>

        <div className="home-page__tab-data-wrapper">
          {showProjectsTab === true && (
            <ProjectTab projects={projects} label="Your Projects" />
          )}

          {showSharedTab === true && (
            <ProjectTab projects={projects} label="Shared" />
          )}

          {showPublishedTab === true && (
            <ProjectTab projects={projects} label="Published By You" />
          )}

          {showProfileTab === true && <ProfileTab logout={logout} />}
        </div>
      </div>
    </div>
  );
};
