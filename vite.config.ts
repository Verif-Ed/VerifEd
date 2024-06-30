
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@dfinity/identity'],
    },
  },
  plugins: [react()]
});
