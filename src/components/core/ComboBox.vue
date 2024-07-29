<template>
	<Listbox v-model="internalSelected">
		<div class="relative">
			<ListboxButton class="relative w-[120px] cursor-default rounded-md border py-2 pl-3 pr-10 text-left text-sm leading-5 text-gray-900 focus:outline-none ">
				<span class="block truncate">{{ displayValue(internalSelected) }}</span>
			</ListboxButton>

			<TransitionRoot
				leave="transition ease-in duration-100"
				leave-from="opacity-100"
				leave-to="opacity-0"
				@after-leave="clearQuery"
			>
				<ListboxOptions id="listboxOptions" class="absolute mt-1 max-h-60 pb-28 w-full overflow-y-auto overflow-x-hidden rounded-md py-1 text-base shadow-lg sm:text-sm z-[1000] bg-white hide-scrollbar">
					<div
						v-if="filteredItems.length === 0 && query !== ''"
						class="relative cursor-default select-none px-4 py-2 text-gray-700"
					>
						Nothing found.
					</div>

					<ListboxOption
						v-for="item in filteredItems"
						:key="item.value"
						v-slot="{ selected, active }"
						:value="item"
					>
						<li
							ref="option"
							class="relative cursor-default select-none py-2  px-4 bg-white"
							:class="{
								'bg-dark font-bold': active,
								'text-gray-900': !active,
							}"
						>
							<span
								class="block truncate li-item"
								:class="{ 'font-medium text-base selected': selected, 'font-normal': !selected }"
							>
								{{ item.name }}
							</span>
							<span
								v-if="selected"
								class="absolute inset-y-0 right-0 flex items-center pl-3"
								:class="{ 'text-white': active, 'text-dark': !active }"
							>
								<Check class="h-4 w-4" aria-hidden="true" />
							</span>
						</li>
					</ListboxOption>
				</ListboxOptions>
			</TransitionRoot>
		</div>
	</Listbox>
</template>

<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  TransitionRoot
} from '@headlessui/vue'

import { Check } from 'lucide-vue-next'



interface Item {
  value: number | string;
  name: string;
  index?: number;
}

const props = defineProps<{
  items: Item[];
  modelValue: Item | null;
  displayValue:(item: unknown) => string;
}>()

const emit = defineEmits(['update:modelValue'])

const internalSelected = ref(props.modelValue)
const query = ref('')
const isFocused = ref(false)

const listboxOptions = ref(null) as Ref<HTMLInputElement | null>

const filteredItems = computed(() =>
  query.value === ''
    ? props.items
    : props.items.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)



const clearQuery = () => {
  query.value = ''
}

// const scrollToSelectedOption = async () => {
// 	await nextTick()

// 	const container = document.getElementById('listboxOptions')!
// 	const spans = container.querySelectorAll('.li-item')
// 	const searchString = props.displayValue(internalSelected.value)


// 	spans.forEach((span) => {
// 		if (span.textContent!.includes(searchString)) {
// 			span.classList.add('select_combox_item_list')
// 			span.scrollIntoView({ behavior: 'instant', block: 'nearest' })

// 			//  const containerTop = container.getBoundingClientRect().top
//             //         const paragraphTop = span.getBoundingClientRect().top
//             //         const scrollPosition = paragraphTop - containerTop + container.scrollTop

// 			// 		 container.scrollTo({
//             //             top: scrollPosition - container.clientHeight / 2 + span.clientHeight / 2,
//             //             behavior: 'instant'
//             //         })
// 		}
// 	})
// //   if (ss) {
// //     ss.scrollIntoView({ block: 'nearest' })
// //   }
// }

watch(internalSelected, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<style>
.select_combox_item_list{
font-weight: 500;
font-size: 1rem;
    line-height: 1.5rem;
}
</style>
