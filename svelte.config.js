import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: '404.html',
            precompress: false,
            strict: true
        }),

        // --- THIS IS THE IMPORTANT PART ---
        // Set the base path for production builds because the repo name is 'portfolio'
        paths: {
            // Apply '/portfolio' only when building for production (npm run build)
            // Use an empty string '' for local development (npm run dev)
            base: process.env.NODE_ENV === 'production' ? '/portfolio' : '',

            // You generally don't need to set 'assets' unless your assets
            // are served from a completely different domain (like a CDN).
            // assets: ''
        }
        // --- END OF IMPORTANT PART ---

        // Prerendering config remains important, handled by exports in +page.server.ts
        // prerender: { ... }
    }
};

export default config;