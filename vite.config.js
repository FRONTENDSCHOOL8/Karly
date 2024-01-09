import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, '/index.html'),
        cart: resolve(__dirname, '/src/pages/cart/index.html'),
        login: resolve(__dirname, '/src/pages/login/index.html'),
        product_detail: resolve(
          __dirname,
          '/src/pages/product_detail/index.html'
        ),
        product_list: resolve(__dirname, '/src/pages/product_list/index.html'),
        register: resolve(__dirname, '/src/pages/register/index.html'),
        header: resolve(__dirname, '/src/components/header/index.html'),
        footer: resolve(__dirname, '/src/components/footer/index.html'),
      },
    },
  },
  css: {
    devSourcemap: true,
  },
});
