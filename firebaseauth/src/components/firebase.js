import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAxRvcsw5l8H8DrJZn6N245EbYfgg6Lowo",
  authDomain: "coolie-38613.firebaseapp.com",
  databaseURL:
    "https://coolie-38613-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coolie-38613",
  storageBucket: "coolie-38613.appspot.com",
  messagingSenderId: "851752918718",
  appId: "1:851752918718:web:33ecc7f382126d989688ef",
  measurementId: "G-5RTZD831FT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
