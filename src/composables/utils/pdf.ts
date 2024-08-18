





export const usePDFExtractor = () => {
  const file = ref()
  const extractedText = ref('')
  const isPdfjsLoaded = ref(false)

const loadPdfjs = (): Promise<void> => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js'
    script.onload = () => {
      (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
      isPdfjsLoaded.value = true
      resolve()
    }
    document.head.appendChild(script)
  })
}



const extractText = async (): Promise<void> => {
  if (!file.value || !isPdfjsLoaded.value) return

  const arrayBuffer = await readFileAsArrayBuffer(file.value)
  const typedarray = new Uint8Array(arrayBuffer)

  const pdf = await (window as any).pdfjsLib.getDocument(typedarray).promise

  let fullText = ''

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()
    const pageText = textContent.items.map((item: any) => item.str).join(' ')
    fullText += pageText + '\n\n'
  }

  extractedText.value = fullText
}

// Helper function to read file as ArrayBuffer
const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target?.result as ArrayBuffer)
    reader.onerror = (e) => reject(e)
    reader.readAsArrayBuffer(file)
  })
}


  return { loadPdfjs, extractText, file, extractedText, isPdfjsLoaded }
}
