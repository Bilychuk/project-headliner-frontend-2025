import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/project-headliner-frontend-2025/',
  plugins: [react()],
  build: {
    sourcemap: true,
  },
});
