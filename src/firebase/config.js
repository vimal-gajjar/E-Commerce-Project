import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkxh1mpcR37CT59VL9MkdY5RySosn1RdA",
  authDomain: "react-training-f2f15.firebaseapp.com",
  projectId: "react-training-f2f15",
  storageBucket: "react-training-f2f15.appspot.com",
  messagingSenderId: "122660105299",
  appId: "1:122660105299:web:2f49774290f73ae8e7aaa6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
export default app;
