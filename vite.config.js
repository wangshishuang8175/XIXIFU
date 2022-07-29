import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  server: {
  	host: 'localhost',
  	port: 4000,
  	open: true,
  	https: false,
  	proxy: {
  		"/anonymous": {
  			"target": "https://miniprogram.api.sisyphe.cn/gateway-api/mini-app-mobile-client/app",
  			"changeOrigin": true,
  			"secure": false
  		}
  	}
  },
})