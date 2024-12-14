import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm(), topLevelAwait()],

  resolve: {
    alias: {
      'node-fetch': 'node-fetch-polyfill',
      buffer: require.resolve('buffer/'),
    },
  },
  optimizeDeps: {
  esbuildOptions: {
    target: 'es2020',
  },
  exclude: ['lucid-cardano'],
  },
  build: {
    target: 'es2020',
  },
  define: {
    'process.env': {},
  },
})
