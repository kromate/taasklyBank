import { GoalEvaluation } from './types'
import { useAlert } from '@/composables/core/notification'

const isComponentOpen = ref(false)
const ex_userGoal = ref('')
const userGoal = ref('')
const gemini_response = ref<GoalEvaluation | Record<string, any>>({})
const loading = ref(false)
const step = ref(1)


export const useSmartGoal = () => {
    const hasUserGoalChanged = computed(() => {
        return ex_userGoal.value !== userGoal.value
    })

    const smartPercentage = computed(() => {
        if (!gemini_response.value) return 0
        return gemini_response.value.is_specific + gemini_response.value.is_measurable + gemini_response.value.is_achievable + gemini_response.value.is_relevant + gemini_response.value.is_time_bound
    })

    const closeModal = () => {
        isComponentOpen.value = false
        userGoal.value = ''
        ex_userGoal.value = ''
        gemini_response.value = {}
        step.value = 1
    }
    const checkIfGoalIsSmart = async () => {
        loading.value = true
        isComponentOpen.value = true
        gemini_response.value = {}

        try {
            const { data, error: fetchError } = await useFetch('/api/gemini/chat', {
                method: 'POST',
                body: JSON.stringify({ prompt: userGoal.value, promptType: 'SMART_CHECKER' })
            }) as { data: Ref<string>, error: any }


            if (fetchError.value) {
                throw new Error(fetchError.value.message || 'An error occurred while fetching data')
            }

            if (data.value === undefined) {
                throw new Error('No response received from the server')
            }

            ex_userGoal.value = userGoal.value
            gemini_response.value = JSON.parse(data.value) as GoalEvaluation
        } catch (e) {
            gemini_response.value!.has_error = true
            gemini_response.value!.error_msg = e instanceof Error ? e.message : 'An unexpected error occurred, please try again'
            useAlert().openAlert({ type: 'ERROR', msg: e instanceof Error ? e.message : 'An unexpected error occurred, please try again' })
        } finally {
            loading.value = false
        }
    }


    return { closeModal, isComponentOpen, userGoal, checkIfGoalIsSmart, loading, gemini_response, hasUserGoalChanged, smartPercentage, step }
}
