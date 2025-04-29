<script lang="ts">
  export let sectionId: string;
  export let sectionTitle: string;
  export let items: any[];

  import { fadeIn } from '$lib/utils/fadeIn'
</script>

<section id={sectionId} class="section" use:fadeIn>
    <h2>{sectionTitle}</h2>
    {#each items as item, index (item.title || index)}
      <div class="timeline-content">
        <div class="details">
          <span class="date">{item.date}</span>
          <!-- Check for icon -->
          {#if item?.icon}
            <div class="timeline-header">
              <div class="timeline-icon">
                <img src={item.icon} alt="">
              </div>
              <h3>
                {item.title}
              </h3>
            </div>
          {:else}
            <h3>
              {item.title}
            </h3>
          {/if}
          {#each ['school', 'company', 'description', 'publication'] as key}
            {#if item[key]}
              <p>{item[key]}</p>
            {/if}
          {/each}
          {#if item.link}
            <div class="external-link-wrapper">
              <a href={item.link} target="_blank" rel="noopener noreferrer" class="hover-link">
                  <p>{item.link}</p>
              </a>
            </div>
          {/if}
        </div>
      </div>
    {/each}
</section>


<style>
  @import '/src/styles/info-section.css';
</style>