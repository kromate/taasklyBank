<template>
	<div>
		<form @submit.prevent="uploadPdf">
			<input ref="pdfFileInput" type="file" accept="application/pdf" @change="handleFileChange">
			<button type="submit" :disabled="!selectedFile">
				Upload PDF
			</button>
		</form>
		<div v-if="isLoading" class="loading">
			Loading PDF pages...
		</div>
		<div v-if="error" class="error-message">
			{{ error }}
		</div>
		<div v-if="pdfImages.length > 0" class="pdf-preview">
			<h3>PDF Preview:</h3>
			<div v-for="(image, index) in pdfImages" :key="index" class="pdf-page">
				<h4>Page {{ index + 1 }}</h4>
				<img :src="image" :alt="`PDF Page ${index + 1}`">
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePDFExtractor } from '@/composables/utils/pdf'

const { loadPdfjs } = usePDFExtractor()

const pdfFileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const pdfImages = ref<string[]>([])
const error = ref<string | null>(null)
const isLoading = ref(false)

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    selectedFile.value = files[0]
    error.value = null
    pdfImages.value = []
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

  // Set canvas dimensions to match the viewport
  canvas.height = viewport.height
  canvas.width = viewport.width

  // Render PDF page into canvas context
  const renderContext = {
    canvasContext: context,
    viewport
  }
  await page.render(renderContext).promise

  return canvas.toDataURL('image/png')
}

const uploadPdf = async () => {
  if (!selectedFile.value) return
  error.value = null
  pdfImages.value = []
  isLoading.value = true

  const reader = new FileReader()
  reader.onload = async (e: ProgressEvent<FileReader>) => {
    if (!e.target?.result) {
      error.value = 'Failed to read the file.'
      isLoading.value = false
      return
    }

    const typedarray = new Uint8Array(e.target.result as ArrayBuffer)

    try {
    //   console.log('Loading PDF...')
      const loadingTask = (window as any).pdfjsLib.getDocument(typedarray)
      const pdf = await loadingTask.promise
    //   console.log('PDF loaded successfully')

      const totalPages = pdf.numPages
      const scale = 4 // Increase scale for better quality

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        // console.log(`Rendering page ${pageNum}...`)
        const imgData = await renderPage(pdf, pageNum, scale)
        pdfImages.value.push(imgData)
        // console.log(`Page ${pageNum} rendered successfully`)
      }

    //   console.log('All pages rendered successfully')
    } catch (err) {
      console.error('Error processing PDF:', err)
      error.value = `Error processing PDF: ${err instanceof Error ? err.message : String(err)}`
    } finally {
      isLoading.value = false
    }
  }

  reader.onerror = (err) => {
    console.error('FileReader error:', err)
    error.value = 'Error reading the file.'
    isLoading.value = false
  }

  reader.readAsArrayBuffer(selectedFile.value)
}

onMounted(async () => {
  try {
    await loadPdfjs()
    // console.log('pdf.js loaded successfully')
  } catch (err) {
    console.error('Error loading pdf.js:', err)
    error.value = 'Failed to load PDF processing library.'
  }
})
</script>

<style scoped>
.pdf-preview {
  margin-top: 20px;
}

.pdf-page {
  margin-bottom: 20px;
}

.pdf-page img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.loading {
  margin-top: 10px;
  font-style: italic;
}
</style>
