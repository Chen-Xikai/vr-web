import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ['lodash.debounce'],
  },
  build: {
    // Enable chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'vuetify': ['vuetify'],
          'video': ['video.js'],
          'pannellum': ['vue-pannellum'],
        },
      },
    },
    // Minify
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Source maps
    sourcemap: false,
    // Chunk size warning
    chunkSizeWarningLimit: 1000,
  },
  // Server optimization
  server: {
    hmr: {
      overlay: false,
    },
  },
})