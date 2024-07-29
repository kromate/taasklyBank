<template>
	<section class=" flex flex-col items-center gap-4">
		<div class="flex gap-4 items-center justify-center flex-wrap mt-16 mb-10">
			<h1 class="outline text-4xl text-center font-black sm:text-5xl md:text-4xl lg:text-6xl xl:text-7xl tracking-normal text-dark poppins w-full center">
				Generating Actionable Steps
			</h1>
		</div>




		<transition name="show" appear>
			<div v-if="steps.length && !loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-x-4 gap-y-6 mw-full border border-line mx-auto p-4 px-4 shadow-md rounded-lg">
				<div v-for="(step, idx) in steps" :key="step.title" class="field h-full">
					<label class="btn px-3 py-0.5 bg-dark text-light mb-2.5">Steps {{ idx + 1 }}:</label>
					<div class="card_ans h-full justify-between flex flex-col gap-2">
						<h1 class="font-semibold  underline">
							{{ step.title }}
						</h1>
						<p class="mb-5">
							{{ step.description }}
						</p>
						<footer class=" italic mt-auto">
							<b>Frequency:</b> {{ transformString(step.frequency) }}
						</footer>
					</div>
				</div>
			</div>
		</transition>
		<div v-if="loading" class="flex px-4 w-full">
			<Skeleton radius="12px" height="280px" width="700px" class=" mx-auto px-4 max-w-[90%]" />
		</div>
	</section>
</template>

<script setup lang="ts">

import { useGenerateGoalTimeline } from '@/composables/goals/timeline'
import { transformString } from '@/composables/utils/formatter'

const { generateGoalTimeline, steps, loading } = useGenerateGoalTimeline()



</script>

<style scoped>
textarea::placeholder {
  @apply text-[#252525ea] font-semibold text-lg text-nowrap truncate
}
.outline {
	line-height: 1.2;
	text-decoration: none;
	color: transparent;
	-webkit-text-stroke: 1.5px #000;
}

li::first-letter {
  font-size: 1.25em;  /* Adjust font size as desired */
  font-weight: bold;
  color: #845bd8

}

.card_ans{
@apply p-4 border border-line w-full rounded-md
}
.card_ans_sm{
@apply px-2 py-1.5 border border-line w-auto rounded-md
}

.show-enter-active {
  transition: all 0.3s ease-out;
}

.show-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.show-leave-active {
  transition: all 0.3s ease-in;
}

.show-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
