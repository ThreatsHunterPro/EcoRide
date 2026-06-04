import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react({
    jsxImportSource: 'react',
    jsxRuntime: 'automatic', // << important !
  })],
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
});
