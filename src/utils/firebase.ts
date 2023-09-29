// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQMolxmWKKrA-GbRlz-JVllDUQfzDRh8Y",
  authDomain: "foodclient-9f555.firebaseapp.com",
  projectId: "foodclient-9f555",
  storageBucket: "foodclient-9f555.appspot.com",
  messagingSenderId: "529119878631",
  appId: "1:529119878631:web:ae7579fce0286e63b9b142",
  measurementId: "G-JPK6C7Y7B7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestoreDatabase = getFirestore(app)

export default firestoreDatabase;