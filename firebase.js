import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDbbA0Gki-zzkWArWBImZAujc5ARmFwDh8",
  authDomain: "exptracker-f942e.firebaseapp.com",
  projectId: "exptracker-f942e",
  storageBucket: "exptracker-f942e.firebasestorage.app",
  messagingSenderId: "1013088096925",
  appId: "1:1013088096925:web:0fbf3eabf571bee59e3a74",
  measurementId: "G-1XB3Z46SRT"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth };