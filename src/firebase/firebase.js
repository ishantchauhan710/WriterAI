import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { firebaseConfig } from "./firebaseConfig";

// Setup firebase variables using the config file
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Variable to store user details like email and displayName
let user;

// Variable to store the success result of google signin
let googleSignInResult;

// Function to signin with google prompt
const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleProvider)
    .then((result) => {
      user = result.user;
      //console.log("Firebase google");
      googleSignInResult = "TRUE";
    })
    .catch((error) => {
      googleSignInResult = error.message;
    });
};

// Function to signup using firebase email and password auth
const signUpWithEmailAndPassword = async (name, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return "TRUE";
  } catch (e) {
    return e.message;
  }
};

// Function to login using firebase email and password auth
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return "TRUE";
  } catch (e) {
    return e.message;
  }
};

// Function to logout a user
const logoutUser = () => {
  signOut(auth);
  localStorage.setItem("userInfo", null);
};

// Function to get a user's auth token
const getUserToken = async () => {
  const token = await getAuth().currentUser.getIdToken(true);
  return token;
};

// Function to get a user's firebase uid
const getUserId = () => {
  const id = getAuth().currentUser.uid;
  return id;
};

// Function to return the user details
const getUser = () => {
  return user;
};

// Function to return the status of google signin (Success (TRUE) or Fail)
const getGoogleSignInResult = () => {
  return googleSignInResult;
};

// Function to check if a user is logged in or not
const isUserLoggedIn = () => {
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  if (userInfoFromStorage) {
    return true;
  } else {
    return false;
  }
};

export {
  signInWithGoogle,
  signUpWithEmailAndPassword,
  logInWithEmailAndPassword,
  logoutUser,
  getUserToken,
  isUserLoggedIn,
  getUserId,
  getUser,
  getGoogleSignInResult,
};
