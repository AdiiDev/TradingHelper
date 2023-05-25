import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react(), mkcert()],
    server: {
      https: true,
      open: true,
      port: 3399,
      strictPort: true,
      proxy: {
        '/api': {
          target: 'https://localhost:7218',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        },
      },
    },
  };
});
