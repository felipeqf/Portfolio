<script lang="ts">
    export let sectionId: string;
    export let sectionTitle: string;
    export let items: any[];
    export let availableTags: string[] = [];
    import { base } from '$app/paths';
    import { fadeIn } from '$lib/utils/fadeIn';
    import '/src/styles/info-section.css';
    import SearchableDropdown from '$lib/components/sections/Slug/TagSearch.svelte';
    import Pagination from '$lib/components/sections/Slug/Pagination.svelte';

    const itemsPerPage = 5;
    let currentPage = 1;
    let selectedTag = '';

    // Filter items based on the selected tag, return all items if no tag is selected.
    $: filteredItems = selectedTag
        ? items.filter(item =>
            Array.isArray(item.metadata?.tags) &&
            item.metadata.tags.map((t: string) => t.toLowerCase()).includes(selectedTag.toLowerCase())
          )
        : items;

    $: totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    $: paginatedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset the current page when the tag changes
    $: if (selectedTag || selectedTag === '') {
        currentPage = 1;
    }

    // This function will be passed as the onPageChange prop to Pagination
    function handlePageChange(newPage: number) {
        if (newPage >= 1 && newPage <= totalPages) {
            currentPage = newPage;
        }
    }

    function handleTagChange(newTagValue: string) {
        selectedTag = newTagValue;
    }

    function getItemUrl(item: any) {
        if (item.metadata?.skip) {
            return item.metadata.link;
        }
        return `${base}/${sectionId === 'projects' ? 'projects' : 'blogs'}/${item.slug}`;
    }

</script>

<section id={sectionId} class="section" use:fadeIn>
  <h2>{sectionTitle}</h2>
  {#if availableTags.length > 0}
    <div class="tag-filter">
        <SearchableDropdown
            options={availableTags}
            value={selectedTag}
            onChange={handleTagChange}
            placeholder="Search tags..."
        />
    </div>
  {/if}

  {#each paginatedItems as item, index (item.title || index)}
    <a
    class="timeline-content"
    href={getItemUrl(item)}
    target={item.metadata?.skip ? "_blank" : null}
    rel={item.metadata?.skip ? "noopener noreferrer" : null}>
        <div class="details">
            <div class="header-container">
                {#if item.metadata?.date}
                    <span class="date">{item.metadata.date}</span>
                {/if}
                {#if item.metadata?.tags}
                    <div class="tags-container">
                        {#each Array.isArray(item.metadata.tags)
                            ? item.metadata.tags
                            : item.metadata.tags.split(/[\s,]+/).map((t: string): string => t.trim()) as tag}
                            <span class="tag">{tag}</span>
                        {/each}
                    </div>
                {/if}
            </div>
            {#if item.metadata?.icon}
                <div class="timeline-header">
                    <div class="timeline-icon">
                        <img src={item.metadata.icon} alt={item.metadata?.title ? `${item.metadata.title} icon` : 'Icon'}>
                    </div>
                    <h3 class="title-ref">{item.metadata?.title}</h3>
                </div>
            {:else}
                <h3 class="title-ref">{item.metadata?.title}</h3>
            {/if}
            {#if item.metadata?.description}
                <p class="description">{item.metadata.description}</p>
            {/if}
        </div>
    </a>
  {/each}
  <Pagination
    {currentPage}
    {totalPages}
    onPageChange={handlePageChange}
  />
</section>

<style>
  .tag-filter {
    margin-bottom: 1rem;
  }

  .timeline-content .title-ref {
    color: var(--primary-color);
  }
  .timeline-content {
    text-decoration: none;
    color: inherit;
    display: block;
    cursor: pointer;
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 10px;
  }

  .tag {
    background: var(--tag-background);
    color: var(--tag-color);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.3px;
    white-space: nowrap;
    transition: all 0.2s ease;
    border: var(--tag-border);
  }

  .tag:hover {
    transform: scale(1.05);
    background: var(--tag-background-hover);
    box-shadow: 0 2px 8px var(--tag-shadow-hover);
  }

  .header-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .date {
    white-space: nowrap;
    flex-shrink: 0;
  }
</style>