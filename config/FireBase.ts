// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASKvidXVbNU12uROL3VCh2suw5VfXrU9A",
  authDomain: "barber-io-e3ccd.firebaseapp.com",
  projectId: "barber-io-e3ccd",
  storageBucket: "barber-io-e3ccd.appspot.com",
  messagingSenderId: "812108379712",
  appId: "1:812108379712:web:8a15f1037e8df7786d91a5",
  measurementId: "G-ZEBNMZQM4T"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);