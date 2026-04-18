import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['0.tcp.ap.ngrok.io'],
  },
  preview: {
    allowedHosts: ['0.tcp.ap.ngrok.io'],
  },
})
