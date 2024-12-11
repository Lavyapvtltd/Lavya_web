import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', 
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'masked-icon.png'],
      devOptions: {
        enabled: true, 
        type: 'module', 
        navigateFallback: '/', 
      },
      manifest: {
        name: "Lavya Ek Vishwas",
        short_name: 'Lavya',
        description: 'Lavya Ek Vishwas - Ek Vishwas Se Zindagi Badle',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            "src": "images/lavyalogo192.jpg",
            "sizes": "192x192",
            "type": "image/jpg",
            "purpose": "any"
          },
          {
            "src": "images/lavyalogo512.jpg",
            "sizes": "512x512",
            "type": "image/jpg",
            "purpose": "any"
          },
          {
            "src": "images/lavyalogo180.jpg",
            "sizes": "180x180",
            "type": "image/jpg",
            "purpose": "apple touch icon"
          },
          {
            "src": "images/lavyalogo384.jpg",
            "sizes": "384x384",
            "type": "image/jpg",
            "purpose": "maskable"
          }
        ]
      }
    })
  ],
  server: {
    host: true, 
    open: true, 
  }
})
