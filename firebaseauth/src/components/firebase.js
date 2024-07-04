import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCnncBYPCa7T8pHnhXeAcI6-oMUR70Wzv8",
  authDomain: "coolie-9cc38.firebaseapp.com",
  projectId: "coolie-9cc38",
  storageBucket: "coolie-9cc38.appspot.com",
  messagingSenderId: "425618348845",
  appId: "1:425618348845:web:89d981a3f3e3f348f611a4",
  measurementId: "G-X6752VX6L5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
