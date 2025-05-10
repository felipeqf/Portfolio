<script lang="ts">
    import type { PageData } from './$types';
    import About from '../lib/components/About.svelte';
    import DisplaySections from '../lib/components/DisplaySections.svelte';
    import Navbar from '../lib/components/NavBar.svelte';
    import Contact from '../lib/components/Contact.svelte';

    export let data: PageData;
    
    const { portfolioData, content } = data;
</script>

<div class="page-container">
    <Navbar {portfolioData} />
    <About {portfolioData} />
    <DisplaySections {portfolioData} {content} />
    <Contact {portfolioData} />
</div>
