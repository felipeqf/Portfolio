<script lang="ts">
    import type { PortfolioData } from '../types/types.js';

    export let portfolioData: PortfolioData;

    const email = portfolioData.social.find(s => s.name.toLowerCase() === 'email');
    const linkedin = portfolioData.social.find(s => s.name.toLowerCase() === 'linkedin');
    const github = portfolioData.social.find(s => s.name.toLowerCase() === 'github');

    let copied: boolean = false;

    function copyToClipboard(email: string): void {
        if (!navigator.clipboard) {
            // Fallback or error message for browsers without clipboard API support
            console.error("Clipboard API not available.");
            alert("Sorry, copying to clipboard is not supported in your browser.");
            return;
        }
        navigator.clipboard.writeText(email)
            .then(() => {
                copied = true;
                // Use requestAnimationFrame to ensure state update is rendered before timeout
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        copied = false;
                    }, 2000);
                });
            })
            .catch((err: Error) => {
                console.error("Failed to copy email: ", err);
                alert("Failed to copy email to clipboard.");
            });
    }
</script>

<section id="contact" class="contact-section">
    <h2>Get in Touch</h2>
    <div class="contact-card">
        <h3>Let's Connect</h3>
        <p>I'm always open to discussing new projects, opportunities in tech, or just having a chat about the latest trends.</p>
        {#if email}
            <div class="contact-item">
                {#if email.icon}<img src={email.icon} alt="Email" />{/if}
                <a href={`mailto:${email.link}`}>
                    <span>{email.link}</span>
                </a>
                <button class="copy-button" on:click={() => copyToClipboard(email.link!)} title="Copy email address">
                    <img src={copied ? portfolioData.check_icon : portfolioData.copy_icon} alt={copied ? 'Copied' : 'Copy'} />
                </button>
            </div>
        {/if}
        <div class="social-icons">
            {#if linkedin}
                <a class="social-icon" href={linkedin.link}><img src={linkedin.icon} alt="Linkedin Icon"></a>
            {/if}
            {#if github}
                <a class="social-icon" href={github.link}><img src={github.icon} alt="Github Icon"></a>
            {/if}
            {#if email}
                <a class="social-icon" href={portfolioData.cv_link} download><img src={portfolioData.cv_icon} alt="CV Icon"></a>
            {/if}
        </div>
    </div>
</section>

<style>

    .social-icons{
        display: flex;
        justify-content: center;
        gap: 50px;
        padding: 12px;
    }

    .social-icon img{
        width: 40px;
        height: 40px;
    }
    .contact-section {
        text-align: center;
        padding: 60px 20px;
        font-family: var(--font-system);
    }

    .contact-section h2 {
        color: var(--secondary-color);
        font-size: 2.5rem;
        margin-bottom: 35px;
        position: relative;
        padding-bottom: 15px;
        transition: color 0.3s ease;
    }

    .contact-section h2::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 4px;
        background: var(--h2-after-background, var(--secondary-color));
        border-radius: 2px;
        transition: background-color 0.3s ease;
    }

    .contact-card {
        background: var(--card-background);
        padding: 30px;
        border-radius: 20px;
        box-shadow:
            0 10px 20px var(--card-shadow),
            0 6px 6px var(--card-shadow);
        max-width: 500px;
        margin: auto;
        text-align: left;
        border: var(--card-border);
        backdrop-filter: blur(8px);
        transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    }

    .contact-card:hover {
        transform: translateY(-5px);
        box-shadow:
            0 20px 25px var(--card-shadow-hover),
            0 10px 10px var(--card-shadow-hover);
    }

    .contact-card h3 {
        margin-bottom: 1.2rem;
        font-size: 1.8rem;
        color: var(--text-color);
        font-weight: 600;
        transition: color 0.3s ease; /* Added transition */
    }

    .contact-card p {
        font-size: 1.1rem;
        color: var(--text-secondary-color);
        margin-bottom: 2rem;
        line-height: 1.6;
        transition: color 0.3s ease;
    }

    .contact-item {
        display: flex;
        align-items: center;
        gap: 15px;
        margin: 20px 0;
        padding: 12px;
        border-radius: 12px;
        background: var(--contact-item-background);
        transition: all 0.2s ease;
    }

    .contact-item:hover {
        background: var(--contact-item-background-hover, rgba(255, 255, 255, 0.9));
        transform: translateX(5px);
    }

    .contact-item img {
        margin-top: 4px;
        width: 28px;
        height: 28px;
        transition: transform 0.2s ease, filter 0.3s ease;
        filter: var(--icon-filter)
    }

    .contact-item:hover img {
        transform: scale(1.1);
    }

    .contact-item a {
        text-decoration: none;
        color: var(--text-color);
        transition: color 0.2s ease;
        font-size: 1.1rem;
        word-break: break-all;
    }

    .contact-item a:hover {
        color: var(--link-hover-color, var(--secondary-color));
    }

    .copy-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        transition: all 0.2s ease;
        margin-left: auto;
        flex-shrink: 0;
    }

    .copy-button:hover {
        background: var(--hover-background-subtle, rgba(0, 119, 204, 0.1));
    }

    .copy-button img {
        width: 22px;
        height: 22px;
        opacity: 0.7;
        transition: opacity 0.2s ease, filter 0.3s ease;
        display: block;
        
    }

    .copy-button:hover img {
        opacity: 1;
    }

    @media (max-width: 900px) {
        .contact-section {
            padding: 30px 15px;
        }

        .contact-card {
            padding: 25px;
            margin: 0 15px;
            max-width: none;
        }

        .contact-section h2 {
            font-size: 2rem;
        }

        .contact-card h3 {
            font-size: 1.5rem;
        }

        .contact-item {
            padding: 10px;
            gap: 10px;
        }

        .contact-item img {
            width: 24px;
            height: 24px;
        }
    }
</style>