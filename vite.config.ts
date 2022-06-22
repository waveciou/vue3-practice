import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import { createHtmlPlugin } from 'vite-plugin-html';

const root: string = resolve(__dirname, 'src');
const outDir: string = resolve(__dirname, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  base: '/vue3-practice/',
  resolve: {
    alias: [
      { find: '@/Store', replacement: resolve(__dirname, 'src/store') },
      { find: '@/Utils', replacement: resolve(__dirname, 'src/utils') },
      {
        find: '@/Components',
        replacement: resolve(__dirname, 'src/components'),
      },
      { find: '@/Scss', replacement: resolve(__dirname, 'src/scss') },
    ],
  },
  plugins: [
    vue(),
    eslintPlugin(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  build: {
    outDir,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'js/main.js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: ({ name = '' }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name)) {
            return 'img/[name].[ext]';
          }
          if (/\.css$/.test(name)) {
            return 'css/[name].[ext]';
          }
          if (/manifest\.json$/.test(name)) {
            return '[name].[ext]';
          }
          return '[name].[ext]';
        },
      },
    },
  },
});
