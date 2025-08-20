// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjqO1Ple0xCh9b-itwu0PgYRgMB6i6sTU",
  authDomain: "food-goal.firebaseapp.com",
  projectId: "food-goal",
  storageBucket: "food-goal.firebasestorage.app",
  messagingSenderId: "994139286747",
  appId: "1:994139286747:web:52996a85fd1d60a4b770fe",
  measurementId: "G-5BQ7DHVF05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);       // For Authentication
export const db = getFirestore(app);    // For Firestore Database