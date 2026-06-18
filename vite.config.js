import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['fonts/**', 'LOGO ARISID STUDIO Blanc.png'],
      manifest: {
        name: 'Brief Client — ARISID STUDIO',
        short_name: 'Brief ARISID',
        description: 'Application de brief client en présentiel — ARISID STUDIO',
        theme_color: '#7c2d9e',
        background_color: '#1a1a1a',
        display: 'standalone',
        orientation: 'any',
        start_url: '/',
        icons: [
          {
            src: 'LOGO ARISID STUDIO Blanc.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'LOGO ARISID STUDIO Blanc.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,woff2,woff,ttf,svg}'],
        runtimeCaching: [],
      },
    }),
  ],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
  },
})
