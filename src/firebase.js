import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyBgD72tnULRw1hEBR_poKLDFjJUGuuDXz0",
  authDomain: "voter-528c5.firebaseapp.com",
  databaseURL: "https://voter-528c5.firebaseio.com",
  projectId: "voter-528c5",
  storageBucket: "voter-528c5.appspot.com",
  messagingSenderId: "402359466652",
  appId: "1:402359466652:web:514ed87cdd4b7a6a3f4b59",
  measurementId: "G-7QBCKY17PX"
};

firebase.initializeApp(config);
export default firebase;