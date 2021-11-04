import { Analytics, getAnalytics } from "firebase/analytics";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import * as firebaseui from "firebaseui";
import React from "react";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk2OQu1D3HFw--6EScs_xVE71IluoK8Aw",
  authDomain: "choreboard-e2e72.firebaseapp.com",
  projectId: "choreboard-e2e72",
  storageBucket: "choreboard-e2e72.appspot.com",
  messagingSenderId: "448488161545",
  appId: "1:448488161545:web:726c2df735773b153113d8",
  measurementId: "G-CFX9D9J6GK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const loginUI = new firebaseui.auth.AuthUI(auth);

interface IFirebaseContext {
  loginUI: firebaseui.auth.AuthUI;
  analytics: Analytics;
  auth: Auth;
}

export const FirebaseContext = React.createContext({} as IFirebaseContext);

export const FirebaseProvider: React.FC = (props) => {
  const value = {
    analytics,
    loginUI,
    auth,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
