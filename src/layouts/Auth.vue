<template>
	<div class="layout-body bg-[#e0e7ff] isolate">
		<BG />
		<section class="flex min-h-screen h-full w-full container items-center justify-center">
			<slot />
		</section>
	</div>
	<Alert />
	<ModalBase />
</template>

<script setup lang="ts">

</script>

<style scoped>
.display_panel{
	@apply w-5/12 inset-y-0;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}


</style>
