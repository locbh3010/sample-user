import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANo5rlbYd4F-x__LbG1oxmkOwUS0ADi0s",
  authDomain: "sample-669e5.firebaseapp.com",
  databaseURL:
    "https://sample-669e5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sample-669e5",
  storageBucket: "sample-669e5.appspot.com",
  messagingSenderId: "596208108742",
  appId: "1:596208108742:web:025e96eda8ef06898443c7",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
