// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FREBASE_API_KEY,
  authDomain: "coursegenerator-bdf05.firebaseapp.com",
  projectId: "coursegenerator-bdf05",
  storageBucket: "coursegenerator-bdf05.appspot.com",
  messagingSenderId: "445755138547",
  appId: "1:445755138547:web:9f23ccef2d20bfcfaef286"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage=getStorage(app);