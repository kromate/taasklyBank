const rateLimitStore = new Map()

// Rate limit configuration
const RATE_LIMIT = 15 // requests
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds

function getRateLimitKey(ip:string) {
  return `rate_limit:${ip}`
}

export const isRateLimited = (ip:string) => {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const userRequests = rateLimitStore.get(key) || []

  // Remove old requests
  const recentRequests = userRequests.filter((timestamp:number) => now - timestamp < RATE_LIMIT_WINDOW)

  if (recentRequests.length >= RATE_LIMIT) {
    return true
  }

  // Add current request
  recentRequests.push(now)
  rateLimitStore.set(key, recentRequests)

  return false
}
