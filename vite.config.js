import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base path for GitHub Pages project site: https://<user>.github.io/React-Weather/
  // Replace with your repo name if different
  base: '/React-Weather/',
})
