import path from 'path';
import { UserConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const config: UserConfig = {
  plugins: [svelte()],
  resolve: {
    alias: {
      '@app': path.resolve('./src'),
      '@stores': path.resolve('./src/stores'),
      '@components': path.resolve('./src/components')
    }
  }
};

export default config;
