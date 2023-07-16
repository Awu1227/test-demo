// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins:[vue()],
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
