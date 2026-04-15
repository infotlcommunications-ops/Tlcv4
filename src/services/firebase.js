import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCVu52COXOe1ZcoYavUqZVUcTmjAUHdqxk",
  authDomain: "tetelestai-1d097.firebaseapp.com",
  projectId: "tetelestai-1d097",
  storageBucket: "tetelestai-1d097.firebasestorage.app",
  messagingSenderId: "64623199919",
  appId: "1:64623199919:web:4b86b9f8cd0cf78a65765a",
  measurementId: "G-8S83Y9X6KQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
