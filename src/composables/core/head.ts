

type CustomHeadTypes = {
  title: string
  desc?: string
  img?: string
}
export const useCustomHead = ({ title, desc, img }:CustomHeadTypes) => {
  useHead({
    title,
    meta: [
      {
        name: 'description',
        content:
          desc ?? 'Create and managge your business smoothly with Taaskly'
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@taaskly' },
      { name: 'twitter:title', content: title ?? 'Taaskly | Your one stop destination for all your business needs' },
      {
        name: 'twitter:description',
        content:
          desc ?? 'Create and managge your business smoothly with Taaskly'
      },
      { name: 'twitter:image', content: img ?? 'https://www.taaskly.xyz/og.png' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title ?? 'Taaskly | Your one stop destination for all your business needs' },
      { property: 'og:url', content: 'https://taaskly.xyz/' },
      { property: 'og:image', content: img ?? 'https://www.taaskly.xyz/og.png' },
      { property: 'og:image:secure_url', content: img ?? 'https://www.taaskly.xyz/og.png' },
      { property: 'og:image:type', content: 'image/png' },
      {
        property: 'og:description',
        content:
          desc ?? 'Create and managge your business smoothly with Taaskly'
      }
    ]
  })
}


export const setCustomHead = ({ title, desc, img }: CustomHeadTypes) => {
  if (process.server) return
    document.title = title
    const metaTags = [
      { name: 'description', content: desc ?? 'Bookings simplified with Taaskly Bookings' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@taaskly' },
      { name: 'twitter:title', content: title ?? 'Taaskly | Bookings simplified, business amplified' },
      { name: 'twitter:description', content: desc ?? 'Bookings simplified with Taaskly Bookings' },
      { name: 'twitter:image', content: img ?? 'https://www.taaskly.xyz/og.png' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title ?? 'Taaskly | Bookings simplified, business amplified' },
      { property: 'og:url', content: 'https://taaskly.xyz/' },
      { property: 'og:image', content: img ?? 'https://www.taaskly.xyz/og.png' },
      { property: 'og:image:secure_url', content: img ?? 'https://www.taaskly.xyz/og.png' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:description', content: desc ?? 'Bookings simplified with Taaskly Bookings' }
    ]

    metaTags.forEach((tag) => {
      const element = document.createElement('meta')
      Object.keys(tag).forEach((key) => {
        element.setAttribute(key, tag[key])
      })
      document.head.appendChild(element)
    })
}
