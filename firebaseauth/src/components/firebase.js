import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBYXJ5jI1AwToNq4YaqJx5xrC1iQ-YR-uo",
  authDomain: "coolie-9cf4f.firebaseapp.com",
  projectId: "coolie-9cf4f",
  storageBucket: "coolie-9cf4f.appspot.com",
  messagingSenderId: "221342155571",
  appId: "1:221342155571:web:aea14e8682c3057c5bb446",
  measurementId: "G-92CSDLN4PJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
