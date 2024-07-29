<template>
	<main class=" h-full container   md:py-24 py-10 overflow-hidden">
		<div class="md:max-w-7xl mx-auto w-full overflow-hidden max-w-screen">
			<div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
				<div class="absolute -z-1 -top-[128%] sm:-top-[107%] xl:-top-[73%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1282px] rounded-full md:max-w-[1282px]" />
				<div class="absolute -z-1 -top-[112%] sm:-top-[93%] xl:-top-[62%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1046px] rounded-full md:max-w-[1046px]" />

				<div class="absolute top-0 left-1/2 -translate-x-1/2 -u-z-10">
					<img src="/blur-01.svg" alt="blur" class="max-w-none">
				</div>
			</div>
		</div>

		<div class="mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0 relative z-1 overflow-hidden max-w-screen text-center flex flex-col gap-4 center w-full">
			<h1 class="text-dark mb-6 text-5xl font-extrabold sm:text-7xl max-w-[810px]">
				Achieve Your Goals with Personalized Actionable Steps
			</h1>
			<p class="max-w-[900px] mx-auto mb-9 font-medium md:text-lg">
				Our app provides you with a personalized list of actionable steps and to-dos to help you reach your goals efficiently. Say goodbye to feeling overwhelmed and hello to progress!
			</p>
			<form class="relative w-full md:max-w-[560px] flex flex-wrap" @submit.prevent="checkIfGoalIsSmart">
				<textarea
					ref="textarea"
					v-model="userGoal"
					class="input-field  !pb-4 !pt-4 pr-36 w-full resize-none overflow-hidden h-auto rounded-full transition-all duration-300 ease-in-out"
					placeholder="Enter your goal (e.g., Learn a new language)"
					rows="1"
					@input="adjustTextareaHeight"
					@keydown="handleKeyDown"
				/>

				<button class="btn-sm bg-dark text-light rounded-full absolute bottom-2.5 right-4" type="submit" :disabled="!userGoal">
					Generate
				</button>
			</form>
		</div>
	</main>
</template>

<script lang='ts' setup>
import { useSmartGoal } from '@/composables/goals/smart'

const { checkIfGoalIsSmart, userGoal } = useSmartGoal()

const textarea = ref()

const adjustTextareaHeight = () => {
  if (textarea.value) {
	  textarea.value.style.height = 'auto'
	  textarea.value.style.height = textarea.value.scrollHeight + 'px'
	  if (textarea.value.scrollHeight < 80) {
		  textarea.value.style.borderRadius = '9999999px'
	  } else {
		  textarea.value.style.borderRadius = '0.5rem'
	}
  }
}
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    checkIfGoalIsSmart()
  }
}

onMounted(() => {
  adjustTextareaHeight()
})
</script>

<style scoped>
textarea::placeholder {
  @apply text-[#252525ea] font-semibold text-lg text-nowrap truncate
}
</style>
