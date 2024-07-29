import { watchDebounced } from '@vueuse/core'
import { ProfileType } from '../types/profile'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'
import { callFirebaseFunction } from '@/firebase/functions'



const profileFormState = {
	username: ref(''),
	name: ref(''),
	email: ref(''),
	phone: ref('')

}



export const useCreateProfile = () => {
	const { id, setUserProfile } = useUser()
	const loading = ref(false)
	const phoneNumError = ref()
	watch(profileFormState.phone, (val) => {
		if (val && val.length < 10) {
			phoneNumError.value = 'Invalid Phone Number'
		} else {
			phoneNumError.value = null
		}
	})
	const createProfile = async () => {
		loading.value = true



		try {
			const sent_date = { id: id.value, ...convertObjWithRefToObj(profileFormState), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as ProfileType

			const res = await callFirebaseFunction('createUserProfileForBooking', sent_date) as any
			if (res.success) {
				setUserProfile(sent_date)
				useRouter().push('/booking-types')
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: res.msg })
				loading.value = false
			}
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}

	const initForm = () => {
		profileFormState.phone.value = useUser().user.value?.phoneNumber as string
		profileFormState.email.value = useUser().user.value?.email as string
		profileFormState.name.value = useUser().user.value?.displayName as string
	}
	return {
		createProfile,
		profileFormState,
		loading,
		initForm,
		phoneNumError
	}
}


const createUserProfile = async (sent_data: any) => {
			const { data, error } = await useFetch('/api/createUserProfile', {
    method: 'POST',
    body: sent_data
			}) as any


	return { success: data.value?.success, msg: data.value!.msg }
}


export const useUsername = () => {
	const isUsernameAvailable = ref(true)
	const loading = ref(false)

	const checkUsername = async () => {
		loading.value = true
		profileFormState.username.value = profileFormState.username.value.replace(/ /g, '').toLowerCase()


			const { exists } = await callFirebaseFunction('checkUsernameForBooking', { username: profileFormState.username.value }) as any



		if (exists) {
			isUsernameAvailable.value = false
		} else {
			isUsernameAvailable.value = true
		}
		loading.value = false
	}

	watchDebounced(profileFormState.username, checkUsername, { debounce: 500 })

	return { isUsernameAvailable, checkUsername, loading }
}


