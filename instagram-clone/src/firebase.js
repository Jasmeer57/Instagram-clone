
import firebase from "firebase";

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyD9-rcici9J5wpx7uAWtmwq0KhbEd2KZRo",
  authDomain: "instagram-clone-app-reac-29519.firebaseapp.com",
  databaseURL: "https://instagram-clone-app-reac-29519-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-app-reac-29519",
  storageBucket: "instagram-clone-app-reac-29519.appspot.com",
  messagingSenderId: "728168936283",
  appId: "1:728168936283:web:2d324c117e0388a99d207e",
  measurementId: "G-BZD388W8LR"
  });
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db,auth,storage};