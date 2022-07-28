import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function LandingPageDrawer({ openLoginModal, openSignUpModal }) {
  const [state, setState] = React.useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{ height: "100vh" }}
    >
      <div className="landing-page__slider-menu-container">
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#poweredby">Built With</a>
          </li>
          <li>
            <a target="_new" href="https://github.com/ishantchauhan710/WriterAI">Github</a>
          </li>
          <li>
            <a onClick={() => openLoginModal()} href="#">Login</a>
          </li>
          <li>
            <a onClick={() => openSignUpModal()} href="#">Sign Up</a>
          </li>
        </ul>
      </div>
    </Box>
  );

  return (
    <>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <i
            className="material-icons landing-page-header__navbar__logo__drawer-toggle"
            onClick={toggleDrawer(anchor, true)}
          >
            menu
          </i>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
