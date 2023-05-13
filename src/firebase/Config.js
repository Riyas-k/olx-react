import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpjVU9ApW4UWD22oQ7y0GTfogMDdsCRQY",
    authDomain: "olx-db11c.firebaseapp.com",
    projectId: "olx-db11c",
    storageBucket: "olx-db11c.appspot.com",
    messagingSenderId: "34264466020",
    appId: "1:34264466020:web:5b83184ad84865f38f9571",
    measurementId: "G-KM5QYMHQLE"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  