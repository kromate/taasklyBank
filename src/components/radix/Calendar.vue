<template>
	<CalendarRoot v-if="!loading" v-slot="{ weekDays, grid }" v-model="model" :is-date-unavailable="isDateUnavailable"
		class="rounded-xl bg-white md:p-4 w-full"
		weekday-format="short"
		:fixed-weeks="false"
		:initial-focus="true"
		:placeholder="todayCalendarDate"
		prevent-deselect
	>
		<CalendarHeader class="flex items-center justify-between px-4 mb-4">
			<CalendarHeading class="text-[15px] text-black font-medium" />

			<div class="flex gap-4 items-center">
				<CalendarPrev class="nxt_prv_btn" @click="emit('prevMonth')">
					<ChevronLeft icon="radix-icons:chevron-left" class="w-6 h-6" />
				</CalendarPrev>
				<CalendarNext class="nxt_prv_btn" @click="emit('nextMonth')">
					<ChevronRight icon="radix-icons:chevron-right" class="w-6 h-6" />
				</CalendarNext>
			</div>
		</CalendarHeader>
		<div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
			<CalendarGrid v-for="month in grid" :key="month.value.toString()" class="w-full border-collapse select-none space-y-1">
				<CalendarGridHead>
					<CalendarGridRow class="mb-1 grid w-full grid-cols-7 border-y py-2">
						<CalendarHeadCell v-for="day in weekDays" :key="day" class="rounded-md text-xs uppercase font-normal ">
							{{ day }}
						</CalendarHeadCell>
					</CalendarGridRow>
				</CalendarGridHead>
				<CalendarGridBody class="grid gap-2">
					<CalendarGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`" class="grid grid-cols-7">
						<CalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate" class="relative text-center text-sm flex center">
							<CalendarCellTrigger :day="weekDate" :month="month.value" class="data_cell transite" />
						</CalendarCell>
					</CalendarGridRow>
				</CalendarGridBody>
			</CalendarGrid>
		</div>
	</CalendarRoot>

	<Skeleton v-else width="100%" radius="12px" height="100%" />
</template>


<script setup lang="ts">
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading, CalendarNext, CalendarPrev, CalendarRoot, type CalendarRootProps } from 'radix-vue'
import { CalendarDate } from '@internationalized/date'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'




const model = defineModel({ type: Object })
const today = new Date()
const isDateUnavailableFunction = (date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Set time to the beginning of the day for accurate comparison
  const targetDate = new Date(date.year, date.month - 1, date.day)
  return targetDate < today
}
// const isCurrentMonth = computed(() => {
//   const currentYear = today.getFullYear()
//   const currentMonth = today.getMonth() + 1
//   const { year, month } = model.value
//   return year === currentYear && month === currentMonth
// })

const todayCalendarDate = computed(() => {
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()

  return new CalendarDate(year, month, date)
})

const props = defineProps<{
isPropsDateUnavailable: CalendarRootProps['isDateUnavailable'],
  loading: boolean
}>()

const isDateUnavailable = props.isPropsDateUnavailable || isDateUnavailableFunction
const emit = defineEmits(['prevMonth', 'nextMonth'])
</script>


<style>
.data_cell {
    @apply relative h-11 w-11 md:w-14 md:h-14 !min-w-11 !min-h-11 max-w-full bg-[#e5e7eb] transition-all duration-75 md:duration-150 ease-linear flex items-center justify-center border-2 rounded-md whitespace-nowrap text-sm font-normal text-black !outline-none !ring-0  data-[disabled]:text-black/30 data-[selected]:!bg-primary data-[selected]:text-white hover:border-dark  data-[highlighted]:bg-primary data-[unavailable]:pointer-events-none data-[unavailable]:bg-transparent data-[unavailable]:border-none data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:rounded-full before:w-1 before:h-1 before:bg-white data-[today]:before:block data-[today]:before:bg-primary
}
.nxt_prv_btn {
    @apply inline-flex items-center cursor-pointer text-black justify-center rounded-[9px] bg-transparent w-8 h-8 hover:bg-gray-300 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black;
}
</style>

