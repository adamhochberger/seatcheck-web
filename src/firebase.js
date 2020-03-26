import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBAv5zb_fDUybPRLKcyowULoguB4UdaFWk",
    authDomain: "socialcompass-48759.firebaseapp.com",
    databaseURL: "https://socialcompass-48759.firebaseio.com",
    projectId: "socialcompass-48759",
    storageBucket: "socialcompass-48759.appspot.com",
    messagingSenderId: "507670627313",
    appId: "1:507670627313:web:1d7df53dc3d0b5fa8efa50",
    measurementId: "G-S8CC1TSDF0"
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export const auth = firebase.auth();
export default firebase;
