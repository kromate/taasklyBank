<template>
	<div>
		<form @submit.prevent="uploadPdf">
			<input ref="pdfFileInput" type="file" accept="application/pdf" @change="handleFileChange">
			<button type="submit" :disabled="!selectedFile">
				Upload PDF
			</button>
		</form>
		<div v-if="logs.length > 0" class="logs">
			<h3>Processing Logs:</h3>
			<ul>
				<li v-for="(log, index) in logs" :key="index">
					{{ log }}
				</li>
			</ul>
		</div>
		<div v-if="error" class="error-message">
			{{ error }}
		</div>
		<div v-if="extractedData.length > 0" class="extracted-data">
			<h3>Extracted Data:</h3>
			<pre>{{ JSON.stringify(extractedData, null, 2) }}</pre>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePDFExtractor } from '@/composables/utils/pdf'

const { loadPdfjs } = usePDFExtractor()

const pdfFileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const error = ref<string | null>(null)
const logs = ref<string[]>([])
const extractedData = ref<any[]>([])

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    selectedFile.value = files[0]
    error.value = null
    logs.value = []
    extractedData.value = []
  }
}

const renderPage = async (pdf: any, pageNum: number, scale: number): Promise<string> => {
  const page = await pdf.getPage(pageNum)
  const viewport = page.getViewport({ scale })
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Unable to get canvas context')
  }

  canvas.height = viewport.height
  canvas.width = viewport.width

  const renderContext = {
    canvasContext: context,
    viewport
  }
  await page.render(renderContext).promise

  return canvas.toDataURL('image/png')
}

const processPage = async (imgData: string, pageNum: number) => {
  logs.value.push(`Processing page ${pageNum}...`)
  try {
    const response = await fetch('/api/gemini/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ page: imgData })
    })

    if (!response.ok) {
      throw new Error(`Failed to process page ${pageNum} on server`)
    }

    const result = await response.json()
    logs.value.push(`Page ${pageNum} processed successfully`)
    return result
  } catch (err) {
    logs.value.push(`Error processing page ${pageNum}: ${err instanceof Error ? err.message : String(err)}`)
    throw err
  }
}

const parseExtractedData = (rawData: string): any => {
  console.log(rawData)
  try {
    return JSON.parse(rawData)
  } catch (err) {
    logs.value.push(`Error parsing JSON: ${err instanceof Error ? err.message : String(err)}`)
    return { rawText: rawData }
  }
}

const uploadPdf = async () => {
  if (!selectedFile.value) return
  error.value = null
  logs.value = []
  extractedData.value = []

  const reader = new FileReader()
  reader.onload = async (e: ProgressEvent<FileReader>) => {
    if (!e.target?.result) {
      error.value = 'Failed to read the file.'
      return
    }

    const typedarray = new Uint8Array(e.target.result as ArrayBuffer)

    try {
      logs.value.push('Loading PDF...')
      const loadingTask = (window as any).pdfjsLib.getDocument(typedarray)
      const pdf = await loadingTask.promise
      logs.value.push('PDF loaded successfully')

      const totalPages = pdf.numPages
      const scale = 2

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        logs.value.push(`Rendering page ${pageNum}...`)
        const imgData = await renderPage(pdf, pageNum, scale)
        logs.value.push(`Page ${pageNum} rendered successfully`)

        const pageData = await processPage(imgData, pageNum)
        const parsedData = parseExtractedData(pageData)
        extractedData.value.push(parsedData)
      }

      logs.value.push('All pages processed successfully')
    } catch (err) {
      console.error('Error processing PDF:', err)
      error.value = `Error processing PDF: ${err instanceof Error ? err.message : String(err)}`
    }
  }

  reader.onerror = (err) => {
    console.error('FileReader error:', err)
    error.value = 'Error reading the file.'
  }

  reader.readAsArrayBuffer(selectedFile.value)
}

onMounted(async () => {
  try {
    await loadPdfjs()
    logs.value.push('PDF.js loaded successfully')
  } catch (err) {
    console.error('Error loading pdf.js:', err)
    error.value = 'Failed to load PDF processing library.'
  }
})
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}

.logs {
  margin-top: 20px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
}

.extracted-data {
  margin-top: 20px;
}

.extracted-data pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
