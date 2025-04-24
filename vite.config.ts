import { sveltekit } from '@sveltejs/kit/vite';

export default {
  plugins: [sveltekit()],
  build: {
    rollupOptions: {
      input: 'src/app.html'
    }
  }
};