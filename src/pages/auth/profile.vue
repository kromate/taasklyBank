<template>
	<div class="auth-box">
		<img src="/lt2.svg" alt="logo">
		<h1 class="text-2xl text-dark text-center font-semibold  tracking-wide">
			Create a profile
		</h1>

		<form class="auth-form " @submit.prevent="createProfile">
			<div id="step 1" class="auth-form">
				<div class="field">
					<label for="last_name">Full Name</label>
					<input id="last_name" v-model="profileFormState.name.value" type="text" class="input-field" required>
				</div>
				<div class="field relative">
					<label for="username">Username</label>
					<input id="username" v-model="profileFormState.username.value" type="text" class="input-field" autocomplete="additional-name2" :class="[isUsernameAvailable ? '' : '!border-rose-500']" required>
					<Spinner v-if="usernameLoading" class="!border-t-dark !border-[#0c030366] absolute right-4 top-9" />
					<span v-if="!isUsernameAvailable" class="text-rose-500 font-bold">This username is taken</span>
				</div>


				<div class="field">
					<label for="email">Email</label>
					<input id="email" v-model="profileFormState.email.value" :disabled="!!user!.email" type="text" class="input-field" required>
				</div>

				<div class="field">
					<PhoneInput v-model="profileFormState.phone.value" :class="[phoneNumError ? '!border-rose-500' : '']" label="Phone No (whatsapp preferred)" :disabled="!!user!.phoneNumber" />

					<span v-if="phoneNumError" class="text-rose-500 font-bold">{{ phoneNumError }}</span>
				</div>
			</div>


			<button class="btn-primary w-full mt-4" :disabled="disabled">
				<span v-if="!loading"> Create</span>
				<Spinner v-else />
			</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { useCreateProfile, useUsername } from '@/composables/auth/profile/create'
import { useAuthModal } from '@/composables/core/modals'
import { useUser } from '@/composables/auth/user'
const { loading, profileFormState, createProfile, initForm, phoneNumError } = useCreateProfile()
const { isUsernameAvailable, loading: usernameLoading } = useUsername()

initForm()

const { user } = useUser()



const disabled = computed(() => {
	return !isUsernameAvailable.value || usernameLoading.value || phoneNumError.value || loading.value
})

definePageMeta({
	layout: 'auth',
	middleware: ['is-authenticated']
})

</script>

<style scoped lang='scss'>


input:checked {
	@apply hidden
}

</style>
