import { useSmartGoal } from './smart'
import { TimeLineObject } from './types'
import { useAlert } from '@/composables/core/notification'



const loading = ref(false)
const steps = ref<TimeLineObject[]>([])



export const useGenerateGoalTimeline = () => {
    const { step } = useSmartGoal()

    const generateGoalTimeline = async (goal) => {
        loading.value = true
        steps.value = []
        step.value = 2

        try {
            const { data, error: fetchError } = await useFetch('/api/gemini/chat', {
                method: 'POST',
                body: JSON.stringify({ prompt: goal, promptType: 'SMART_TIMELINE' })
            }) as { data: Ref<string>, error: any }


            if (fetchError.value) {
                throw new Error(fetchError.value.message || 'An error occurred while fetching data')
            }

            if (data.value === undefined) {
                throw new Error('No response received from the server')
            }


            steps.value = JSON.parse(data.value).steps as TimeLineObject[]
        } catch (e) {
            useAlert().openAlert({ type: 'ERROR', msg: e instanceof Error ? e.message : 'An unexpected error occurred, please try again' })
        } finally {
            loading.value = false
        }
    }


    return {

        generateGoalTimeline,
        loading,
        steps



    }
}
