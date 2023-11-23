// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFSyk62dO8cHzBksqPO22HdhqwrkgNcLQ",
  authDomain: "disneyplus-clone-4ff14.firebaseapp.com",
  projectId: "disneyplus-clone-4ff14",
  storageBucket: "disneyplus-clone-4ff14.appspot.com",
  messagingSenderId: "616479224298",
  appId: "1:616479224298:web:8f1e4bfb34a5d97bb90293",
  measurementId: "G-CSH1R733CF",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const movieRef = collection(db, "movies");
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, googleProvider, storage, movieRef };
export default db;
