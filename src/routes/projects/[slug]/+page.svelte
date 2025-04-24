<script lang="ts">
    import type { PortfolioData, Project } from '$lib/types/types.ts';
    import Navbar from '$lib/components/NavBar.svelte';
    import portfolioData from '../../../content/portfolio-data.json';

    export let data: Project;
    const typedPortfolioData = portfolioData as PortfolioData;
</script>

<div class="slug-page-container">
    <Navbar portfolioData={typedPortfolioData} />
    <article class="slug-article">
        <header>
            <h1>{data.metadata.title}</h1>
            <div class="metadata">
                <time datetime={data.metadata.date}>{data.metadata.date}</time>
                <div class="tags">
                    {#each Array.isArray(data.metadata.tags)
                        ? data.metadata.tags
                        : data.metadata.tags.split(',').map(tag => tag.trim())
                    as tag}
                        <span class="tag">{tag}</span>
                    {/each}
                </div>
            </div>
        </header>
        <div class="content">
            {@html data.html}
        </div>
    </article>
</div>

<style>
    @import '../../../styles/slug-styles.css';
</style>