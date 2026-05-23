import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    proxy: {
      // In local dev, run `vercel dev` and it serves both frontend + API on port 3000.
      // If running plain `vite dev` instead, this proxy forwards /api to the vercel dev server.
      '/api': 'http://localhost:3000',
    },
  },
})
