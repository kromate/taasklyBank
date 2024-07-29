import { fileURLToPath, URL } from 'node:url'
import eslintPlugin from 'vite-plugin-eslint'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import app from './app_config'

 const GA_ID = import.meta.env.VITE_GA_ID as string

export default {
  devtools: { enabled: false },
  modules: ['@vueuse/nuxt', '@nuxtjs/tailwindcss', 'nuxt-gtag'],
  gtag: {
    id: GA_ID
  },
  dir: {
    layouts: './src/layouts',
    pages: './src/pages',
    middleware: './src/middlewares',
    plugins: './src/plugins'
  },
  components: [
    '@/components',
    { path: '@/components/core', extensions: ['vue'] }
  ],

    css: ['@/assets/css/main.css'],
  alias: {
    '@': './src'
  },

  vite: {

    plugins: [
      nodePolyfills(),
      eslintPlugin({ useEslintrc: true, exclude: ['**/node_modules/**'] })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  },
  runtimeConfig: {
     openaiApiKey: process.env.OPENAI_API_KEY
  },
  app
}
