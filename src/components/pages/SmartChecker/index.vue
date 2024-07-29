<template>
	<transition name="glide_up" appear>
		<section v-if="isComponentOpen" class="min-h-screen w-screen bg-white absolute md:p-8 p-4  pb-20 md:pb-32">
			<button class="btn-sm bg-dark text-light rounded-full fixed top-4 right-4 gap-2 text-xl" @click="closeModal">
				<CircleX :size="18" />
				Close
			</button>

			<PagesSmartCheckerStepOne v-if="step === 1" />
			<PagesSmartCheckerStepTwo v-if="step === 2" />
		</section>
	</transition>
</template>

<script setup lang="ts">
import { CircleX } from 'lucide-vue-next'

import { useSmartGoal } from '@/composables/goals/smart'


const { isComponentOpen, step, closeModal } = useSmartGoal()






</script>


