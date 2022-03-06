// import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, remove, onValue, off } from 'firebase/database';

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
    stressLevel: 6,
    job: {
        title: 'SDE',
        company: 'Google'
    },
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

// update(ref(db), {
//     height: 160,
//     weight: 100,
//     age: 20,
//     // location: {
//     //     city: 'California'
//     // }
//     'location/city': 'Califonia'
// })
//     .then(() => {
//         console.log('Data is saved');
//     })
//     .catch((error) => console.log('This failed', error));

// remove(ref(db, 'isSingle'))
//     .then(() => {
//         console.log('Data is removed');
//     })
//     .catch((error) => console.log('This failed', error));

// remove(ref(db))
//     .then(() => {
//         console.log('Data is removed');
//     })
//     .catch((error) => console.log('This failed', error));


// set(ref(db), null)
//     .then(() => {
//         console.log('Data is removed');
//     })
//     .catch((error) => console.log('This failed', error));

onValue(ref(db), (dataSnapshot) => {
    const val = dataSnapshot.val();
    console.log('snap val is->', val);
}, {
    onlyOnce: false
}
);

const cityLocValChange = onValue(ref(db, 'location/city'), (dataSnapshot) => {
    const val = dataSnapshot.val();
    console.log('snap val is->', val);
}, {
    onlyOnce: false
}, (e) => {
    console.log('Error while fetching data', e);
}
);

setTimeout(() => {
    set(ref(db, 'location/city'), 'Jadavpur');
}, 5000);

setTimeout(() => {
    set(ref(db, 'location/city'), 'Jadavpur1');
    //If there is only one subsciption and it needs to be unsubscribed,this works
    // off(ref(db));
    // For multiple-subscription and reverse, below works
    cityLocValChange();
}, 6000);
setTimeout(() => {
    set(ref(db, 'location/city'), 'Jadavpur2');
}, 7000); 