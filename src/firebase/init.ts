import { initializeApp, getApps, getApp } from 'firebase/app'

import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { is_dev } from '@/composables/utils/system'


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string
}




export const useFirebase = () => {
    if (getApps().length === 0) {
      return initializeApp(firebaseConfig)
    }
    return getApp()
}

export const useFirestore = (databaseName: string): Firestore => {
  const app = useFirebase()
  return getFirestore(app, databaseName)
}

export const auth = getAuth(useFirebase())
export const defaultDb: Firestore = useFirestore('(default)')
export const db: Firestore = is_dev ? useFirestore('(default)') : useFirestore('goals')
export const storage = getStorage(useFirebase())
export const functions = getFunctions(useFirebase(), 'us-central1')



if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
  connectFirestoreEmulator(defaultDb, 'localhost', 8181)
  connectFirestoreEmulator(db, 'localhost', 8181)
  connectFunctionsEmulator(functions, 'localhost', 5001)
  connectStorageEmulator(storage, 'localhost', 9199)
}



