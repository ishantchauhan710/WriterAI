import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../firebase/firebase";

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = isUserLoggedIn();
    if (userLoggedIn !== true) {
      navigate("/");
    }
  }, []);

  return <div>HomePage</div>;
};
