import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
   
   /* host: true,
    allowedHosts: [
      'fa9d7c141422.ngrok-free.app', // Sinu ngrok URL
      'localhost',
      '.ngrok-free.app' // Luba kõik ngrok URL-id
    ]
  }
})  */
      proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
