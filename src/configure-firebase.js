import firebase from 'firebase';
import 'firebase/firestore';

export const AUTH_DOMAIN = 'leprechaun-o-greeny.firebaseapp.com';
export const DB_URL = 'https://leprechaun-o-greeny.firebaseio.com';
export const PROJECT_ID = 'leprechaun-o-greeny';
export const FIREBASE_API_KEY = 'AIzaSyD5kQKEYV3Nf7GjQ9_aa_J2RTxxHs2o3oU';

firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DB_URL,
  projectId: PROJECT_ID,
});

export const db = firebase.firestore();

export const usersRef = db.collection('users');
