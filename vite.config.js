import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/",
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/material', '@mui/x-data-grid']
  }
});