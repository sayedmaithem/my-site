import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      apply: 'build',
      writeBundle() {
        try {
          copyFileSync(resolve(__dirname, '_redirects'), resolve(__dirname, 'dist', '_redirects'))
          console.log('✓ _redirects file copied to dist/')
        } catch (err) {
          console.warn(`Note: _redirects file was not found or could not be copied (${err.message})`)
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    historyApiFallback: true
  }
})
