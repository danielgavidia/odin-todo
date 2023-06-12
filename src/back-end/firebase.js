// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyBiRplNlQYd0XaglG9_yQmi57I0gP1GUPk",
     authDomain: "odin-todo-d6efc.firebaseapp.com",
     projectId: "odin-todo-d6efc",
     storageBucket: "odin-todo-d6efc.appspot.com",
     messagingSenderId: "712353189047",
     appId: "1:712353189047:web:8cc135150480b812491132",
     measurementId: "G-VWFYZFSS4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);