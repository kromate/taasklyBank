<template>
	<section class="bg-light fixed inset-0 z-0 center items-start py-32">
		<section class="p-4 w-full md:max-w-[720px] h-[72vh] overflow-auto flex flex-col gap-6 items-start">
			<div v-for="(message, index) in conversationHistory" :key="index" class="flex gap-2 text-[#374151]">
				<div v-if="message.role === 'user' && index !== 0" class="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg border shadow-sm">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class="size-4"><path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z" /></svg>
				</div>
				<div v-else class="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg border shadow-sm">
					<img class="size-6" src="/gemini.png" alt="gemini logo">
				</div>
				<p>
					<!-- <p :class="{'text-left': message.role === 'user', 'text-right': message.role === 'model'}"> -->
					{{ index === 0 ? 'What questions do you need me to answer about your bank statement' : message.parts[0].text }}
				</p>
			</div>


			<div v-if="ai_loading" class="flex gap-2 text-[#374151] w-full">
				<div class="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg border shadow-sm">
					<img class="size-6" src="/gemini.png" alt="gemini logo">
				</div>
				<p class="w-full flex flex-col gap-2">
					Generating response...
					<Skeleton height="14px" width="100%" radius="7px" />
					<Skeleton height="14px" width="70%" radius="7px" />
					<Skeleton height="14px" width="40%" radius="7px" />
				</p>
			</div>
		</section>

		<div class="fixed bottom-2.5 inset-x-0 bg-white pt-2.5 px-3 center">
			<form class="relative w-full md:max-w-[720px] flex flex-wrap mt-auto" @submit.prevent="sendMessage">
				<textarea
					ref="textarea"
					v-model="userInput"
					class="input-field !pb-4 !pt-4 pr-36 w-full resize-none overflow-hidden md:h-auto h-20 transition-all duration-300 ease-in-out"
					placeholder="Enter your goal (e.g., Learn a new language)"
					rows="1"
					@input="adjustTextareaHeight"
					@keydown="handleKeyDown"
				/>

				<button class="btn-sm bg-dark text-light rounded-full absolute bottom-2.5 right-4" type="submit" :disabled="!userInput">
					Generate
				</button>
			</form>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useChat } from '@/composables/bank/chat'


const { conversationHistory, userInput, sendMessage, ai_loading } = useChat()
const textarea = ref()

const adjustTextareaHeight = () => {
	setTimeout(() => {
		if (textarea.value) {
			textarea.value.style.height = 'auto'
			textarea.value.style.height = textarea.value.scrollHeight + 'px'
		}
	}, 100)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
    sendMessage()
  }
}

watch(userInput, () => {
  adjustTextareaHeight()
}, { deep: true })
</script>

<style scoped>

</style>
