import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    hmr: {
      clientPort: 443,
      path: '/',
      timeout: 5000
    },
    watch: {
      usePolling: true,
      interval: 100,
      followSymlinks: false,
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**']
    }
  },
  build: {
    sourcemap: true,
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react', 'recharts', 'react-virtualized', 'react-window'],
          web3: ['web3', 'ethers'],
          auth: ['@supabase/supabase-js'],
          i18n: ['i18next', 'react-i18next'],
          utils: ['date-fns', 'zustand']
        },
        assetFileNames: 'assets/[hash][extname]',
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js'
      }
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'recharts',
      'react-virtualized',
      'react-window',
      'zustand',
      'ethers',
      'web3',
      '@supabase/supabase-js',
      'date-fns'
    ],
    exclude: ['fsevents']
  },
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase'
    }
  },
  preview: {
    port: 5173,
    host: true,
    https: true
  },
  esbuild: {
    legalComments: 'none',
    target: 'esnext'
  }
});