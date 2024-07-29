export default defineNuxtPlugin(() => {
  const $api = $fetch.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    onRequest({ request, options, error }) {},
    onResponseError({ response }) {
      // if (response.status === 401) {
      //   return navigateTo('/authlogin')
      // }
    }
  })
  // Expose to useNuxtApp().$api
  return {
    provide: {
      api: $api
    }
  }
})
