// import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, remove } from 'firebase/database';

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

const db = getDatabase();

set(ref(db), {
    name: 'Adipta Basu',
    age: 26,
    isSingle: true,
    location: {
        city: 'Kolkata',
        country: 'India'
    }
})
    .then(() => {
        console.log('Data is saved');
    })
    .catch((error) => console.log('This failed', error));

set(ref(db, 'age'), 27);

set(ref(db, 'location/city'), 'Ruby');

update(ref(db), {
    height: 160,
    weight: 100
})
    .then(() => {
        console.log('Data is saved');
    })
    .catch((error) => console.log('This failed', error));

remove(ref(db, 'isSingle'))
    .then(() => {
        console.log('Data is removed');
    })
    .catch((error) => console.log('This failed', error));

remove(ref(db))
    .then(() => {
        console.log('Data is removed');
    })
    .catch((error) => console.log('This failed', error));


set(ref(db), null)
    .then(() => {
        console.log('Data is removed');
    })
    .catch((error) => console.log('This failed', error));