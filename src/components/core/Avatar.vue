<template>
	<img
		v-if="src"
		:src="src"
		:alt="name || 'avatar'"
		:style="`width: ${size}px; height: ${size}px; min-width: ${size}px; min-height: ${size}px; object-fit: cover;`"
		class="!max-w-[1920px] rounded-full border border-dark"
		@click="link ? $router.push(link) : null"
	>
	<span
		v-else
		:style="`width: ${size}px; height: ${size}px; min-width: ${size}px; min-height: ${size}px; object-fit: cover; background-color:${bg}; color:${color}; border-color: ${color}`"
		class="flex items-center justify-center uppercase   border-[1.5px] border-dark text-dark bg-light font-bold rounded-full"
		@click="link ? $router.push(link) : null"
	>
		<span :style="`font-size: ${size/2}px;line-height: 1em`">{{ name[0] }}</span>
	</span>
</template>

<script lang="ts" setup>


defineProps({
	// @ts-ignore
		link: {
			type: String,
			default: null
		},
		src: {
			type: [String, null],
			default: null,
			required: false
		},
		name: {
			type: [String, null],
			required: false,
			default: '#'
		},
		size: {
			required: false,
			type: Number,
			default: 36
		},
		editable: {
			type: Boolean,
			required: false,
			default: false
		},
		bg: {
			type: String,
			required: false,
			default: 'bg-light'
		},
		color: {
			type: String,
			required: false,
			default: 'text-dark'
		}
	}
)





</script>
