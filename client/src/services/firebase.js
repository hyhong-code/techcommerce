import firebase from "firebase/app";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJu_7FBd7l864mUEqYPgrhJR-WEgOnrGA",
  authDomain: "commerce-a7802.firebaseapp.com",
  databaseURL: "https://commerce-a7802.firebaseio.com",
  projectId: "commerce-a7802",
  storageBucket: "commerce-a7802.appspot.com",
  messagingSenderId: "304440584401",
  appId: "1:304440584401:web:cc7a0ddd931c0a3bd77df0",
  measurementId: "G-7GSEJ8W37V",
};

// Init
firebase.initializeApp(firebaseConfig);

// Exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
