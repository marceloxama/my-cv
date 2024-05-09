import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDXHgpFO9D7jl4yH29DzS3bDfnWr_5gyus",
  authDomain: "cv-api-301d7.firebaseapp.com",
  databaseURL: "https://cv-api-301d7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cv-api-301d7",
  storageBucket: "cv-api-301d7.appspot.com",
  messagingSenderId: "658116914479",
  appId: "1:658116914479:web:e392cf8f9df99080c6c5da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database }