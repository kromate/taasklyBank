import { useAlert } from '@/composables/core/notification'

const userBankStatements = ref('')
const step = ref(1)
const conversationHistory = ref([] as any[])
const ai_loading = ref(false)

export const useChat = () => {
const userInput = ref('')


 const sendMessage = async () => {
     if (!userInput.value) return
     const sent_user_input = userInput.value
    userInput.value = ''
    ai_loading.value = true

    // Add the user message to the conversation history
    conversationHistory.value.push({
      role: 'user',
      parts: [{ text: sent_user_input }]

    })

    try {
      const { data, error } = await useFetch('/api/gemini/chat', {
        method: 'POST',
        body: JSON.stringify({ prompt: sent_user_input, history: conversationHistory.value, statement: userBankStatements.value })
      })
ai_loading.value = false

      if (error.value) {
        throw new Error(error.value.message)
      }
      conversationHistory.value.push({
        role: 'model',
        parts: [{ text: data.value }]
      })
    } catch (error) {
      ai_loading.value = false
        console.error('Error sending message:', error)
        useAlert().openAlert({ type: 'ERROR', msg: 'Error sending message' })
    }
 }

    return { userInput, conversationHistory, sendMessage, ai_loading }
}


export const usePageLogic = () => {
    const proceedToChat = (extractedPDF:string) => {
      userBankStatements.value = extractedPDF
         if (!conversationHistory.value.length) {
    conversationHistory.value.push({
      role: 'user',
      parts: [{ text: `Here is my bank statement: ${userBankStatements.value}` }]
    })
   }

        step.value = 2
    }

    return { proceedToChat, step }
}
