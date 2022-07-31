// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9C0iT3UKw-xStNdTbnkN7WkZ8ID1yjwI",
  authDomain: "bancogemosauth.firebaseapp.com",
  projectId: "bancogemosauth",
  storageBucket: "bancogemosauth.appspot.com",
  messagingSenderId: "433183295046",
  appId: "1:433183295046:web:83a5e8ad190bf100c52c47",
  measurementId: "G-RE2YPYTVJY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);