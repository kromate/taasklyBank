import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { authCredentienalsForm } from './auth'
import { afterAuthCheck } from './utils'
import { authRef } from '@/firebase/auth'
import { useAlert } from '@/composables/core/notification'
import { firebaseErrorMessage } from '@/firebase/utils'
import { useUser } from '@/composables/auth/user'


declare const window: any


export const usePhoneAuth = () => {
    const router = useRouter()
    const step = ref(1)
    const otp = ref([])
    const confirmationResultRef = ref()
    const init_reCAPTCHA = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            size: 'invisible'
            // callback: (response) => {
            //     signInWIthPhone()
            // }
        }, authRef)
    }

    const signInWIthPhone = async () => {
        authCredentienalsForm.loading.value = true
        try {
            const confirmationResult = await signInWithPhoneNumber(authRef, authCredentienalsForm.phone.value, window.recaptchaVerifier)
            step.value = 2
            authCredentienalsForm.loading.value = false
            confirmationResultRef.value = confirmationResult
        } catch (err: any) {
            authCredentienalsForm.loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: firebaseErrorMessage(err) })
        }
    }

    const confirmOTP = async () => {
        authCredentienalsForm.loading.value = true
        try {
            const otpCode = otp.value.join('')

            const userCredential = await confirmationResultRef.value?.confirm(otpCode)

            await useUser().setUser(userCredential.user)
            await afterAuthCheck(userCredential.user)

            authCredentienalsForm.loading.value = false
        } catch (err: any) {
            authCredentienalsForm.loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: firebaseErrorMessage(err) })
        }
    }

    return { init_reCAPTCHA, signInWIthPhone, step, otp, confirmOTP }
}


