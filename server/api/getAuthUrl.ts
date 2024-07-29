import crypto from 'crypto'
import { OAuth2Client } from 'google-auth-library'

export default defineEventHandler(async (event) => {
  // Load environment variables

  const host = getRequestHeader(event, 'host')
      let redirectUri
     if (host === 'localhost:3000') {
    redirectUri = `http://${host}/api/oauth2callback`
  } else {
    redirectUri = `https://${host}/api/oauth2callback`
  }

  const clientId = import.meta.env.G_AUTH_CLIENT_ID
  const clientSecret = import.meta.env.G_AUTH_CLIENT_SECRET


  // Create OAuth2Client
  const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUri)

  // Set the scopes for Google Calendar API
  const scopes = ['https://www.googleapis.com/auth/calendar', 'email', 'profile', 'openid']

  // Generate the authorization URL
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: crypto.randomBytes(20).toString('hex'),
    prompt: 'consent'
  })

  // Return the authorization URL
  return { authUrl }
})
