<script lang="ts">  
    export let sectionId: string;
    export let sectionTitle: string;
    export let items: any[];
    import { base } from '$app/paths';
    import { fadeIn } from '$lib/components/sections/fadeIn';
</script>
  

<section id={sectionId} class="section" use:fadeIn>
  <h2>{sectionTitle}</h2>
    {#each items as item, index (item.title || index)}
      <div class="timeline-content">
        <div class="details">
          {#if item.metadata?.date} <span class="date">{item.metadata.date}</span>{/if}
          <!-- Check for icon -->
          {#if item.metadata?.icon}
            <div class="timeline-header">
              <div class="timeline-icon">
                  <img src={item.metadata.icon} alt="">
              </div>
              <h3>
                <a href={`${base}/${sectionId === 'projects' ? 'projects' : 'blogs'}/${item.slug}`} class="internal-link">
                  {item.metadata?.title ?? item.title}
                </a>
              </h3>
            </div>
          {:else}
          <h3>
            <a href={`${base}/${sectionId === 'projects' ? 'projects' : 'blogs'}/${item.slug}`} class="internal-link">
              {item.metadata?.title ?? item.title}
            </a>
          </h3>
          {/if}
          {#if item.metadata?.link}
            <a href={item.link} target="_blank" rel="noopener noreferrer" class="hover-link">
              <p>{item.link}</p>
            </a>
          {/if}
          {#if item.metadata?.tags}
            <p>{Array.isArray(item.metadata.tags) ? item.metadata.tags.join(', ') : item.metadata.tags}</p>
          {/if}
        </div>
      </div>
    {/each}
</section>

<style>
  @import './info-section.css';
</style>