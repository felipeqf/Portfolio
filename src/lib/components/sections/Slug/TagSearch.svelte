<script lang="ts">
    export let options: string[] = [];
    export let value: string = '';
    export let placeholder: string = 'Search...';
    export let onChange: (newValue: string) => void;
  
    let searchTerm = '';
    
    $: filteredOptions = options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleInput(event: Event) {
      const target = event.target as HTMLInputElement;
      searchTerm = target.value;
    }
</script>

<div class="tags-wrapper">
    <div class="search-container">
        <input
            type="search"
            bind:value={searchTerm}
            on:input={handleInput}
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            placeholder={placeholder}
            class="search-input"
        />
    </div>

    <div class="tags-container">
        <button
            class="tag"
            class:active={value === ''}
            on:click={() => onChange('')}
            type="button"
        >
            All Tags
        </button>
        
        {#each filteredOptions as option}
            <button
                class="tag"
                class:active={value === option}
                on:click={() => onChange(option)}
                type="button"
            >
                {option}
            </button>
        {/each}
        
        {#if filteredOptions.length === 0 && searchTerm}
            <div class="no-results">No tags found</div>
        {/if}
    </div>
</div>

<style>
    .tags-wrapper {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
        margin: 0 20px;
    }

    .search-container {
        width: 100%;
        max-width: 300px;
    }

    .search-input {
        width: 100%;
        padding: 0.6rem;
        border: 2px solid var(--primary-color, #ccc);
        border-radius: 20px;
        background-color: var(--background-color, #fff);
        color: var(--text-color, #333);
        font-size: 1rem;
        outline: none;
    }

    .search-input:focus {
        outline: 2px solid var(--primary-color, #007bff);
        outline-offset: 1px;
    }

    .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        overflow: hidden;
        max-height: 36px;
    }

    .tag {
        background: var(--tag-background, #f0f0f0);
        color: var(--tag-color, #333);
        border: var(--tag-border, 1px solid #ddd);
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .tag:hover {
        transform: scale(1.05);
        background: var(--tag-background-hover, #e0e0e0);
        box-shadow: 0 2px 8px var(--tag-shadow-hover, rgba(0,0,0,0.1));
    }

    .tag.active {
        background: var(--primary-color, #007bff);
        color: var(--background-color, #fff);
        border-color: var(--primary-color, #007bff);
    }

    .no-results {
        color: #888;
        padding: 0.5rem;
    }

    @media (max-width: 900px) {
        .tags-wrapper {
            flex-direction: column;
            align-items: flex-start;
        }
        .search-container {
            max-width: 200px;
        }
    }
</style>