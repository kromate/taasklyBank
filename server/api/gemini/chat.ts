import { GoogleGenerativeAI } from '@google/generative-ai'
import { isRateLimited } from './utils/rateLimit'
import { safetySetting } from './utils/safety'
import { generateSystemPrompt } from './utils/system_prompt'
import { getCurrentDateFunctionDeclaration,getUserInfoFunctionDeclaration } from './tools/declaration'
import { getCurrentDateAndTime, getUuserInfo } from './tools/functions'






const functions = {
  getCurrentDateAndTime : getCurrentDateAndTime ,
  getUserInfo: getUuserInfo
} as any

export default defineEventHandler(async (event) => {
  try {
    const ip = event.node.req.headers['x-forwarded-for'] as string || event.node.req.socket.remoteAddress as string


    if (isRateLimited(ip)) {
      throw createError({
        statusCode: 429,
        message: 'Too Many Requests'
      })
    }

    const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY
    if (!GEMINI_API_KEY) {
      throw new Error('Missing GEMINI API key')
    }

    const { prompt, history } = await readBody(event)

    if (!prompt) {
      throw new Error('Missing required parameters: prompt or bank statement')
    }

    const systemInst = await generateSystemPrompt()

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)


    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash-latest',
      systemInstruction: systemInst,
      safetySettings: safetySetting,
      tools: [{
        // codeExecution:{}
        //@ts-ignore
        function_declarations: [
          getCurrentDateFunctionDeclaration, getUserInfoFunctionDeclaration
        ]
      }]
    })



    const chatHistory = history.map((msg:Record<string, any>) => ({
      role: msg.role,
      parts: msg.parts
    }))





    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
            maxOutputTokens: 900000
        }
    })

    const result = await chat.sendMessage(prompt)
    
     let gemini_response = result.response.text()
 
    const functionCalls = result.response.functionCalls()


    if (functionCalls && functionCalls.length > 0) {
      for (const call of functionCalls) {
        if (call.name in functions) {
          const functionResult = await functions[call.name]()
          const followUpResult = await chat.sendMessage([{
            functionResponse: {
              name: call.name,
              response: { result: functionResult }
            }
          }])
          
          gemini_response += '\n\nFunction call result:\n' + followUpResult.response.text()
        }
      }
    }

    return gemini_response
  } catch (error) {
    console.error('Error in Gemini API handler:', error)

    if (error instanceof Error) {
      return createError({
        statusCode: 500,
        message: error.message
      })
    } else {
      return createError({
        statusCode: 500,
        message: 'Internal Server Error'
      })
    }
  }
})
