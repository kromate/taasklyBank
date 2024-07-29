<template>
	<PagesHero />
	<PagesSmartChecker />
</template>

<script setup lang="ts">
import { watchUserStateChange } from '@/firebase/auth'

onMounted(() => watchUserStateChange())

</script>

<style scoped>

</style>
