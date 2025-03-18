import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/ask-ai': {
        target: 'http://localhost:5000', // This will be the aws location of server and exposed port later
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ask-ai/, ''),
      },
    },
  }
})
