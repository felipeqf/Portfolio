<script lang="ts">
  import type { PortfolioData } from '../types/types.js'; 

  export let portfolioData: PortfolioData;

  const linkedin = portfolioData.social.find(s => s.name.toLowerCase() === 'linkedin');
  const github = portfolioData.social.find(s => s.name.toLowerCase() === 'github');

</script>

<section id="about" class="intro">
  <div class="intro-content">
      <div class="left-content">
          <span class="tag">{portfolioData.title}</span>
          <div class="social-links">
            {#if linkedin}
            <a href={linkedin.link} class="social-link" title="LinkedIn profile" target="_blank" rel="noopener noreferrer">
              <img src={linkedin.icon} alt="LinkedIn icon">
            </a>
            {/if}
            {#if github}
            <a href={github.link} class="social-link" title="Github profile" target="_blank" rel="noopener noreferrer">
              <img src={github.icon} alt="Github icon">
            </a>
            {/if}
            {#if portfolioData.cv_link && portfolioData.cv_icon}
            <a href={portfolioData.cv_link} class="social-link" title="Download CV" download> <!-- Removed specific filename -->
              <img src={portfolioData.cv_icon} alt="Download CV icon">
            </a>
            {/if}
          </div>
          <h2>{portfolioData.name}</h2>
          <p>
              {portfolioData.bio}
          </p>
          <div class="expertise-tags">
              {#each portfolioData.expertises as expertise}
                  <span class="expertise-tag">{expertise}</span>
              {/each}
          </div>
      </div>
      <div class="right-content">
          <img src={portfolioData.image} alt={portfolioData.name} class="profile-image" />
      </div>
  </div>
</section>

<style>
  .intro {
    max-width: 100%;
    padding: 80px 20px;  
    font-family: var(--font-system);
    margin-top: 100px;  
    background: linear-gradient(145deg, var(--card-background, white), var(--background-color, #f8f9fa));
    transition: background-color 0.3s ease; 
  }

  .intro-content {
    display: flex;  
    flex-direction: row;  
    align-items: center;  
    gap: 40px;  
    max-width: 1400px;  
    margin: 0 auto;  
  }

  .left-content {
    max-width: 50%;  
    text-align: left;  
    padding: 20px;  
    animation: slideIn 0.8s ease-out;  
  }

  .social-links{
    display: flex;
    flex-direction: row;  
    margin-top: 10px;  
    gap: 10px;  
    margin-left: 6px;  
  }

  .social-link img {
    width: 24px;  
    height: 24px;  
    transition: filter 0.3s ease; 
    filter: var(--icon-filter, invert(0%) brightness(1));
  }


  @keyframes slideIn {  
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .left-content h2 {
    font-size: 4rem;  
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); 
    background-clip: text;  
    -webkit-background-clip: text;  
    -webkit-text-fill-color: transparent;  
    margin: 20px 0;  
    line-height: 1.2;  
  }

  .left-content p {
    font-size: 1.6rem;  
    color: var(--text-secondary-color); 
    margin: 25px 0;  
    line-height: 1.6;  
    transition: color 0.3s ease;
  }

  .tag {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); 
    color: var(--text-on-primary, white); 
    box-shadow: 0 4px 15px var(--shadow-primary-medium, rgba(34, 139, 230, 0.2));
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 1.1rem;
    font-weight: 500;
    display: inline-block;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease, color 0.3s ease;
  }

  .tag:hover {
    transform: translateY(-2px);  
    box-shadow: 0 6px 20px var(--shadow-primary-medium-hover, rgba(34, 139, 230, 0.3));
  }

  .expertise-tags {
    margin-top: 20px;  
    padding: 10px 0;  
    display: flex;  
    gap: 12px;  
    flex-wrap: wrap;  
    max-width: 100%;  
  }

  .expertise-tag {
    background: var(--tag-background); 
    color: var(--tag-color); 
    border: var(--tag-border); 
    padding: 8px 16px;  
    border-radius: 20px;  
    font-size: 1rem;  
    font-weight: 500;  
    transition: all 0.2s ease;
  }

  .expertise-tag:hover {
    transform: translateY(-2px);  
    background: var(--tag-background-hover); 
    box-shadow: var(--tag-shadow-hover); 
  }

  .right-content {
    max-width: 40%;  
    animation: fadeIn 1s ease-out;  
  }

  @keyframes fadeIn {  
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .profile-image {
    width: 100%;  
    max-width: 500px;  
    min-width: 400px;  
    min-height: 300px;  
    height: auto;  
    border-radius: 20px;  
    
    box-shadow: var(--image-shadow, var(--card-shadow)); 
    transition: all 0.3s ease; 
  }

  .profile-image:hover {
    box-shadow: var(--image-shadow-hover, var(--card-shadow-hover)); 
  }

 
  @media (max-width: 1400px) {
    .intro {
      padding: 20px 10px;  
      margin-top: 80px;  
    }
    .intro-content {
      flex-direction: column;  
      align-items: center;  
    }
    .left-content, .right-content {
      max-width: 100%;  
      text-align: center;  
    }
    .left-content {
      padding: 0px;  
    }
    .left-content h2 {
      font-size: 3rem;  
    }
    .profile-image {
      width: 80%;  
    }

    .tag { 
      font-size: 14px;
      margin-top: 20px;
    }

    .expertise-tags {
      max-width: 100%;  
      justify-content: center; 
    }

    .profile-image {
      width: 90%;  
      max-width: 800px;  
    }

    .social-links{
      justify-content: center;  
    }
  }

  @media (max-width: 900px) {
    .intro{
      margin-top: 100px;  
    }
    .tag { 
      font-size: 12px;  
      position: relative;  
      left: 0;  
      align-self: flex-start;  
      z-index: 1;  
    }
    .left-content {
      display: flex;  
      flex-direction: column;  
      align-items: flex-start;  
      text-align: left;  
    }
    .profile-image {
      min-width: unset;  
      border-radius: 15px;  
    }

    .expertise-tag {
      font-size: 0.9rem;  
      padding: 6px 12px;  
    }
  }
</style>