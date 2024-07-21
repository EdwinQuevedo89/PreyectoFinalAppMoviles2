import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import {ReactNativeAsyncStorage} from '@react-native-async-storage/async-storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiCyecGcVELiJ-ldWJT_IyqZ-gsp_t5IY",
  authDomain: "taller2-corregido.firebaseapp.com",
  projectId: "taller2-corregido",
  storageBucket: "taller2-corregido.appspot.com",
  messagingSenderId: "799843142001",
  appId: "1:799843142001:web:3b68bc74443049b48c4ed0"
};

const firebase = initializeApp(firebaseConfig);

// Obtener referencia a la base de datos
const database = getFirestore(firebase);

// Inicialización de Firebase Authentication con persistencia en React Native
const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { firebase, database, auth };