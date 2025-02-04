import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: `${process.env.EXPO_PUBLIC_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${process.env.EXPO_PUBLIC_PROJECT_ID}.firebaseio.com>`,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: `${process.env.EXPO_PUBLIC_PROJECT_ID}.appspot.com`,
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
