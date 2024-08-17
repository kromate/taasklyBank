import { GoogleGenerativeAI } from '@google/generative-ai'
import { isRateLimited } from './utils/rateLimit'
import { safetySetting } from './utils/safety'
import { generateSystemPrompt } from './utils/system_prompt'

const getCurrentDate = async () => {
  const date = new Date();
  return date.toISOString();
}

const getUuserInfo = async () => { 
  console.log('Call to getUuserInfo');
  return { name: 'John Doe', age: 25, occupation: 'Software Engineer' }
}

const getCurrentDateFunctionDeclaration = {
  name: "getCurrentDate",
  description: "Get the current date and time",
  parameters: {
    type: "OBJECT",
    properties: {
      format: {
        type: "STRING",
        description: "The format of the date (ignored in this implementation)",
        enum: ["ISO", "UTC", "local"]
      }
    },
    required: []
  }
}

const getUserInfoFunctionDeclaration = {
  name: "getUserInfo",
  description: "Get the user's information",
  parameters: {
    type: "OBJECT",
    properties: {
      name: {
        type: "STRING",
        description: "The user's name"
      },
    },
    required: []
  }
}

const functions = {
  getCurrentDate: getCurrentDate,
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
      throw new Error('Missing required parameter: prompt')
    }

    const systemInst = await generateSystemPrompt()

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      generationConfig: {
        maxOutputTokens: 900000
      },
      tools: {
        //@ts-ignore
        functionDeclarations: [getCurrentDateFunctionDeclaration, getUserInfoFunctionDeclaration ]
      }
    })

    const chatHistory = history.map((msg: Record<string, any>) => ({
      role: msg.role,
      parts: msg.parts
    }))

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 900000
      }
    })

    // Set up streaming
    setResponseHeaders(event, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    })

    const streamResponse = event.node.res.writeHead(200)

    let fullResponse = ''
    const result = await chat.sendMessageStream(prompt)

    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      fullResponse += chunkText
      streamResponse.write(chunkText)
    }

    // Check for function calls in the full response
    if (fullResponse.includes('function:')) {
      const functionMatch = fullResponse.match(/function:\s*(\w+)/)
      if (functionMatch && functionMatch[1] in functions) {
        const functionName = functionMatch[1]
        const functionResult = functions[functionName]()

        // Send the function result back to Gemini for further processing
        const followUpResult = await chat.sendMessage(`The result of calling ${functionName} is: ${functionResult}. Please provide any necessary follow-up or analysis.`)
        const followUpResponse = followUpResult.response.text()

        streamResponse.write(`data: ${JSON.stringify({ chunk: '\n\nFunction call result:\n' + followUpResponse })}\n\n`)
      }
    }


    streamResponse.end()

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