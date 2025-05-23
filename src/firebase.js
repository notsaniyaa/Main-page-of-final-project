import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDp4X1TcgOFQEPlOvZ9OU9LlE5dwlBCIbQ",
  authDomain: "ice-cream-shop-dccd3.firebaseapp.com",
  projectId: "ice-cream-shop-dccd3",
  storageBucket: "ice-cream-shop-dccd3.appspot.com", 
  messagingSenderId: "463719909968",
  appId: "1:463719909968:web:4c8e615d28e9ee20995f55",
  measurementId: "G-CNTRSK77LC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);