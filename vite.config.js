import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        login: resolve(__dirname, '/src/pages/login/index.html'),
      },
    },
  },
  css: {
    devSourcemap: true,
  },
});
