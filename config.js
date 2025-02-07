import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyD6mXxi7g-AEJGrWssUjdbW1mkqznULi_M",
    authDomain: 'myprg-cc3e8.firebaseapp.com',
    projectId: "myprg-cc3e8",
    storageBucket: "myprg-cc3e8.appspot.com",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
