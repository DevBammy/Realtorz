import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APP,
  authDomain: 'realtorz-web-app.firebaseapp.com',
  projectId: 'realtorz-web-app',
  storageBucket: 'realtorz-web-app.appspot.com',
  messagingSenderId: '985157536406',
  appId: '1:985157536406:web:c978b7648170e8c20150b7',
};

export const app = initializeApp(firebaseConfig);
