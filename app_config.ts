// import { is_dev } from './src/composables/utils/system'




export default {
    keepalive: true,
    head: {
        title: 'Goals - Achieve your goals faster with actionable todo',
        htmlAttrs: { lang: 'en' },
        viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
        bodyAttrs: { class: 'overflow-x-hidden' },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                'http-equiv': 'Content-Security-Policy',
                content: 'upgrade-insecure-requests'
            },
            {
                name: 'title',
                content: 'Goals - Achieve your goals faster with actionable todo'
            },
            {
                name: 'description',
                content: 'Generates a list of actionable steps and to-do to achieve your goals'
            },
            {
                name: 'twitter:title',
                content: 'Goals - Achieve your goals faster with actionable todo'
            },
            { name: 'twitter:image', content: 'https://Goals.taaskly.site/og2.png' },
            {
                name: 'twitter:description',
                content: 'Generates a list of actionable steps and to-do to achieve your goals.'
            },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: '@kromate_24' },
            { name: 'twitter:creator', content: '@kromate_24' },
            {
                property: 'og:title',
                content: 'Goals | Achieve your goals faster with actionable todo'
            },
            { name: 'google-site-verification', content: 'tWttF6w3RHPlNPm5u7KSRgh4lgkRUZ2Bwl6QzECjY18' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: 'https://goals.taaskly.site/' },
            { property: 'og:image', content: 'https://goals.taaskly.site/og2.png' },
            { property: 'og:image:secure_url', content: 'https://goals.taaskly.site/og2.png' },
            { property: 'og:image:type', content: 'image/png' },
            { property: 'og:site_name', content: 'Goals' },
            {
                property: 'og:description',
                content: 'Generates a list of actionable steps and to-do to achieve your goals.'
            },

            { name: 'format-detection', content: 'telephone=no' }
        ],

        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/og.png' },
            { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
            { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: true }

        ]
    }

}



