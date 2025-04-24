<script lang="ts">
    import { theme } from '$lib/stores/themeStore';

    type Theme = 'light' | 'dark' | 'forest'| 'ocean';
    const availableThemes: Theme[] = ['light', 'dark', 'forest', 'ocean'];

    function setTheme(newTheme: Theme) {
        theme.set(newTheme);
    }
</script>

<div class="theme-switcher">
    <span>Theme:</span>
    {#each availableThemes as themeName}
        <button
            on:click={() => setTheme(themeName)}
            class:active={$theme === themeName}
            aria-pressed={$theme === themeName}
            title="Switch to {themeName} theme"
        >
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
        </button>
    {/each}
</div>

<style>
    .theme-switcher {
        position: fixed;
        top: 10px;
        right: 10px;
        background: var(--card-background, white);
        padding: 8px 12px;
        border-radius: 25px;
        box-shadow: 0 2px 8px var(--card-shadow, rgba(0,0,0,0.15));
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
        border: var(--card-border);
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    .theme-switcher span {
        color: var(--text-secondary-color);
        font-size: 0.9em;
        margin-right: 5px;
        font-weight: 500;
    }

    .theme-switcher button {
        padding: 5px 12px;
        cursor: pointer;
        border: 1px solid transparent;
        background-color: transparent;
        color: var(--text-secondary-color);
        border-radius: 20px;
        font-size: 0.9em;
        font-weight: 500;
        transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }

    .theme-switcher button:hover {
        color: var(--text-color);
        background-color: rgba(128, 128, 128, 0.1);
    }

    .theme-switcher button.active {
        background-color: var(--secondary-color);
        color: var(--card-background, white);
        border-color: var(--secondary-color);
        font-weight: 600;
    }

    .theme-switcher button:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
</style>