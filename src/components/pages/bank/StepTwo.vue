<template>
	<section class="bg-light fixed inset-0 z-0 center items-start py-40">
		<section class="border w-full md:max-w-[720px] h-[60vh] overflow-auto">
			<div v-for="(message, index) in conversationHistory" :key="index" class="p-2">
				<p :class="{'text-left': message.role === 'user', 'text-right': message.role === 'model'}">
					{{ message.parts[0].text }}
				</p>
			</div>
		</section>

		<div class="fixed bottom-2.5 inset-x-0 bg-white pt-2.5 px-3 center">
			<form class="relative w-full md:max-w-[720px] flex flex-wrap mt-auto" @submit.prevent="sendMessage">
				<textarea
					ref="textarea"
					v-model="userInput"
					class="input-field !pb-4 !pt-4 pr-36 w-full resize-none overflow-hidden h-auto transition-all duration-300 ease-in-out"
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


const { conversationHistory, userInput, sendMessage } = useChat()
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
