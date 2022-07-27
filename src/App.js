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
  const { loading, showNotification, notify } = AppState();
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenValue = localStorage.getItem("userInfo");
    setToken(JSON.parse(tokenValue));
    //console.log("Storage Token: ", tokenValue);
  }, []);

  // Refresh Auth Token Every 30 Minutes
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

  const [shouldLogout, setShouldLogout] = useState(false);

  // Check for token validity every 5 minutes
  useEffect(() => {
    const interval = setInterval(async () => {
      if (token) {
        const result = await checkUserValidity(token);
        console.log(result);
        if (result === false) {
          notify("You have been logged out due to token expiration", "error");
          setShouldLogout(true);
        }
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [token]);

  // Also check for token validity on first run
  useEffect(() => {
    if (token) {
      checkUserValidity(token).then((result) => {
        console.log(result);
        if (result === false) {
          notify("You have been logged out due to token expiration", "error");
          setShouldLogout(true);
        }
      });
    }
  }, [token]);

  return (
    <ThemeProvider theme={writerAiTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <HomePage
                shouldLogout={shouldLogout}
                setShouldLogout={setShouldLogout}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/create"
            element={
              <CreatePage
                shouldLogout={shouldLogout}
                setShouldLogout={setShouldLogout}
                token={token}
                setToken={setToken}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      {loading && <Loading />}
      {showNotification && <Notification />}
    </ThemeProvider>
  );
}

export default App;
