<template>
	<section class="border border-dark border-dashed bg-light p-4 rounded-md min-w-[445px] center-col gap-4">
		<FileUp :size="80" :stroke-width="0.75" />
		<h1 class="text-2xl font-semibold">
			Upload your bank statement
		</h1>
		<p>Supported formats: PDF</p>
		<input
			id="file"
			type="file"
			accept=".pdf"
			class="hidden"
			:disabled="loading"
			@change="handleFileUpload"
		>
		<label class="btn w-full" for="file">

			{{ fileName ? 'Change File' : 'Upload File' }}
		</label>
		<p v-if="fileName" class="center-col gap-3 mt-12 w-full">
			<span>Selected file: {{ fileName }}</span>
			<button class="btn bg-dark text-light w-full" :disabled="loading" @click="proceedToChat(extractedText)">
				<span v-if="!loading">Process Statement</span>
				<Spinner v-else />
			</button>

			{{ extractedText }}
		</p>
	</section>
</template>

<script setup lang="ts">
import { FileUp } from 'lucide-vue-next'

import { usePDFExtractor } from '@/composables/utils/pdf'
import { usePageLogic } from '@/composables/bank/chat'

const fileName = ref<string>('')
const fileDocument = ref<File | null>(null)
const loading = ref(false)

const { proceedToChat } = usePageLogic()

const { extractText, loadPdfjs, extractedText, file: pdf_file } = usePDFExtractor()




const handleFileUpload = async (event: Event) => {
	loading.value = true
  const target = event.target as HTMLInputElement
  const files = target.files

  if (files && files.length > 0) {
	  const file = files[0]
	pdf_file.value = file
    if (file.type === 'application/pdf') {
      fileName.value = file.name
		fileDocument.value = file
		await extractText()
	  loading.value = false
	} else {
		 loading.value = false
      alert('Please upload a PDF file.')
      target.value = ''
    }
  }
}


onMounted(() => {
	loadPdfjs()
})
</script>

<style scoped>

</style>
