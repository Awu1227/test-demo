// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins:[
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  base: '/test-demo/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        adsorb: resolve(__dirname, 'adsorb/index.html'),
        cssExercise: resolve(__dirname, 'cssExercise/index.html'),
        vue_router: resolve(__dirname, 'vue_router/index.html'),
        page_threejs: resolve(__dirname, 'page_threejs/index.html'),
      },
    },
  },
})
