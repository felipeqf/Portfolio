<script lang="ts">
  import type { PortfolioData, Project, Blog } from '../types/types.js';
  import SkillsSection from '$lib/components/sections/SkillsSection.svelte';
  import TimelineSection from '$lib/components/sections/TimelineSection.svelte';
  import SlugSection from '$lib/components/sections/SlugSection.svelte';

  export let portfolioData: PortfolioData;
  export let projects: Project[];
  export let blogs: Blog[];

</script>


<TimelineSection 
  sectionId="experience"
  sectionTitle="Experience"
  items={portfolioData.experience}
/>

<SlugSection 
  sectionId="projects"
  sectionTitle="Projects"
  items={projects}
/>


<SkillsSection
  skillsData={portfolioData.skills}
/>


<TimelineSection 
  sectionId="certifications"
  sectionTitle="Certifications"
  items={portfolioData.certifications}
/>

<TimelineSection 
  sectionId="education"
  sectionTitle="Education"
  items={portfolioData.education}
/>

<SlugSection 
  sectionId="blogs"
  sectionTitle="Blogs"
  items={blogs}
/>

<TimelineSection 
  sectionId="publications"
  sectionTitle="Publications"
  items={portfolioData.publications}
/>
