import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "mindscribe-d7116.firebaseapp.com",
  projectId: "mindscribe-d7116",
  storageBucket: "mindscribe-d7116.firebasestorage.app",
  messagingSenderId: "268740065461",
  appId: "1:268740065461:web:3f9b2a4accd7d91624a6fc",
  measurementId: "G-QE5BXDRT35",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();