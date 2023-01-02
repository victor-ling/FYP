// import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDKuFjAZ-EKtmS8MMYZWp3jiWKuTug5__0",
  authDomain: "hello-5eaf4.firebaseapp.com",
  databaseURL: "https://hello-5eaf4.firebaseio.com",
  projectId: "hello-5eaf4",
  storageBucket: "hello-5eaf4.appspot.com",
  messagingSenderId: "576042895289",
  appId: "1:576042895289:web:2becb6b4e2b56bc920d868",
  measurementId: "G-B39NS7F2W5",
};

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
