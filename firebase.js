import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAes3VF1E8MNXxhvZOUcNv_eA2gu9dyeP3Y",
  authDomain: "possible-post-298309.firebaseapp.com",
  projectId: "possible-post-298309",
  storageBucket: "possible-post-29830d9.appspot.com",
  messagingSenderId: "503291017399",
  appId: "1:503291017399:web:ac1cbcee7010d2c532c753d2",
};

let app;

if(firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
}else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();

export {db , auth} ;



