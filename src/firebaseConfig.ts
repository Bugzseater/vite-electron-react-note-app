import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyCdod6WPjXNkLOO0jtJc4_oqf9cOjV_i4E",
    authDomain: "electron-notes-63b66.firebaseapp.com",
    projectId: "electron-notes-63b66",
    storageBucket: "electron-notes-63b66.appspot.com",
    messagingSenderId: "511549061735",
    appId: "1:511549061735:web:e3965ae0e1c6da4b27b2c2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
