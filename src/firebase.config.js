import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC7cKViJgspnDCfuXl4KlnewcV_jxjI4bc',
  authDomain: 'house-marketplace-app-11ddd.firebaseapp.com',
  projectId: 'house-marketplace-app-11ddd',
  storageBucket: 'house-marketplace-app-11ddd.appspot.com',
  messagingSenderId: '211404284443',
  appId: '1:211404284443:web:87b74815ad763409204ebe',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
