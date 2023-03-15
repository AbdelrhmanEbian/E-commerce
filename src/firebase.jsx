import { initializeApp } from "firebase/app";
import {getFirestore} from'firebase/firestore'
import {getStorage} from'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDNo3kkcXydf9Ex94RouMdeAG93F7YN_OA",
  authDomain: "e-commerce-78b0a.firebaseapp.com",
  projectId: "e-commerce-78b0a",
  storageBucket: "e-commerce-78b0a.appspot.com",
  messagingSenderId: "140556045007",
  appId: "1:140556045007:web:8fb30a43786a9372fe85ba",
  measurementId: "G-W4SZYXKF8M"
};

export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)
export const st =getStorage(app)