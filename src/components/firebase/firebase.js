import api_keys from '../api_keys';
import firebase from 'firebase/app';
import 'firebase/auth'

// Firebase config
const devConfig = {
    apiKey: api_keys.firebase_key,
    authDomain: "jammin-44395.firebaseapp.com",
    databaseURL: "https://jammin-44395.firebaseio.com",
    projectId: "jammin-44395",
    storageBucket: "jammin-44395.appspot.com",
    messagingSenderId: "422660167348"
};

// Firebase config
const prodConfig = {
    apiKey: "AIzaSyDiRRlR7zGo5lrwTVWcPLnZHR85QXTNbSg",
    authDomain: "jammin-prod.firebaseapp.com",
    databaseURL: "https://jammin-prod.firebaseio.com",
    projectId: "jammin-prod",
    storageBucket: "",
    messagingSenderId: "245460902545"
};

// Use different key depending on evironment (prod or dev)
const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

// Initialize and export Auth
const auth = firebase.auth();

// export {
//     auth
// }