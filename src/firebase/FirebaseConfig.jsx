// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAptp-mAm_wxSlj0wdVH0A3MEtF4fNc9Bk",
  authDomain: "artrangi-db.firebaseapp.com",
  projectId: "artrangi-db",
  storageBucket: "artrangi-db.firebasestorage.app",
  messagingSenderId: "269629203504",
  appId: "1:269629203504:web:c573fe8e07924e739f79f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;