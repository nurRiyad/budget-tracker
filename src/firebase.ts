// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9YEVD9adatQRe061Zvy6Mox14sb-SrY4",
  authDomain: "personal-project-4ac6f.firebaseapp.com",
  projectId: "personal-project-4ac6f",
  storageBucket: "personal-project-4ac6f.firebasestorage.app",
  messagingSenderId: "337096134393",
  appId: "1:337096134393:web:8bfac45c37533c81839c28"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);