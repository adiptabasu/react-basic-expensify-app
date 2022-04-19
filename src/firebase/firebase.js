import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set, update, remove, onValue, off, push, onChildRemoved, onChildChanged, onChildAdded, get } from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

// const firebaseConfig = {
//     apiKey: "AIzaSyBUTHZ7Zc_lxGAzZWYCLlXVe72OYpnAYGo",
//     authDomain: "expensify-6eb49.firebaseapp.com",
//     databaseURL: "https://expensify-6eb49-default-rtdb.firebaseio.com",
//     projectId: "expensify-6eb49",
//     storageBucket: "expensify-6eb49.appspot.com",
//     messagingSenderId: "193638487953",
//     appId: "1:193638487953:web:eaf101244a609a9f35ac30",
//     measurementId: "G-VL1Y4F7V2P"
// };

// const firebaseConfig = {
//     apiKey: "AIzaSyDhP7-8pKAjY7_JVqZJK3goPfG-z9-YnWY",
//     authDomain: "expensify-test-e1d4e.firebaseapp.com",
//     databaseURL: "https://expensify-test-e1d4e-default-rtdb.firebaseio.com",
//     projectId: "expensify-test-e1d4e",
//     storageBucket: "expensify-test-e1d4e.appspot.com",
//     messagingSenderId: "807098079091",
//     appId: "1:807098079091:web:7a08ab782314dd29f59706",
//     measurementId: "G-RFGNQZP8ZP"
// };

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

if (getApps().length <= 0) {
    initializeApp(firebaseConfig);
}

const db = getDatabase();

const googleAuthProvider = new GoogleAuthProvider();

export { ref, set, update, remove, onValue, off, push, onChildRemoved, onChildChanged, onChildAdded, get, googleAuthProvider, getAuth, signInWithPopup, db as default };