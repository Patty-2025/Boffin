import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, sendEmailVerification, updateProfile, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import firebaseConfig from '../../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const authPersistenceReady = setPersistence(auth, browserSessionPersistence);
export const storage = getStorage(app);
export const realtimeDb = getDatabase(app, firebaseConfig.databaseURL);
export const db = realtimeDb;

export { sendEmailVerification, updateProfile };

export const googleProvider = new GoogleAuthProvider();

export const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

export const appleProvider = new OAuthProvider('apple.com');

export default app;
