 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  import firebase from "firebase/app";
  import 'firebase/auth';        // for authentication
  import 'firebase/storage';     // for storage
  import 'firebase/database';    // for realtime database
  import 'firebase/firestore';   // for cloud firestore
  import 'firebase/messaging';   // for cloud messaging
  import 'firebase/functions'; 

  var firebaseConfig = {
    apiKey: "AIzaSyAfPPy299OeaPtdfEntQODjQgEli4XgzZ8",
    authDomain: "netflix-clone-18cfb.firebaseapp.com",
    projectId: "netflix-clone-18cfb",
    storageBucket: "netflix-clone-18cfb.appspot.com",
    messagingSenderId: "1077985679198",
    appId: "1:1077985679198:web:f32def1555bfb7d3e821cf",
    measurementId: "G-HKS37FHL6B"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  // firebase.analytics()

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
//   const storageRef = storage.ref();
  const database = firebase.database();

  export {
    db,
    auth,
    storage,
    database
  }