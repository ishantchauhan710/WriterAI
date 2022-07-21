import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserToken,
  isUserLoggedIn,
  loggedInUserToken,
  logoutUser,
} from "../../firebase/firebase";

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

  const tabButtons = [
    { icon: "note_add", label: "Projects", action: showProjects },
    { icon: "people", label: "Shared", action: showShared },
    { icon: "publish", label: "Published", action: showPublished },
    { icon: "account_circle", label: "Profile", action: showProfile },
  ];

  return (
    <div className="home-page">
      <div className="home-page__tab">
        {tabButtons.map((item) => (
          <div className="home-page__tab-item" onClick={() => item.action()}>
            <div className="home-page__tab-item__image">
              <i class="material-icons home-page__tab-item__image__icon">
                {item.icon}
              </i>
            </div>
            <div className="home-page__tab-item__text">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="home-page__main">
        <div className="home-page__header">WriterAI</div>

        <div className="home-page__tab-data-wrapper">
          {showProjectsTab === true && (
            <div id="tabProjects" className="home-page__tab-data">
              Projects
            </div>
          )}

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
