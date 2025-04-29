import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';

// Read portfolio data using fs
const portfolioData = JSON.parse(fs.readFileSync('./src/content/data/portfolio-data.json', 'utf-8'));

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

        paths: {
            // Apply '/your-repo-name' only when building for production (npm run build)
            // Use an empty string '' for local development (npm run dev)
            base: process.env.NODE_ENV === 'production' ? portfolioData.basePath : '',
        }
    }
};

export default config;