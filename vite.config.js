import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3002,
    historyApiFallback: true, // Ensures that Vite serves index.html for any route
    mimeTypes: {
      js: 'application/javascript',
    },
  },
})
