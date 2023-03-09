// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYB7B8etC-KV4UUsd50-z5ThYcCcR2bgs",
  authDomain: "twitter-777f6.firebaseapp.com",
  projectId: "twitter-777f6",
  storageBucket: "twitter-777f6.appspot.com",
  messagingSenderId: "788639081094",
  appId: "1:788639081094:web:4788a102dd82fb177a2707",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
