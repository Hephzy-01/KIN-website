import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Target: GitHub Pages deployment via GitHub Actions
export default defineConfig({
    base: '/KIN-website/',
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            }
        }
    }
});
