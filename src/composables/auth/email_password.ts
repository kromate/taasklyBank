import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { authCredentienalsForm } from './auth'
import { afterAuthCheck } from './utils'
import { useUser } from '@/composables/auth/user'
import { authRef } from '@/firebase/auth'
import { useAlert } from '@/composables/core/notification'
import { firebaseErrorMessage } from '@/firebase/utils'




export const useEmailAndPassword = () => {
    const router = useRouter()

 const signIn = async () => {
    authCredentienalsForm.loading.value = true
    try {
        const userCredential = await signInWithEmailAndPassword(authRef, authCredentienalsForm.email.value, authCredentienalsForm.passord.value)
        await useUser().setUser(userCredential.user)
        await afterAuthCheck(userCredential.user)

        authCredentienalsForm.loading.value = false
    } catch (err: any) {
      authCredentienalsForm.loading.value = false
        useAlert().openAlert({ type: 'ERROR', msg: firebaseErrorMessage(err) })
    }
 }

 const signUp = async () => {
    authCredentienalsForm.loading.value = true
    try {
        const userCredential = await createUserWithEmailAndPassword(authRef, authCredentienalsForm.email.value, authCredentienalsForm.passord.value)

        await useUser().setUser(userCredential.user)
      await afterAuthCheck(userCredential.user)

        authCredentienalsForm.loading.value = false
    } catch (err: any) {
      authCredentienalsForm.loading.value = false

        useAlert().openAlert({ type: 'ERROR', msg: firebaseErrorMessage(err) })
    }
 }


    return { signIn, signUp }
}
