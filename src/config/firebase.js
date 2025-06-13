import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase yapılandırma bilgilerinizi buraya yazın
const firebaseConfig = {
  apiKey: 'AIzaSyBBYEqhOIK_aeHrUzQ9neeP5Y6nQzcjAa0',
  authDomain: 'react-bootcamp-6.firebaseapp.com',
  projectId: 'react-bootcamp-6',
  storageBucket: 'react-bootcamp-6.firebasestorage.app',
  messagingSenderId: '641288917440',
  appId: '1:641288917440:web:20fb38f31d99cd4c043825',
  measurementId: 'G-HW4PQ3W90L',
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth ve Firestore servislerini dışa aktar
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
