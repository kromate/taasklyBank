
<template>
	<Modal
		modal="$atts.modal"
		:title="title"
		:auto-close="false"
		:no-close="true"
	>
		<p class="text-dark text-lg tracking-[0.1rem] text-center">
			{{ message }}
		</p>

		<div class="flex items-center gap-10  w-full mt-6">
			<button class="modal-btn hover:bg-transparent" :disabled="true">
				<Spinner class="!border-t-dark !border-[#0c030366]" />
			</button>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useLoadingNotification } from '@/composables/core/verificationLoader'


const { message, title } = useLoadingNotification()


</script>

<style>

</style>
