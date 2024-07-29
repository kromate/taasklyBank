import { getFirestoreSubCollection } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'





const fetchedIntegrations = ref([] as any[])



export const useFetchIntegrations = () => {
    const { id: user_id } = useUser()
    const loading = ref(false)

    const fetchUserIntegrations = async () => {
        loading.value = true
        fetchedIntegrations.value = []

        try {
            await getFirestoreSubCollection('users', user_id.value!, 'integrations', fetchedIntegrations)


            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    const hasIntegration = (key: string) => {
        return computed(() => fetchedIntegrations.value.some((integration) => integration.id === key))
    }

    return { loading, fetchedIntegrations, fetchUserIntegrations, hasIntegration }
}

