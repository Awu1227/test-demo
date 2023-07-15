// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/test-demo/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        adsorb: resolve(__dirname, 'adsorb/index.html'),
        cssExercise: resolve(__dirname, 'cssExercise/index.html'),
      },
    },
  },
})
