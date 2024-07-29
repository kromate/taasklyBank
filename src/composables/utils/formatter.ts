import { format, addMinutes } from 'date-fns'
import { useAlert } from '@/composables/core/notification'

export const convertTo12HourFormat = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours < 12 ? 'AM' : 'PM'
  const adjustedHours = hours % 12 === 0 ? 12 : hours % 12
  return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

export const convertObjWithRefToObj = (obj: Record<string, Ref>, ignoreKeys: string[] = []) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => !ignoreKeys.includes(key)).map(([key, value]) => [key, value.value])
    )
}
 const getOrdinalSuffix = (num: number): string => {
  const lastDigit = num % 10
  const lastTwoDigits = num % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return 'th'
  } else if (lastDigit === 1) {
    return 'st'
  } else if (lastDigit === 2) {
    return 'nd'
  } else if (lastDigit === 3) {
    return 'rd'
  } else {
    return 'th'
  }
}

export const formatDate = (dateString: string | number, type?: 'dateInput'): string => {
  const date = new Date(dateString)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[date.getMonth()]
  const day = date.getDate()
  const ordinal = getOrdinalSuffix(day)
  const year = date.getFullYear()

   const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const dateObj = new Date(date)
    if (dateObj.toDateString() === today.toDateString() && !type) {
        return 'Today'
    } else if (dateObj.toDateString() === yesterday.toDateString() && !type) {
        return 'Yesterday'
    } else {
       return `${day}${ordinal} ${month}, ${year}`
    }
}





export const truncateString = (input: string, maxLength = 80): string => {
  if (!input) return ''
    if (input.length <= maxLength) {
        return input
    } else {
        return input.slice(0, maxLength) + '...'
    }
}



export const formatDateString = (dateStr: string, options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }): string => {
  const date = new Date(dateStr)


  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export const validate_data = (data: Record<string, any>, ignoreKeys: string[] = []) => {
	const missingKeys: string[] = []

	const checkData = (data: Record<string, any>, parentKey = '') => {
		for (const key in data) {
			if (data.hasOwnProperty(key) && !ignoreKeys.includes(key)) {
				const value = data[key]
				const fullKey = parentKey ? `${parentKey}.${key}` : key
				if (!value) {
					missingKeys.push(fullKey)
				}
				if (typeof value === 'object' && value !== null) {
					checkData(value, fullKey)
				}
			}
		}
	}

	checkData(data)

	if (missingKeys.length > 0) {
		useAlert().openAlert({ type: 'ERROR', msg: `Error: ${missingKeys.join(', ')} are required` })
		return false
	}
	return true
}


export const transformString = (inputString: string): string => {
    const trimmedString = inputString.trim()
    const lowercaseString = trimmedString.toLowerCase()
    const transformedString = lowercaseString.replace(/ /g, '-')

    return transformedString
}
interface TimeDuration {
  time: string; // e.g., "12:00"
  duration: number; // in minutes
}

export const formatTimeRange = (timeDuration: TimeDuration): string => {
  const [hours, minutes] = timeDuration.time.split(':').map(Number)
  const startDate = new Date(0, 0, 0, hours, minutes)
  const endDate = addMinutes(startDate, timeDuration.duration)

  const formattedStartTime = format(startDate, 'hh:mm a')
  const formattedEndTime = format(endDate, 'hh:mm a')

  return `${formattedStartTime} - ${formattedEndTime}`
}
