import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // This section is the crucial fix for your 404 errors.
  // It tells the Vite development server how to handle API requests.
  server: {
    port: 8080, // The port your frontend runs on
    proxy: {
      // Any request from your React app that starts with '/api'
      // will be forwarded to your Nginx gateway.
      '/api': {
        target: 'http://localhost:80', // The address of your Nginx container
        changeOrigin: true, // This is important for proxies to work correctly
        secure: false, // Useful if your Nginx isn't using HTTPS locally
      }
    }
  }
})