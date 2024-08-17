import { useAlert } from '@/composables/core/notification'

const userBankStatements = ref('')
const step = ref(2)
const conversationHistory = ref([] as any)
const ai_loading = ref(false)
const streamingText = ref<string>('')

export const useChat = () => {
  const userInput = ref<string>('')

  const sendMessage = async () => {
    if (!userInput.value.trim()) return

    const sentUserInput = userInput.value.trim()
    userInput.value = ''
    ai_loading.value = true
    streamingText.value = ''


    conversationHistory.value.push({
      role: 'user',
      parts: [{ text: sentUserInput }]
    })

    console.log('The only comment on prod --- left on purpose', {
      prompt: sentUserInput,
      history: conversationHistory.value,
      statement: userBankStatements.value
    })

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: sentUserInput,
          history: conversationHistory.value,
          statement: userBankStatements.value
        })
      })

      if (!response.body) {
        throw new Error('Streamed response is not supported')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let done = false
      let streamedText = ''

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone

        if (value) {
          streamedText += decoder.decode(value, { stream: !done })


          const chunks = streamedText.split('\n')
          for (let i = 0; i < chunks.length - 1; i++) {
            const text = chunks[i]

              if (text) {
                  streamingText.value += text
                }
          }
          streamedText = chunks[chunks.length - 1]
        }
      }


     if (streamingText.value) {
        conversationHistory.value.push({
          role: 'model',
          parts: [{ text: streamingText.value }]
        })
        streamingText.value = ''
      }


      ai_loading.value = false
    } catch (error) {
      ai_loading.value = false
      console.error('Error sending message:', error)
      useAlert().openAlert({ type: 'ERROR', msg: 'Error sending message' })
    }
  }

  return { userInput, conversationHistory, sendMessage, ai_loading, streamingText }
}

export const usePageLogic = () => {
  const proceedToChat = (extractedPDF: string) => {
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
