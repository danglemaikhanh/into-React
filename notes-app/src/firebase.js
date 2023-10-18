// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJoob96rOhkc0aEnmrj4XDeBl5Z3I-UnE",
  authDomain: "react-note-6ce4b.firebaseapp.com",
  projectId: "react-note-6ce4b",
  storageBucket: "react-note-6ce4b.appspot.com",
  messagingSenderId: "1029982053668",
  appId: "1:1029982053668:web:f2f2e72b83197b95d7ffb1",
  measurementId: "G-19Z1W5CZKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const notesRef = collection(db, "notes")