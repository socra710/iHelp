// lib/firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBn9fzevWDYfQYJa5RfHdNz_rxyqxh-v9U',
  authDomain: 'i-help-e0191.firebaseapp.com',
  projectId: 'i-help-e0191',
  storageBucket: 'i-help-e0191.firebasestorage.app',
  messagingSenderId: '1050659074132',
  appId: '1:1050659074132:web:d1c2fcc96687fcc7b23dc1',
  measurementId: 'G-3CHDVJH40B',
};

export const firebaseApp = initializeApp(firebaseConfig);
