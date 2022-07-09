import "./App.css";
import "./pages/landingPage/LandingPage.css";
import { LandingPage } from "./pages/landingPage/LandingPage";
import { ThemeProvider } from "@mui/material";
import { writerAiTheme } from "./style/style";

function App() {
  return (
    <ThemeProvider theme={writerAiTheme}>
      <div className="App">
        <LandingPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
