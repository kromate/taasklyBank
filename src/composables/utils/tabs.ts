import { Raw, Component } from 'vue'
import TabComponents from '@/components/core/Tabs.vue'

export const useTabs = () => {
	const tabViews = ref([] as Array<string>)
	const selected = ref('')
	const tabs = ref({} as Raw<Component>)

	const initTabs = (
		selectedStr: string,
		tabStringArray: Array<string>,
		tabComp: Raw<Component>
	) => {
		selected.value = selectedStr
		tabViews.value = tabStringArray
		tabs.value = tabComp
	}
	const updateTab = (data: any) => {
		useRouter().push({ query: { q: data } })
		useRoute().query.q = data
		selected.value = data
	}

	const onTabMounted = () => {
		if (useRoute().query.q && (selected.value = useRoute().query.q as any)) {
			selected.value = useRoute().query.q as any
		}
	}

	return { initTabs, TabComponents, selected, tabViews, tabs, updateTab, onTabMounted }
}
