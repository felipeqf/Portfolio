<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import type { PortfolioData } from '../types/types'; 

  export let portfolioData: PortfolioData;

  let isOpen: boolean = false;
  let navElement: HTMLElement | undefined;

  const closeMenu = async (e?: MouseEvent): Promise<void> => {
      if (e && (e.target as Element).closest('.theme-switcher-wrapper')) {
          return;
      }

      isOpen = false;

      if (e) {
          const targetElement = e.currentTarget as HTMLAnchorElement;
          const href = targetElement.getAttribute('href');

          // Only prevent default and scroll if it's an internal hash link
          if (href && href.startsWith('#')) {
            e.preventDefault();
            // Check if we are already on the base path (home page)
            const isHomePage = window.location.pathname === base + '/';
            const isHomePageRoot = window.location.pathname === base; // Handles case where base might not have trailing slash internally

            if (!isHomePage && !isHomePageRoot) {
                // Navigate to the base path (home page) plus the hash
                window.location.href = base + '/' + href;
            } else {
                // Already on the home page, just scroll
                const element = document.querySelector(href);
                if (element) {
                    requestAnimationFrame(() => {
                       element.scrollIntoView({ behavior: 'smooth' });
                    });
                  }
              }
          }
      }
  };


  onMount(() => {
      const handleClickOutside = (event: MouseEvent): void => {
          if (
              navElement &&
              !navElement.contains(event.target as Node) &&
              !(event.target as Element).closest('.theme-switcher-wrapper') && 
              isOpen
          ) {
              closeMenu();
          }
      };

      document.addEventListener('click', handleClickOutside);

      return () => {
          document.removeEventListener('click', handleClickOutside);
      };
  });
</script>

<div class="navigation" bind:this={navElement}>
  <nav>
      <div class="nav-left">
        <a href="{base}/" class="home-link" on:click={closeMenu}>
          <div class="logo">
            <span class="initial">{portfolioData.name[0].toUpperCase()}</span>
          </div>
          <h1 class="name">{portfolioData.name.toUpperCase()}</h1>
        </a>
      </div>

      <button
          class="burger"
          on:click={() => isOpen = !isOpen}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}>
          <div></div>
          <div></div>
          <div></div>
      </button>

      <div class="nav-right {isOpen ? 'open' : ''}">
          <ul class="nav-links">
            <li><a href="{base}/#about" on:click={closeMenu}>About</a></li>
            <li><a href="{base}/#experience" on:click={closeMenu}>Experience</a></li>
            <li><a href="{base}/#projects" on:click={closeMenu}>Projects</a></li>
            <li><a href="{base}/#skills" on:click={closeMenu}>Skills</a></li>
            <li><a href="{base}/#certifications" on:click={closeMenu}>Certifications</a></li>
            <li><a href="{base}/#education" on:click={closeMenu}>Education</a></li>
            <li><a href="{base}/#blog-posts" on:click={closeMenu}>Blog posts</a></li>
            <li><a href="{base}/#publications" on:click={closeMenu}>Publications</a></li>
            <li><a href="{base}/#contact" on:click={closeMenu}>Contact</a></li>
          </ul>
      </div>
  </nav>
</div>

<style>
  .navigation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: var(--navbar-background, rgba(255, 255, 255, 0.95));
    backdrop-filter: blur(10px);
    box-shadow: 0 1px 15px var(--navbar-shadow, var(--card-shadow, rgba(0, 0, 0, 0.1)));
    z-index: 1000;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  nav {
    max-width: 70%;
    min-width: 1300px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
  }

  .nav-left {
    display: flex;
    align-items: center;
  }

  .home-link {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: var(--text-color);
    transition: transform 0.3s ease, color 0.3s ease;
    padding: 8px;
    border-radius: 12px;
  }

  .home-link:hover {
    transform: translateX(3px);
  }

  .logo {
    width: 35px;
    height: 35px;
    padding: 3px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    box-shadow: var(--icon-shadow, rgba(0, 0, 0, 0.1));
    border-radius: 12px;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .initial {
    color: var(--text-on-primary, white);
    font-size: 1.5rem;
    font-weight: bold;
    font-family: var(--font-system);
    transition: color 0.3s ease;
  }

  .name {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: var(--font-system);
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 15px;
    margin: 0;
    padding: 0;
    align-items: center;
  }

  .nav-links li a {
    text-decoration: none;
    color: var(--text-secondary-color);
    font-size: 1.1rem;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
  }

  .nav-links li a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    transition: width 0.3s ease;
  }

  .nav-links li a:hover {
    color: var(--link-hover-color, var(--primary-color));
  }

  .nav-links li a:hover::after {
    width: 100%;
  }

  .burger {
    display: none;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    padding: 8px;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }

  .burger:hover {
    background-color: var(--hover-background-subtle, rgba(0, 0, 0, 0.05));
  }

  .burger div {
    width: 32px;
    height: 3px;
    background: var(--text-secondary-color);
    border-radius: 2px;
    transition: 0.3s ease, background-color 0.3s ease;
    margin-right: 30px;
  }

  @media (max-width: 1400px) {
    nav {
      max-width: 100%;
      min-width: 100%;
      padding: 15px;
    }

    .burger {
      display: flex;
    }

    .nav-right {
      position: fixed;
      top: 70px; 
      right: -100%;
      width: 100%;
      height: calc(100vh - 70px); 
      background: var(--navbar-mobile-background, var(--navbar-background, rgba(255, 255, 255, 0.98)));
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px var(--navbar-shadow, var(--card-shadow, rgba(0, 0, 0, 0.1)));
      transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease, box-shadow 0.3s ease; /* Updated transition */
      display: flex;
      flex-direction: column;
    }

    .nav-right.open {
      right: 0;
    }

    .nav-links {
      flex-direction: column;
      padding: 20px;
      gap: 15px;
      align-items: stretch; 
      flex-grow: 1; 
      overflow-y: auto;
    }

    .nav-links li {
      width: 100%;
      text-align: center;
    }

    .nav-links li a {
      display: block;
      padding: 12px;
      font-size: 1.1rem; 
      border-radius: 8px;
    }

    .nav-links li a:hover {
      background: var(--hover-background-subtle, rgba(34, 139, 230, 0.1));
      color: var(--link-hover-color, var(--primary-color));
    }
    .nav-links li a::after {
        display: none;
    }
  }

</style>