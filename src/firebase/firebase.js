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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

let user;
let googleSignInResult;

let getGoogleSignInResult = () => {
  return googleSignInResult;
};

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

const signUpWithEmailAndPassword = async (name, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return "TRUE";
  } catch (e) {
    return e.message;
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return "TRUE";
  } catch (e) {
    return e.message;
  }
};

const logoutUser = () => {
  signOut(auth);
  localStorage.setItem("userInfo", null);
};

const getUserToken = async () => {
  const token = await getAuth().currentUser.getIdToken(true);
  return token;
};

const getUserId = () => {
  const id = getAuth().currentUser.uid;
  return id;
};

const getUser = () => {
  return user;
};

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

const loggedInUserToken = () => {
  const userToken = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  return userToken;
};

export {
  signInWithGoogle,
  signUpWithEmailAndPassword,
  logInWithEmailAndPassword,
  logoutUser,
  getUserToken,
  isUserLoggedIn,
  loggedInUserToken,
  getUserId,
  getUser,
  getGoogleSignInResult,
};
