import { OAuth2Client } from 'google-auth-library'
import { setCookie } from 'h3'
import axios from 'axios'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const clientId = import.meta.env.G_AUTH_CLIENT_ID
  const clientSecret = import.meta.env.G_AUTH_CLIENT_SECRET

  const query = getQuery(event)
  const { code } = query as { code: string }

  const host = getRequestHeader(event, 'host')
  let redirectUri

  // Conditionally set the redirect URI based on the host
  if (host === 'localhost:3000') {
    redirectUri = `http://${host}/api/oauth2callback`
  } else {
    redirectUri = `https://${host}/api/oauth2callback`
  }

  const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUri)

  try {
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    // Fetch user info from Google using the access token
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`
      }
    })
    const userInfo = userInfoResponse.data
    const userEmail = userInfo.email


    // Store the tokens in a cookie
      setCookie(event, 'google_oauth_token', tokens.access_token as string, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })

    // Respond with a script to close the window and pass the access token and email
    return `
      <html>
        <body>
          <script>
            window.opener.postMessage({ success: true, refresh_token: '${tokens.refresh_token}', access_token: '${tokens.access_token}', email: '${userEmail}' }, '*');
            localStorage.setItem('oauth_result', JSON.stringify({
              success: true,
              refresh_token: '${tokens.refresh_token}',
              access_token: '${tokens.access_token}',
              email: '${userEmail}',
              expiry_date: ${tokens.expiry_date}
            }));
            window.close();
          </script>
        </body>
      </html>
    `
  } catch (error: any) {
    // Respond with a script to close the window and notify of failure
    return `
      <html>
        <body>
          <script>
            window.opener.postMessage({ success: false, error: '${error.message}' }, '*');
            localStorage.setItem('oauth_result', JSON.stringify({
              success: false,
              error: '${error.message}'
            }));
            window.close();
          </script>
        </body>
      </html>
    `
  }
})
