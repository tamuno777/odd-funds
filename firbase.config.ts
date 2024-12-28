import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: "AIzaSyARMtp0drPS3VeP9GuNA1l_OYGeOiBxsk8",
  authDomain: "odd-fundz.firebaseapp.com",
  projectId: "odd-fundz",
  storageBucket: "odd-fundz.firebasestorage.app",
  messagingSenderId: "443228975199",
  appId: "1:443228975199:web:331c6ce09087742a3c2bea",
  measurementId: "G-15K7B520ND"
};

 
 const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

export { auth };