<template>
	<SwitchGroup as="div" class="flex items-center">
		<Switch
			v-model="model"
			:class="model ? 'bg-dark' : 'bg-gray-100'"
			class="relative inline-flex h-[22px] w-[43px] items-center rounded-full border shadow"
		>
			<span class="sr-only">{{ label }}</span>
			<span :class="[model ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']">
				<span :class="[model ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
					<svg class="h-3 w-3 text-dark" fill="none" viewBox="0 0 12 12">
						<path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</span>
				<span :class="[model ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
					<svg class="h-3 w-3 text-dark" fill="currentColor" viewBox="0 0 12 12">
						<path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
					</svg>
				</span>
			</span>
		</Switch>
		<SwitchLabel v-if="label" as="span" class="ml-3 text-sm">
			<span>{{ label }}</span>
		</SwitchLabel>
	</SwitchGroup>
</template>

<script setup lang='ts'>
import { Switch, SwitchLabel, SwitchGroup } from '@headlessui/vue'

const model = defineModel({ type: Boolean })

const emit = defineEmits(['update'])

watch(model, (value) => {
	emit('update', value)
})

const props = defineProps({
	label: {
		type: String,
		default: ''
	},
	name: {
		type: String,
		default: ''
	}
})



</script>
