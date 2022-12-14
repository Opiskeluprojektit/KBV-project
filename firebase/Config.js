import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBlyjlSNNlTwYPYgo-H14Z3Tcji9lgpUTM",
    authDomain: "kbv-project.firebaseapp.com",
    databaseURL: "https://kbv-project-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "kbv-project",
    storageBucket: "kbv-project.appspot.com",
    messagingSenderId: "106294837772",
    appId: "1:106294837772:web:125a2ae6ed87234344e429"
  };

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const TODOS_REF = '/enrolment/';