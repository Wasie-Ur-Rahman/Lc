import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [react()],
  server: {
    proxy: {
      '/upload_All_LC_Files': {
        target: 'http://192.168.18.251:8003',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/upload_All_LC_Files/, '/upload_All_LC_Files'),
      },
      '/api/authenticate/access-token-json': {
        target: 'http://192.168.18.251:8003',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/authenticate\/access-token-json/, '/api/authenticate/access-token-json'),
      },
      '/api/users/user-registeration': {
        target: 'http://192.168.18.251:8003',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/users\/user-registeration/, '/api/users/user-registeration'),
      },
      '/api/users/is_available': {
        target: 'http://192.168.18.251:8003',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/users\/is_available/, '/api/users/is_available'),
      },
    },
  },
});
