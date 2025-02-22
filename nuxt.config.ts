import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  // devtools: { enabled: true },

  publicRuntimeConfig: {
    API_URL: process.env.API_URL || "http://point-backend.test",
  },
  devServer: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000
  },
  css: [
    '~/assets/css/main.css'
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  components: true,
  modules: [
    '@pinia/nuxt', 
    'pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    '@nuxt/ui'
  ],
  plugins: [
    '~/plugins/auth.ts'
  ]
})

