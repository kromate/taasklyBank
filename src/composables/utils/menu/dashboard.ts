import { Link, Calendar, Clock, User, Settings, Grid3X3, Wallet } from 'lucide-vue-next'

export const dashboardRoutes = () => [

	{
		icon: Link,
		name: 'Booking Types',
		route: '/booking-types',
		main: true,
		bg: '#e5e7eb',
		color: '#18181B'
	},
	{
		icon: Calendar,
		name: 'Bookings',
		route: '/bookings',
		main: true,
		bg: '#e5e7eb',
		color: '#18181B'
	},
	{
		icon: Clock,
		name: 'Availability',
		route: '/availability',
		main: true,
		bg: '#e5e7eb',
		color: '#18181B'
	},

	{
		icon: User,
		name: 'Contacts',
		route: '/contacts',
		main: true,
		type: 'all',
		bg: '#e5e7eb',
		color: '#18181B'
	},
	{
		icon: Wallet,
		name: 'Wallet',
		route: '/wallet',
		type: 'all',
		bg: '#e5e7eb',
		color: '#18181B'
	},
	{
		icon: Grid3X3,
		name: 'Integrations',
		route: '/integrations',
		type: 'all',
		bg: '#e5e7eb',
		color: '#18181B'
	},
	{
		icon: Settings,
		name: 'Settings',
		route: '/settings',
		type: 'all',
		bg: '#e5e7eb',
		color: '#18181B'
	}

]
