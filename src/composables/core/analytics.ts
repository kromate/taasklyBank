// utils/analytics.ts
let initialized = false

export const GA_ID = import.meta.env.VITE_GA_ID as string

declare global{
    interface Window {
        dataLayer: any[]
        gtag: (...args: any[]) => void
    }
}

export const initializeAnalytics = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (initialized) {
      resolve()
      return
    }

    if (process.client) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      document.head.appendChild(script)

      script.onload = () => {
        window.dataLayer = window.dataLayer || []
        function gtag(...args: any[]) { window.dataLayer.push(args) }
        window.gtag = gtag
        gtag('js', new Date())
        gtag('config', GA_ID)

        initialized = true
        resolve()
      }

      script.onerror = () => {
        reject(new Error('Failed to load GA4 script'))
      }
    } else {
      resolve()
    }
  })
}
