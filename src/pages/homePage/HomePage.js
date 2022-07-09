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

  return (
    <div>
      Token: {token} <br />
      <br />
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};
