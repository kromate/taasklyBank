<template>
	<div class=" min-h-screen max-w-screen relative isolate bg-[#fff4e0] w-full">
		<BG />
		<section class="flex flex-col ">
			<HeroNav />
			<slot />
		</section>


		<ModalBase />
		<Alert />
	</div>
</template>

<script setup lang="ts">
import HeroNav from '@/components/layouts/HeroNav.vue'

</script>

<style scoped>


</style>
