// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "mern-book-inventory-f0c11.firebaseapp.com",
  projectId: "mern-book-inventory-f0c11",
  storageBucket: "mern-book-inventory-f0c11.firebasestorage.app",
  messagingSenderId: "353894778004",
  appId: "1:353894778004:web:39773ad33de926f76ba081"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;