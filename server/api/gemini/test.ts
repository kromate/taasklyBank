// server/api/process-pdf.ts

import { GoogleGenerativeAI } from '@google/generative-ai'

const systemPrompt = `
  [
    {
      "posted_date": "extract the posted date of each transaction",
      "description": "extract the description of each transaction",
      "amount": "extract the  amount for each transaction, if any",
      "type": "DEBIT | CREDIT",
      "balance": "extract the balance after each transaction"
    }
  ]
`

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { page } = body

  if (!page || typeof page !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input: page data is required'
    })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error: API key not found'
    })
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { responseMimeType: 'application/json' }
  })

  try {
    const imagePart = {
      inlineData: {
        data: page.split(',')[1], // Remove the "data:image/png;base64," part
        mimeType: 'image/png'
      }
    }

    const prompt = `${systemPrompt}\n\nAnalyze the following image of a bank statement page and extract the transaction data according to the format above. Return the result as a valid JSON response.`

    const result = await model.generateContent([prompt, imagePart])
    const response = await result.response
    const extractedText = response.text()

    return extractedText
  } catch (error) {
    console.error('Error processing PDF page with Gemini:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error processing PDF page'
    })
  }
})
