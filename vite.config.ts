import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      screens: '/src/views',
      components: '/src/components',
    }
  }
})
