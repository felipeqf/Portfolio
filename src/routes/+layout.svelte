<script lang="ts">
  import { onMount } from 'svelte';
  import { initializeTheme } from '$lib/stores/themeStore';
  import type { LayoutData } from './$types';
  import '../styles/global.css'; 

  export let data: LayoutData;

  onMount(() => {
    initializeTheme(data.portfolioData?.theme || 'light');

    const handleHashChange = () => {
      const hash = window.location.hash;
      const currentPath = window.location.pathname;

      if (hash && !(currentPath.includes('/blogs/') || currentPath.includes('/projects/'))) {
        requestAnimationFrame(() => {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        });
      }
    };

    if (window.location.hash) {
       setTimeout(handleHashChange, 50);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  });
</script>

<slot />