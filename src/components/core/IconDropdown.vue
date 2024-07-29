<template>
	<div class="relative" @click.stop>
		<DropdownMenuRoot v-slot="{open}" :modal="false">
			<DropdownMenuTrigger as-child>
				<button
					class="flex outline-none items-center font-normal p-1 border rounded border-dark center card_btn"
					:class="btnClass"
				>
					<EllipsisIcon
						:class="open ? '' : 'text-opacity-70'"
						class="h-5 w-5"
						aria-hidden="true"
					/>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent class="z-10  absolute -right-4 ">
				<div
					class="start-0 z-10 mt-1 rounded-md border border-line bg-white shadow-lg"
					:class="[className, index > 1 ? 'bottom-8' : '']" role="menu"
				>
					<div class="p-2 gap-0.5 flex flex-col items-start w-full">
						<template v-for="item in children" :key="item.name">
							<button v-if="!item.hide" class="item hover:bg-slate-200 transite" role="menuitem" :class="item.class" @click="item.func(data)">
								<component :is="item.icon" :size="16" class="mr-2" />
								{{ item.name }}
							</button>
						</template>
					</div>
				</div>
			</DropdownMenuContent>
		</DropdownMenuRoot>
	</div>
</template>

<script setup lang="ts">
import { EllipsisIcon } from 'lucide-vue-next'
import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent } from 'radix-vue'





interface MenuItem {
  name: string
  hide?: boolean
  class?: string
  icon?: any
  func: (data: any) => void
}

interface Props {
  btnClass: string
  data: Record<string, any>
  bgColor: string
  color: string
  className: string
  children: MenuItem[]
  index: number
  buttonText: string
}

defineProps({
  btnClass: {
    type: String as PropType<string>,
    default: ''
  },
  data: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  bgColor: {
    type: String as PropType<string>,
    default: 'var(--red)'
  },
  color: {
    type: String as PropType<string>,
    default: 'var(--light)'
  },
  className: {
    type: String as PropType<string>,
    default: 'w-52'
  },
  children: {
    type: Array as PropType<MenuItem[]>,
    default: () => []
  },
  index: {
    type: Number as PropType<number>,
    default: 0,
    required: false
  },
  buttonText: {
    type: String as PropType<string>,
    default: '',
    required: false
  }
})
</script>

<style scoped>
.item {
  @apply flex items-center rounded-md px-4 py-2 text-sm text-dark md:hover:bg-dark md:hover:text-light w-full text-start border border-light
}
</style>

<style>
.DropdownMenuContent {
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
  animation: scaleIn 0.15s ease-out;
}
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
