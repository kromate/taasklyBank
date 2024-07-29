<template>
	<div v-if="name" :style="`background-color:${bg || selectPalette?.bg}; color:${color || selectPalette?.color}; border-color: ${color || selectPalette?.color}; border-radius: ${radius};`"
		class="px-3 py-1 text-xs font-medium  inline-block border">
		<slot> {{ translateStatus(name) }}</slot>
	</div>
</template>

<script setup lang='ts'>



const props = defineProps({
	name: {
		type: String,
		required: true
	},
	secondary: {
		type: Boolean,
		default: false
	},
	bg: {
		type: String,
		default: null
	},
	color: {
		type: String,
		default: null
	},
	radius: {
		type: String,
		default: '99999px'
	}
})





const palette = {
	success: { color: '#2F804A', bg: '#EAFFF1' },
	failed: { color: '#D12E2E', bg: '#FFD5DD65' },
	pending: { color: '#E2C044', bg: '#FDB02225' },
	default: { color: '#000000', bg: '#F7F7F7' }
}

const selectPalette = computed(() => {
	switch (props.name.toLowerCase()) {
		case 'pending':
		case 'in_progress':
			return palette.pending

		case 'success':
		case 'accepted':
		case 'completed':
		case 'paid':
		case 'opened':
		case 'public':
		case 'active':
			return palette.success

		case 'failed':
		case 'closed':
		case 'unpaid':
		case 'inactive':
		case 'rejected':
		case 'suspended':
		case 'cancelled':
			return palette.failed

		default:
			return palette.default
	}
})

const translateStatus = (data: string) => {
	// if (data === 'SUCCESS') return 'Successful'
	// if (data === 'PENDING') return 'Processing'

	const capitalized = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase()
	return capitalized
}
</script>
