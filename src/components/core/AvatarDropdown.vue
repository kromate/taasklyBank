<template>
	<div class="relative w-full" @click.stop>
		<ClientOnly>
			<DropdownMenuRoot>
				<DropdownMenuTrigger
					class="lg:border border-dark flex gap-2.5 items-center lg:py-2.5 lg:px-3 rounded-md w-full"
					aria-label="Customise options"
				>
					<Avatar :src="user!.photoURL" :name="user!.displayName ?? userProfile!.name" :size="28" />
					<span class="text-sm hidden lg:block">	{{ user!.displayName ?? userProfile!.name }}</span>
				</DropdownMenuTrigger>
				<DropdownMenuPortal>
					<DropdownMenuContent
						class="w-[200px] max-w-[100%]  my-2 mx-4 lg:ml-0 p-4 border border-dark rounded-md shadow-lg bg-light "
					>
						<DropdownMenuItem
							value="LogOut" class="hover:bg-grey p-1 px-2 rounded-md text-red cursor-pointer" @click="useSignin().signOut()">
							Log Out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenuPortal>
			</DropdownMenuRoot>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">

import { DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuTrigger } from 'radix-vue'
import { useSignin } from '@/composables/auth/auth'
import { useUser } from '@/composables/auth/user'


const { user, userProfile } = useUser()


</script>

<style scoped>

</style>
