
import { google } from 'googleapis'

import axios from 'axios'
import { setFirestoreSubDocument } from '@/firebase/firestore/create'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'



const integrationKeys = {
    google_calendar: 'google_calendar'

}



export const useLinkGoogleCalendar = () => {
    const { id: user_id } = useUser()
    const loading = ref(false)

    const link = async () => {
        loading.value = true

        try {
            const { data } = await axios.get('/api/getAuthUrl')
            if (data.authUrl) {
                const authWindow = window.open(data.authUrl, '_blank')

                window.addEventListener('message', (event) => {
                    if (event.origin === window.location.origin) {
                        const oauthResult = JSON.parse(localStorage.getItem('oauth_result') as string)
                        if (oauthResult && oauthResult.success) {
                            setFirestoreSubDocument('users', user_id.value!, 'integrations', integrationKeys.google_calendar, {
                                id: integrationKeys.google_calendar,
                                access_token: oauthResult.access_token,
                                refresh_token: oauthResult.refresh_token,
                                email: oauthResult.email,
                                expiry_date: oauthResult.expiry_date,
                                created_at: new Date().toISOString(),
                                updated_at: new Date().toISOString()
                            })
                            localStorage.setItem('oauth_result', '')
                        } else {
                            useAlert().openAlert({ type: 'ERROR', msg: 'Error during token exchange' })
                        }
                        loading.value = false
                    }
                }, { once: true })
            } else {
                throw new Error('Authorization URL not received')
            }
        } catch (error) {
            useAlert().openAlert({ type: 'ERROR', msg: 'Error getting authorization URL' })
            loading.value = false
        }
    }

    return { loading, link, integrationKeys }
}

