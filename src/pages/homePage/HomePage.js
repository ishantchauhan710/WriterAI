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

  const tabButtons = [
    { icon: "note_add", label: "Projects", action: "" },
    { icon: "people", label: "Shared", action: "" },
    { icon: "publish", label: "Published", action: "" },
    { icon: "account_circle", label: "Profile", action: "" },
  ];

  return (
    <div className="home-page">
      <div className="home-page__tab">
        {tabButtons.map((item) => (
          <div className="home-page__tab-item">
            <div className="home-page__tab-item__image">
              <i class="material-icons home-page__tab-item__image__icon">{item.icon}</i>
            </div>
            <div className="home-page__tab-item__text">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="home-page__main">
        <div className="home-page__header">Header</div>
        <div className="home-page__tab-data">Tab Data</div>
      </div>
    </div>
  );
};
