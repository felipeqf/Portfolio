import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess'

const dev = process.env.NODE_ENV === 'development';

export default {
  preprocess: sveltePreprocess(),
  kit: {
    adapter: adapter({
      fallback: '200.html'
    }),
    paths: {
      base: dev ? '' : '/Portfolio'
    }
  }
};