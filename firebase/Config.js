import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBf-mOUWd6w61FzOJKnMgGZ2G18lNnpNlM",
  authDomain: "kbv-project-e233a.firebaseapp.com",
  databaseURL: "https://kbv-project-e233a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kbv-project-e233a",
  storageBucket: "kbv-project-e233a.appspot.com",
  messagingSenderId: "468583703273",
  appId: "1:468583703273:web:f001061f66f6741b8e4678"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const enrolment_ref = '/enrolment/';
export const EVENT_REF = '/game/';