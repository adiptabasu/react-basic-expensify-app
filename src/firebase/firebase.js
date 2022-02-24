// import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBUTHZ7Zc_lxGAzZWYCLlXVe72OYpnAYGo",
    authDomain: "expensify-6eb49.firebaseapp.com",
    databaseURL: "https://expensify-6eb49-default-rtdb.firebaseio.com",
    projectId: "expensify-6eb49",
    storageBucket: "expensify-6eb49.appspot.com",
    messagingSenderId: "193638487953",
    appId: "1:193638487953:web:eaf101244a609a9f35ac30",
    measurementId: "G-VL1Y4F7V2P"
};

initializeApp(firebaseConfig);

set(ref(getDatabase()), {
    name: 'Aritra Basu'
});