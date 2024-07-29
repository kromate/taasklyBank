import { useCoreModal } from '../core/modals'

const notificationState = {
    message: ref(''),
    title: ref('')
}

interface LoadingTypes {
	title: string
	msg: string
}
export const useLoadingNotification = () => {
    const openLoader = ({ msg, title }:LoadingTypes) => {
        notificationState.message.value = msg
        notificationState.title.value = title
        useCoreModal().openLoadingVerification()
    }
    const closeLoader = () => {
        useCoreModal().closeLoadingVerification()
  }

  return { ...notificationState, openLoader, closeLoader }
}
