import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserToken,
  isUserLoggedIn,
  loggedInUserToken,
  logoutUser,
} from "../../firebase/firebase";
import { ProjectTab } from "./components/ProjectTab";

export const HomePage = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  const logout = () => {
    logoutUser();
    navigate("/");
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
          <div className="home-page__header__logo ">
            WriterAi
          </div>

          <div className="home-page__header__buttons">
            <button className="writerai-button">Create New</button>
          </div>
        </div>

        <div className="home-page__tab-data-wrapper">
          {showProjectsTab === true && <ProjectTab />}

          {showSharedTab === true && (
            <div id="tabShared" className="home-page__tab-data">
              Shared
            </div>
          )}

          {showPublishedTab === true && (
            <div id="tabPublished" className="home-page__tab-data">
              Published
            </div>
          )}

          {showProfileTab === true && (
            <div id="tabProfile" className="home-page__tab-data">
              Profile
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
