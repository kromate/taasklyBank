<template>
	<div class=" min-h-screen max-w-screen relative isolate bg-[#e0e7ff] w-full">
		<BG />
		<section class="flex flex-col ">
			<HeroNav />
			<slot />
		</section>


		<ModalBase />
		<Alert />
		<div class="flex items-center absolute justify-center gap-5  w-full bottom-4 -z-10">
			<nuxt-link to="/privacy" class="underline">
				Privacy Policy
			</nuxt-link>
			<nuxt-link to="/terms" class="underline">
				Terms of Service
			</nuxt-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import HeroNav from '@/components/layouts/HeroNav.vue'

</script>

<style scoped>


</style>
