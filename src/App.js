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

function App() {
  const { loading, showNotification } = AppState();

  return (
    <ThemeProvider theme={writerAiTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      {loading && <Loading />}
      {showNotification && <Notification />}
    </ThemeProvider>
  );
}

export default App;
