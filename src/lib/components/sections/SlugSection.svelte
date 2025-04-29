<script lang="ts">  
    export let sectionId: string;
    export let sectionTitle: string;
    export let items: any[];
    import { base } from '$app/paths';
    import { goto } from '$app/navigation';
    import { fadeIn } from '$lib/utils/fadeIn';

    function navigateToItem(item: any) {
      const path = `${base}/${sectionId === 'projects' ? 'projects' : 'blogs'}/${item.slug}`;
      goto(path);
  }

  // Function to handle keydown events for accessibility
  function handleKeydown(event: KeyboardEvent, item: any) {
    // Trigger navigation on Enter or Space key press
    if (event.key === 'Enter' || event.key === ' ') {
      // Prevent the default spacebar action (scrolling)
      event.preventDefault();
      navigateToItem(item);
    }
  }
    
</script>
  

<section id={sectionId} class="section" use:fadeIn>
  <h2>{sectionTitle}</h2>
    {#each items as item, index (item.title || index)}
    <div
      class="timeline-content"
      on:click={() => navigateToItem(item)}
      on:keydown={(event) => handleKeydown(event, item)}
      tabindex="0"  
      role="link"   
      style="cursor: pointer;"
    >
        <div class="details">
          {#if item.metadata?.date} <span class="date">{item.metadata.date}</span>{/if}
          <!-- Check for icon -->
          {#if item.metadata?.icon}
            <div class="timeline-header">
              <div class="timeline-icon">
                  <img src={item.metadata.icon} alt="">
              </div>
              <h3 class="title-ref">{item.metadata?.title}</h3>
            </div>
          {:else}
          <h3 class="title-ref">{item.metadata?.title}</h3>
          {/if}
          {#if item.metadata?.link}
            <div class="external-link-wrapper">
              <a href={item.metadata.link} class="hover-link" on:click|stopPropagation target="_blank" rel="noopener noreferrer">
                <p>{item.metadata.link}</p>
              </a>
            </div>
          {/if}
          {#if item.metadata?.tags}
            <p>{Array.isArray(item.metadata.tags) ? item.metadata.tags.join(', ') : item.metadata.tags}</p>
          {/if}
        </div>
      </div>
    {/each}
</section>

<style>
  @import '/src/styles/info-section.css';
  .timeline-content .title-ref {
    color: var(--primary-color);
  }
</style>