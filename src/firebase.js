import firebase from 'firebase'
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyA8PcW0TwhBiadYve44B4iUOkimttjvrVY",
    authDomain: "docabog-b9ec4.firebaseapp.com",
    databaseURL: "https://docabog-b9ec4.firebaseio.com",
    projectId: "docabog-b9ec4",
    storageBucket: "docabog-b9ec4.appspot.com",
    messagingSenderId: "1057550473455",
    appId: "1:1057550473455:web:7974b973105411dca4631a",
    measurementId: "G-4VJQ84FDZD"
};
  
 
firebase.initializeApp(firebaseConfig);
 
export const fire = firebase;