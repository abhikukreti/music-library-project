import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'main_app',
      remotes: {
        music_library: 'https://astonishing-seahorse-d2decf.netlify.app/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', '@tanstack/react-query'],
    }),
  ],
  build: {
    target: 'esnext',
    modulePreload: false,
    cssCodeSplit: false,
  },
  server: { port: 5000, cors: true },
})
