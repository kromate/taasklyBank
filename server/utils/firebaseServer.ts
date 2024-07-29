import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { configs } from './_keys'







export default function firebaseServer() {
    try {
            if (getApps().length === 0) {
        return initializeApp({
            // @ts-ignore
            credential: cert(configs)
            // databaseURL: 'https://taaskly-dev-default-rtdb.firebaseio.com'
        })
    }
    return getApp()
    } catch (error) {

    }
}
export const useFirestore = (databaseName = '(default)'): Firestore => {
  const app = firebaseServer()!
  return getFirestore(app, databaseName)
}
export const db: Firestore = process.env.NODE_ENV === 'development' ? useFirestore('(default)') : useFirestore('bookings')


