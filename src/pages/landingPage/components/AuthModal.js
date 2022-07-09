import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import GoogleButton from "react-google-button";
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  signUpWithEmailAndPassword,
} from "../../../firebase/firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
};

export default function AuthModal({
  openAuthModal,
  setOpenAuthModal,
  authTab,
  setAuthTab,
}) {
  const [signupUserName, setSignupUserName] = React.useState("");
  const [signupUserEmail, setSignupUserEmail] = React.useState("");
  const [signupUserPassword, setSignupUserPassword] = React.useState("");

  const [loginUserEmail, setLoginUserEmail] = React.useState("");
  const [loginUserPassword, setLoginUserPassword] = React.useState("");

  const signUpUserWithEmailAndPassword = () => {
    if (!signupUserName) {
      console.log("Username cannot be blank");
    } else if (!signupUserEmail) {
      console.log("User Email cannot be blank");
    } else if (!signupUserPassword) {
      console.log("User Password cannot be blank");
    } else {
      signUpWithEmailAndPassword(
        signupUserName,
        signupUserEmail,
        signupUserPassword
      );
    }
  };

  const loginUserWithEmailAndPassword = () => {
    if (!loginUserEmail) {
      console.log("User Email cannot be blank");
    } else if (!loginUserPassword) {
      console.log("User Password cannot be blank");
    } else {
      logInWithEmailAndPassword(loginUserEmail, loginUserPassword);
    }
  };

  const signInUserWithGoogle = () => {
    signInWithGoogle();
  };

  const handleChange = (event, newValue) => {
    setAuthTab(newValue);
  };

  const handleClose = () => setOpenAuthModal(false);

  return (
    <div>
      <Modal open={openAuthModal} onClose={handleClose}>
        <Box className="auth-modal" sx={style}>
          <TabContext value={authTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                variant="fullWidth"
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab style={{ fontWeight: 600 }} label="Login" value="1" />
                <Tab style={{ fontWeight: 600 }} label="Sign Up" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <TextField
                id="loginEmail"
                label="Email"
                variant="outlined"
                fullWidth
                style={{ marginTop: 15 }}
                onChange={(e) => setLoginUserEmail(e.target.value)}
              />

              <TextField
                id="loginPassword"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                style={{ marginTop: 15 }}
                onChange={(e) => setLoginUserPassword(e.target.value)}
              />

              <button
                onClick={() => loginUserWithEmailAndPassword()}
                class="writerai-button auth-modal__button"
              >
                Login
              </button>

              <GoogleButton
                label="Login with Google"
                style={{
                  margin: "10px auto",
                  width: "100%",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                }}
                onClick={() => signInUserWithGoogle()}
              />
            </TabPanel>

            <TabPanel value="2">
              <TextField
                id="signupFullName"
                label="Full Name"
                variant="outlined"
                fullWidth
                onChange={(e) => setSignupUserName(e.target.value)}
              />

              <TextField
                id="signupEmail"
                label="Email"
                variant="outlined"
                fullWidth
                style={{ marginTop: 15 }}
                onChange={(e) => setSignupUserEmail(e.target.value)}
              />

              <TextField
                id="signupPassword"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                style={{ marginTop: 15 }}
                onChange={(e) => setSignupUserPassword(e.target.value)}
              />

              <button
                onClick={() => signUpUserWithEmailAndPassword()}
                class="writerai-button auth-modal__button"
              >
                Sign up
              </button>

              <GoogleButton
                label="Sign up with Google"
                style={{
                  margin: "10px auto",
                  width: "100%",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                }}
                onClick={() => signInUserWithGoogle()}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
}
