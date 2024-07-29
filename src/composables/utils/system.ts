

import { v4 as uuidv4 } from 'uuid'
import { useMediaQuery } from '@vueuse/core'

export const is_dev = process.env.NODE_ENV !== 'production'


export const mini_id = (desiredLength = 8):string => {
    return uuidv4().slice(0, desiredLength)
}


export const insertScriptTag = async (url: string): Promise<void> => {
  if (process.server) return
  if (process.client && document.head.querySelectorAll(`script[src="${url}"]`).length > 0) return

  return new Promise((resolve, reject) => {
    const scriptTag = document.createElement('script')
    scriptTag.src = url
    scriptTag.onload = () => resolve()
    scriptTag.onerror = () => reject(new Error(`Failed to load script: ${url}`))
    document.body.appendChild(scriptTag)
  })
}

export const isLargeScreen = useMediaQuery('(min-width: 1024px)')

