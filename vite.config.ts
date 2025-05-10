import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    resolve: {
        alias: {
            '@projectImages': 'src/content/projects/images',
            '@blogImages': 'src/content/blog_posts/images'
        }
    },

    assetsInclude: ['**/*.md','**/*.jpg', '**/*.png', '**/*.gif', '**/*.svg'],
});