import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const app = firebase.initializeApp({
    apiKey: "AIzaSyAv6rJc8kE6Oug-co_jRYigm8dEGpRM1Qc",
    authDomain: "catalog-app-5e857.firebaseapp.com",
    databaseURL: "https://catalog-app-5e857-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "catalog-app-5e857",
    storageBucket: "catalog-app-5e857.appspot.com",
    messagingSenderId: "872359217471",
    appId: "1:872359217471:web:ecdf4f2c2683803b6a2b8a"
});

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storageRef = app.storage().ref();
export default app;