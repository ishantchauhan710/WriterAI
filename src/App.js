import "./App.css";
import "./pages/landingPage/LandingPage.css";
import { LandingPage } from "./pages/landingPage/LandingPage";
import { ThemeProvider } from "@mui/material";
import { writerAiTheme } from "./style/style";
import { AppState } from "./AppContext";
import { Loading } from "./components/Loading";
import { Notification } from "./components/Notification";

function App() {
  const {
    loading,
    showNotification
  } = AppState();

  return (
    <ThemeProvider theme={writerAiTheme}>
      <div className="App">
        <LandingPage />
      </div>
      {loading && <Loading />}
      {showNotification && <Notification />}
    </ThemeProvider>
  );
}

export default App;
