<template>
	<main class="center w-full">
		<PagesBankStepOne v-if="step === 1" />
		<PagesBankStepTwo v-else />
	</main>
</template>

<script setup lang="ts">
import { usePageLogic } from '@/composables/bank/chat'

const { step } = usePageLogic()

definePageMeta({
    layout: 'default-no-footer'
})
</script>

<style scoped>

</style>
