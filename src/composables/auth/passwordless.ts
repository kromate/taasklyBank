import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, User } from 'firebase/auth'
import { authCredentienalsForm } from './auth'
import { afterAuthCheck } from './utils'
import { useUser } from '@/composables/auth/user'
import { authRef } from '@/firebase/auth'
import { useAlert } from '@/composables/core/notification'




export const usePasswordlessSignin = () => {
	const actionCodeSettings = {
		url: process.client ? `https://${location.host}/auth/authenticate` : '',
		handleCodeInApp: true
	}

	const _email = useCookie('emailForSignIn')

	const disabled = computed(() => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return !emailRegex.test(authCredentienalsForm.email.value) || authCredentienalsForm.passord.value.length < 3
	})

	const valid_email = computed(() => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return !emailRegex.test(authCredentienalsForm.email.value)
	})

	const send_email = async () => {
		authCredentienalsForm.loading.value = true
		try {
			await sendSignInLinkToEmail(authRef, authCredentienalsForm.email.value, actionCodeSettings)

			_email.value = authCredentienalsForm.email.value

			useRouter().push(`/auth/sentEmail/?email=${authCredentienalsForm.email.value}`)
		} catch (e: any) {
			useAlert().openAlert({ type: 'ERROR', msg: e.message })
		}
		authCredentienalsForm.loading.value = false
    }

	const initAuth = () => {
		if (process.client) {
			if (isSignInWithEmailLink(authRef, window.location.href) && _email) useSignInWithEmailLink(_email.value as string)
		}
    }

    const useSignInWithEmailLink = async (email: string) => {
        authCredentienalsForm.loading.value = true
		try {
			const href = process.client ? window.location.href : ''
			const result = await signInWithEmailLink(authRef, email, href)
			_email.value = undefined


            const user = result.user as User as any
            await useUser().setUser(user as User)
			await afterAuthCheck(user)

			authCredentienalsForm.loading.value = false
        } catch (e: any) {
            useAlert().openAlert({ type: 'ERROR', msg: e.message })
        }
    }

	return { disabled, send_email, initAuth, _email, useSignInWithEmailLink, valid_email }
}
