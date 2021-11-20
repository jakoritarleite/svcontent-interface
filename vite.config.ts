import path from 'path';
import { UserConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import inject from '@rollup/plugin-inject';

const config: UserConfig = {
  plugins: [svelte()],
  resolve: {
    alias: {
      '@app': path.resolve('./src'),
      '@stores': path.resolve('./src/stores'),
      '@components': path.resolve('./src/components')
    }
  },
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })]
    }
  }
};

export default config;
