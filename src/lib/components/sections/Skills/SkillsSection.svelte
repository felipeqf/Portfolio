<script lang="ts">
    import { fadeIn } from '$lib/utils/fadeIn';
    type SkillCategory = {
      name: string;
      skills: string[];
      icon?: string;
    };
    export let title: string = "Skills"; 
    export let skillsData: SkillCategory[] = [];
  
</script>
  
  <section id="skills" class="skills section" use:fadeIn>
    <h2>{title}</h2>
    <div class="skills-grid">
      {#each skillsData as skillCategory}
        <div class="skill-card">
          <div class="skill-header">
            {#if skillCategory.icon}
              <div class="skill-icon">
                <img src={skillCategory.icon} alt={`${skillCategory.name} logo`} />
              </div>
            {/if}
            <h3>{skillCategory.name}</h3>
          </div>
          <div class="skill-tags">
            {#each skillCategory.skills as subskill}
              <span class="tag">{subskill}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </section>
  

<style>
  .skills {
    text-align: center;
    min-width: 100%;
    padding: 50px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
    gap: 40px;
    max-width: 100%;
    margin: 0 20px 40px 20px;
  }

  .skill-card {
    min-height: 250px;
    min-width: 250px;
    background: linear-gradient(145deg, var(--card-gradient-start), var(--card-gradient-end));
    padding: 25px;
    border-radius: 16px;
    box-shadow:
        0 10px 20px var(--card-shadow),
        0 6px 6px var(--card-shadow);
    text-align: left;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    border: var(--card-border);
    backdrop-filter: blur(8px);
  }

  .skill-card:hover {
    transform: translateY(-8px);
    box-shadow:
        0 20px 25px var(--card-shadow-hover),
        0 10px 10px var(--card-shadow-hover);
  }

  .skill-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid var(--card-separator-color, rgba(0, 0, 0, 0.08)); 
  }

  .skill-header h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-color);
    margin: 0;
  }

  .skill-icon {
    width: 48px;
    height: 48px;
    background: var(--icon-background);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px var(--icon-shadow);
    transition: transform 0.2s ease, background 0.3s ease;
    flex-shrink: 0;
  }

  .skill-icon:hover {
    transform: rotate(5deg);
  }

  .skill-icon img {
    width: 28px;
    height: 28px;
    filter: var(--icon-filter);
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }

  .tag {
    background: var(--tag-background);
    color: var(--tag-color);
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.95rem;
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

  @media (max-width: 1500px) {
    .skills{
      width: 100%;
    }
    .skills-grid {
      grid-template-columns: repeat(2, 1fr);
      padding: 0 15px;
    }
    .skill-card {
      min-height: 250px;
    }
    .tag {
      font-size: 1rem;
      padding: 4px 8px;
    }
  }

  @media (max-width: 900px) {
    .skills-grid {
      grid-template-columns: 1fr;
      gap: 30px;
      margin-left: 0;
      margin-right: 0;
    }
    .skill-card {
      min-height: 180px;
    }

    .skill-header h3 {
      font-size: 1.4rem;
    }
    .tag {
      padding: 6px 12px;
      font-size: 1rem;
    }
  }

</style>