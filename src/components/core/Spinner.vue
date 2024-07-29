<template>
	<div id="loading" :class="light ? 'light' : 'dark'" :style="{ width: size, height: size}" />
</template>

<script lang="ts" setup>
defineProps({
	light: {
		type: Boolean,
		required: false,
		default: true
	},
		size: {
		type: String,
		default: '28px',
		required: false

	}
})
</script>

<style>
#loading {
	display: block;
	width: 20px ;
	height: 20px ;
	border-radius: 50%;
	animation: spin 1s ease-in-out infinite;
	-webkit-animation: spin 1s ease-in-out infinite;
}

.light{
	border: 4px solid rgba(255, 255, 255, 0.634);
	border-top-color: #fff;
}
.dark{
	border: 3px solid rgba(0, 0, 0, 0.634);
	border-top-color: #000;
}

@keyframes spin {
	to {
		-webkit-transform: rotate(360deg);
	}
}
@-webkit-keyframes spin {
	to {
		-webkit-transform: rotate(360deg);
	}
}
</style>
