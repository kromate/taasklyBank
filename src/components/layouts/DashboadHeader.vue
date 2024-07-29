<template>
	<header class=" flex items-center justify-between py-4 md:px-5 px-4 bg-transparent border-b">
		<div class="flex flex-col">
			<h3 class="font-cal max-w-36 sm:max-w-72 md:max-w-80 text-emphasis truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl ">
				{{ headstate.title.value }}
			</h3>
			<span class="hidden text-sm md:block">
				{{ headstate.description.value }}
			</span>
		</div>

		<button v-if="headstate.shouldShowTab.value && headstate.btnText.value" class="btn-primary" :disabled="headstate.loading.value" @click="headstate.btnCall.value">
			<span v-if="!headstate.loading.value">	{{ headstate.btnText.value }}</span>
			<Spinner v-else />
		</button>

		<div v-else class="w-auto md:hidden block">
			<AvatarDropdown />
		</div>
	</header>
</template>

<script setup lang="ts">

import { usePageHeader } from '@/composables/utils/header'

import AvatarDropdown from '@/components/core/AvatarDropdown.vue'

const { headstate } = usePageHeader()


</script>

<style scoped>
.btn-primary{
@apply text-sm px-5 py-3 md:text-base md:px-10
}
</style>
