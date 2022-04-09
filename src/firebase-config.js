// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYNsokq9Y210zG0QiqaiMt7fNkxrm6vgc",
  authDomain: "schoolweek.firebaseapp.com",
  projectId: "schoolweek",
  storageBucket: "schoolweek.appspot.com",
  messagingSenderId: "452246359895",
  appId: "1:452246359895:web:edf63ce6abfdd7b737f812",
  measurementId: "G-G08PNENKCP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

const analytics = getAnalytics(app);
