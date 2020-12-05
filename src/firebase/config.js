import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "dotenv/config";

const {
  REACT_APP_FIREBASE_KEY,
  REACT_APP_FIREBASE_DOMAIN,
  REACT_APP_FIREBASE_ID,
  REACT_APP_FIREBASE_SENDER_ID,
} = process.env;

var firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: REACT_APP_FIREBASE_DOMAIN,
  projectId: "voting-app-b1e95",
  storageBucket: "voting-app-b1e95.appspot.com",
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firestore = firebase.firestore();

export { storage, firestore };
