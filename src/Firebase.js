// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoo7enym69itgIGGomJ2fkYsELjzZIoBk",
  authDomain: "wordleinfinite.firebaseapp.com",
  projectId: "wordleinfinite",
  storageBucket: "wordleinfinite.appspot.com",
  messagingSenderId: "500603253055",
  appId: "1:500603253055:web:c89ab40db874b65bb0638a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
module.exports = {getAuth , signInAnonymously }
