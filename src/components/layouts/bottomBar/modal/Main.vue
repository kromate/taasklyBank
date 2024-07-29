<template>
	<Modal
		modal="$atts.modal"
		type="bottom_bar"
	>
		<aside class="overflow-y-auto max-h-[70%]">
			<div class="relative h-full flex flex-col gap-2 mb-16">
				<span v-for="menu in dashboardRoutes()" :key="menu.name" class="w-full h-full">


					<nuxt-link

						:to="menu.route"
						class="flex items-center black mbtn"
					>
						<component :is="menu.icon" class="mr-4 w-5" />
						<p class="text-base">
							{{ menu.name }}
						</p>
					</nuxt-link>
				</span>
			</div>
		</aside>
	</Modal>
</template>

<script setup lang="ts">
import SideBarItem from './SideBarItem.vue'
import { dashboardRoutes } from '@/composables/utils/menu/dashboard'
import { modal } from '@/composables/core/modals'
import { closeModalType, closeAllExtremes } from '@/composables/core/modal'

const { stack, close } = modal

watch(() => useRoute().path, () => {
	if (stack.value.includes('BottombarMainBottomMenu')) {
		closeModalType()
		closeModalType()
		close('BottombarMainBottomMenu')
	}
})
</script>

<style scoped lang="scss">

:deep(a, a.mbtn, .mbtn) {
	@apply text-dark w-full h-[51px] px-4 text-base duration-[10ms] rounded
}
a.mbtn, .mbtn {
	@apply text-dark w-full h-[51px] px-4 text-base duration-[10ms] rounded
}
/* exact link will show the dark color for only the exact matching link */
:deep(a.router-link-exact-active.black) {

	color: var(--light);
	background-color: var(--dark);
	font-weight: 500;
	& > svg {
		color: var(--light);
	}
}
.functional_btn{
	@apply text-dark border-dark border
}
</style>
