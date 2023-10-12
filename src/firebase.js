// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHYQdjMBZEAM_BSa5mikx1kZgG0gaiQi8",
  authDomain: "icebreaker-fba9c.firebaseapp.com",
  projectId: "icebreaker-fba9c",
  storageBucket: "icebreaker-fba9c.appspot.com",
  messagingSenderId: "593156300320",
  appId: "1:593156300320:web:e63a05a8ae70e05e0ba645"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);