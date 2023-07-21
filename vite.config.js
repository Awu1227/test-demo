// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import vueJsx from '@vitejs/plugin-vue-jsx'
import checker from 'vite-plugin-checker'
export default defineConfig({
  plugins:[
    vue(),
    vueJsx(),
    react(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    checker({
      typescript: true // 在浏览器上看到ts的类型错误
    })
  ],
  base: '/test-demo/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        vite: resolve(__dirname, 'page_vite/index.html'),
        cssExercise: resolve(__dirname, 'cssExercise/index.html'),
        vue_router: resolve(__dirname, 'vue_router/index.html'),
        page_threejs: resolve(__dirname, 'page_threejs/index.html'),
      },
    },
    cssCodeSplit: true // 是否提取所有CSS到一个CSS文件中, introduct: https://cn.vitejs.dev/config/build-options.html#build-csscodesplit
  },
})
