import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'forest' | 'ocean' |'sunset';
export const availableThemes: Theme[] = ['light', 'dark', 'forest', 'ocean', 'sunset'];
const defaultTheme: Theme = 'light';

export const themeLoading = writable(true);

function isValidTheme(themeName: any): themeName is Theme {
    return typeof themeName === 'string' && availableThemes.includes(themeName as Theme);
}

export const theme = writable<Theme>(defaultTheme);

theme.subscribe((value) => {
    if (browser) {
        const themeToApply = isValidTheme(value) ? value : defaultTheme;

        // Remove potentially existing theme classes from both html and body
        availableThemes.forEach(t => {
            document.documentElement.classList.remove(`theme-${t}`);
            document.body.classList.remove(`theme-${t}`);
        });

        // Add the correct theme class to both html and body
        document.documentElement.classList.add(`theme-${themeToApply}`);
        document.body.classList.add(`theme-${themeToApply}`);
    }
});

export function initializeTheme(preferredTheme?: string | null) {
    if (!browser) return;
    
    let themeToSet: Theme = defaultTheme;
    
    if (preferredTheme && isValidTheme(preferredTheme)) {
        themeToSet = preferredTheme;
    }
    
    theme.set(themeToSet);

    setTimeout(() => {
        themeLoading.set(false);
    }, 50);
}