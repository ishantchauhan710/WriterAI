import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import PermContactCalendarRoundedIcon from "@mui/icons-material/PermContactCalendarRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";

export default function LandingPageDrawer({openLoginModal, openSignUpModal}) {
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
      style={{ backgroundColor: "#0f1621", color: "#ffffff", height: "100vh" }}
    >
      <List>
        <ListItem key="Home" disablePadding>
          <ListItemButton>
            <ListItemIcon style={{color:"#eeeeee"}}>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem key="About" disablePadding>
          <ListItemButton>
            <ListItemIcon style={{color:"#eeeeee"}}>
              <InfoRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Contact" disablePadding>
          <ListItemButton>
            <ListItemIcon style={{color:"#eeeeee"}}>
              <PermContactCalendarRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </ListItem>

        <ListItem key="SourceCode" disablePadding>
          <ListItemButton>
            <ListItemIcon style={{color:"#eeeeee"}}>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary="Source Code" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider color="#999999" />
      <List>
        <ListItem onClick={() => openLoginModal()} key="Login" disablePadding>
          <ListItemButton>
            <ListItemIcon style={{color:"#eeeeee"}}>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>

        <ListItem onClick={() => openSignUpModal()} key="SignUp" disablePadding>
          <ListItemButton>
            <ListItemIcon style={{color:"#eeeeee"}}>
              <HowToRegIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Up" />
          </ListItemButton>
        </ListItem>
      </List>
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
