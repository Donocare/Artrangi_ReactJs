// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD29w4yhl_s8Wu04I2UFwq8BiKPISWKmlk",
  authDomain: "abhijeet-firstproject.firebaseapp.com",
  projectId: "abhijeet-firstproject",
  storageBucket: "abhijeet-firstproject.appspot.com",
  messagingSenderId: "404306893019",
  appId: "1:404306893019:web:63774d92f6b81908e954fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;