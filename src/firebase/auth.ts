import {
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	signOut,
	setPersistence,
	browserLocalPersistence,
	User
} from 'firebase/auth'
import { auth } from './init'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'

const { openAlert } = useAlert()

export const watchUserStateChange = () => {
	if (typeof window !== 'undefined') {
		onAuthStateChanged(auth, async (user) => {
			const { clearUser, setUser } = useUser()
			if (user) await setUser(user)
			else await clearUser()
		})
	}
}

export const authRef = auth
const provider = new GoogleAuthProvider()

export const googleAuth = async () => {
	try {
		await setPersistence(auth, browserLocalPersistence)
		const result = await signInWithPopup(auth, provider)
		return result.user as User
	} catch (err: any) {
		openAlert({ type: 'ERROR', msg: `Error: ${err.message}` })
	}
}

export const signOutUser = async () => {
	const { clearUser } = useUser()
	try {
		await signOut(auth)
		await clearUser()
	} catch (error: any) {
		openAlert({ type: 'ERROR', msg: `Oops, something went wrong 😕 : ${error.message}` })
	}
}


