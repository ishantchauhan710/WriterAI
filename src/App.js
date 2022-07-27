import "./App.css";
import "./pages/landingPage/LandingPage.css";
import "./pages/createPage/CreatePage.css";
import "./pages/homePage/HomePage.css";

import { LandingPage } from "./pages/landingPage/LandingPage";
import { ThemeProvider } from "@mui/material";
import { writerAiTheme } from "./style/style";
import { AppState } from "./AppContext";
import { Loading } from "./components/Loading";
import { Notification } from "./components/Notification";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/homePage/HomePage";
import { CreatePage } from "./pages/createPage/CreatePage";
import { useEffect, useState } from "react";
import { getUserToken } from "./security/firebase";
import axios from "axios";
import { BASE_URL } from "./other/Constants";
import { checkUserValidity } from "./security/security";

function App() {
  const { loading, showNotification } = AppState();
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenValue = localStorage.getItem("userInfo");
    setToken(tokenValue);
    //console.log("Storage Token: ", tokenValue);
  }, []);

  // Refresh Auth Token Every 10 Minutes
  useEffect(() => {
    const interval = setInterval(async () => {
      if (token) {
        const newToken = await getUserToken();
        localStorage.setItem("userInfo", JSON.stringify(newToken));
        setToken(newToken);
        console.log("Token Refreshed", newToken);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    const result = checkUserValidity();
    console.log("Valid Token", result);
  },[]);

  return (
    <ThemeProvider theme={writerAiTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </BrowserRouter>
      {loading && <Loading />}
      {showNotification && <Notification />}
    </ThemeProvider>
  );
}

export default App;
