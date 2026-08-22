// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLTquYRsoGVvgvjiPLA_L-P_tytYrM17g",
  authDomain: "mariaarticulos.firebaseapp.com",
  projectId: "mariaarticulos",
  storageBucket: "mariaarticulos.firebasestorage.app",
  messagingSenderId: "345030642072",
  appId: "1:345030642072:web:867f31a647fdfce559c3ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;