import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
// @ts-expect-error getReactNativePersistence exists in the react-native build, but firebase's public typings omit it
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

const config = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/** False when .env is empty; the root layout then shows setup instructions instead of crashing. */
export const firebaseConfigured = !!(config.apiKey && config.projectId && config.appId);

const app = firebaseConfigured ? initializeApp(config) : undefined;

// Non-null assertions are safe: auth/db are only touched after the root layout checks firebaseConfigured.
// Native needs AsyncStorage persistence so the anonymous uid survives restarts; web persists by default.
export const auth = (
  app && (Platform.OS === 'web' ? getAuth(app) : initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) }))
)!;
export const db = (app && getFirestore(app))!;
