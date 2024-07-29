<template>
	<aside
		class="hidden md:flex min-h-screen flex-col justify-between max-w-[15rem] bg-transparent  fixed inset-y-0 z-50 w-[20%]  md:w-14 lg:w-[20%] "
	>
		<div class="h-full relative py-4 w-full">
			<div class="w-full flex justify-start ">
				<img
					src="/lt.svg"
					alt="logo"
					class="w-36 pc pl-6"
				>
				<img
					src="/og.png"
					alt="logo"
					class="w-8 mobile mx-auto"
				>
			</div>

			<div class="relative mt-[40px] flex flex-col lg:gap-2 gap-1">
				<div v-for="n in routes" :key="n.name" class="relative lg:px-4">
					<span class="w-full flex flex-col gap-4  px-2 lg:p-0">

						<nuxt-link
							:to="n.route"
							class="flex items-center black use-hover "
							:style="{ backgroundColor: $route.path === n.route ? n.bg : '',
								color: $route.path === n.route ? n.color : '',
								'--link-bg-color': $route.path === n.route ? n.color : ''
							}"
						>
							<component :is="n.icon" class="lg:mr-4 lg:ml-0 mx-auto lg:w-5 lg:h-5 w-[18px] h-[18px]" />
							<p class="text-sm hidden lg:block">
								{{ n.name }}
							</p>
						</nuxt-link>



					</span>
				</div>
			</div>


			<div class=" absolute bottom-0 flex flex-col gap-2 w-full p-4">
				<slot name="footer">
					<AvatarDropdown />
				</slot>
			</div>
		</div>
	</aside>
</template>

<script lang="ts" setup>
import AvatarDropdown from '@/components/core/AvatarDropdown.vue'


type RouteType = {
	route: string;
	name: string;
	icon: string | any;
	bg?: string;
	color?: string;
}

defineProps({
	routes: {
		type: Array as PropType<RouteType[]>,
		required: true,
		default: () => []
	}
})

</script>

<style scoped lang="scss">

:deep(a) {
	@apply text-grey_two w-full lg:h-11 h-10 lg:px-6 lg:pr-3 text-4xl duration-75 rounded-md  ;
&:hover.use-hover{
	@apply bg-hover;
}
}


/* exact link will show the primary color for only the exact matching link */
:deep(a.router-link-exact-active.black) {
	@apply text-dark font-semibold  ;
	// color: var(--primary);
	border-color: var(--primary);
	background-color: #F4F3FF;
	// & > svg {
	// 	color: var(--primary);
	// }
	& ::before{
		content: '';
		@apply absolute left-0 top-0 w-1.5 h-full border  border-dark rounded-full;
		  background-color: var(--link-bg-color);

	}
}

:deep(:focus) {
	outline: none;
}
</style>
