import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCact-B_W4NI85WUvEFp_Qs5ga4VKavTk4',
  authDomain: 'robinhood-clone-7eaa5.firebaseapp.com',
  projectId: 'robinhood-clone-7eaa5',
  storageBucket: 'robinhood-clone-7eaa5.appspot.com',
  messagingSenderId: '577853061776',
  appId: '1:577853061776:web:cc7ed73cd0dad796f4b615',
});

export const db = getFirestore()
