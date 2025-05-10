<script lang="ts">
    export let currentPage: number;
    export let totalPages: number;
    export let onPageChange: (newPage: number) => void;
  
    function handlePageClick(newPage: number) {
      if (newPage >= 1 && newPage <= totalPages) {
        onPageChange(newPage);
      }
    }
  </script>
  
  {#if totalPages > 1}
    <div class="pagination">
      <button
        class="pagination-button"
        disabled={currentPage === 1}
        on:click={() => handlePageClick(currentPage - 1)}
        aria-label="Previous page"
      >
        Previous
      </button>
      {#each Array(totalPages) as _, i}
        <button
          class="pagination-button"
          class:active={currentPage === i + 1}
          on:click={() => handlePageClick(i + 1)}
          aria-label={`Go to page ${i + 1}`}
          aria-current={currentPage === i + 1 ? 'page' : undefined}
        >
          {i + 1}
        </button>
      {/each}
      <button
        class="pagination-button"
        disabled={currentPage === totalPages}
        on:click={() => handlePageClick(currentPage + 1)}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  {/if}
  
  <style>
    .pagination {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin-top: 2rem;
      flex-wrap: wrap; /* Allow buttons to wrap on smaller screens */
    }
  
    .pagination-button {
      padding: 0.5rem 1rem;
      border: 1px solid var(--border-color, #ccc);
      border-radius: 4px;
      background-color: var(--background-color, #fff);
      color: var(--text-color, #333);
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.9rem; /* Slightly smaller for more buttons */
    }
  
    .pagination-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  
    .pagination-button.active {
      background-color: var(--primary-color, #007bff);
      color: var(--background-color, #fff); /* Or a contrasting color for primary */
      border-color: var(--primary-color, #007bff);
      font-weight: bold;
    }
  
    .pagination-button:hover:not(:disabled):not(.active) {
      border-color: var(--primary-color, #007bff);
      color: var(--primary-color, #007bff);
    }
  
    .pagination-button.active:hover {
      /* Keep active styles on hover or slightly adjust if needed */
      color: var(--background-color, #fff);
    }
  
    .pagination-button:focus-visible {
      outline: 2px solid var(--primary-color, #007bff);
      outline-offset: 1px;
    }
  </style>