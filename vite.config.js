import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import alias from '@rollup/plugin-alias';
const path = require('path');

const projectRootDir = path.resolve(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    alias({
      entries: [
        { find: '@', replacement: path.resolve(projectRootDir,'src') }
      ]
    })],
    
   server:{
    hostname:"localhost",
    port: 3000,
      // 反向代理
    proxy: {
      '/api': {
          target: 'http://localhost:5010/',
          port:'5010',
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, '')
          }
      }
   }
})
