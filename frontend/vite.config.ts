// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      // Enabled so the manifest/SW/install-prompt also work in `npm run dev`,
      // not just in a production build - this is off by default in
      // vite-plugin-pwa, which is why the install button wasn't showing.
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {
        name: 'Vanene',
        short_name: 'Vanene',
        description: 'Case files on production ML systems, cost-calibrated decisions, and full-stack platforms.',
        theme_color: '#17181C',
        background_color: '#E9E9E7',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache the app shell; do not cache API calls - the ratings,
        // contact, and admin data must always come from the network.
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        navigateFallbackDenylist: [/^\/api\//, /^\/admin/],
      },
    }),
  ],
})