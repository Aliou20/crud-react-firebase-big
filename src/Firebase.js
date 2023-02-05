import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgj6Aqsvp4oye2JPOR4LRzZPEOnQD6Q70",
  authDomain: "crud-react-firebase-fe02c.firebaseapp.com",
  projectId: "crud-react-firebase-fe02c",
  storageBucket: "crud-react-firebase-fe02c.appspot.com",
  messagingSenderId: "412277930976",
  appId: "1:412277930976:web:9c899c118e9d5dde4c0985"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)