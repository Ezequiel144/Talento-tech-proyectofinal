/* // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhxVL6fhLPq6wv65oPQuojLjxNfirYW8s",
  authDomain: "no-country-project-images.firebaseapp.com",
  projectId: "no-country-project-images",
  storageBucket: "no-country-project-images.appspot.com",
  messagingSenderId: "441144525390",
  appId: "1:441144525390:web:9d31be588b7c30c104391f",
  measurementId: "G-VWVH6QPJBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */

import "dotenv/config";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
});

export const db = getFirestore(firebaseApp);

export const connectFirebase = async () => {
  const { user } = await signInWithEmailAndPassword(
    getAuth(firebaseApp),
    process.env.FIREBASE_EMAIL,
    process.env.FIREBASE_PASSWORD,
  );
  //console.log("UID autenticado en Firebase:", user.uid);
};
