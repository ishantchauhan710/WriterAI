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

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userQuery = query(
      collection(db, "users"),
      where("uid", "==", user.uid)
    );
    const docs = await getDocs(userQuery);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
      return "TRUE";
    }
    return "TRUE";
  } catch (e) {
    return e.message;
  }
};

const signUpWithEmailAndPassword = async (name, email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
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
};

let token = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    user.getIdToken(true).then(function(idToken) {
    token = idToken
  }).catch(function(error) {
    console.log("Firebase: Unable togenerate token\n",error.message)
  });
  } else {
    console.log("No user found");
    token = null
  }
});

const getUserToken = () => {
  return token;
}



export {
  signInWithGoogle,
  signUpWithEmailAndPassword,
  logInWithEmailAndPassword,
  logoutUser,
  getUserToken
};
