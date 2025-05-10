<script lang="ts">
  import type { PortfolioData, PageData } from '../types/types.js';
  import SkillsSection from '$lib/components/sections/Skills/SkillsSection.svelte';
  import TimelineSection from '$lib/components/sections/Timeline/TimelineSection.svelte';
  import SlugSection from '$lib/components/sections/Slug/SlugSection.svelte';

  export let portfolioData: PortfolioData;
  export let content: PageData['content'];
</script>


<TimelineSection 
  sectionId="experience"
  sectionTitle="Experience"
  items={portfolioData.experience}
/>

<SlugSection 
  sectionId="projects"
  sectionTitle="Projects"
  items={content.projects}
  availableTags={content.projectTags}
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
  sectionId="blog-posts"
  sectionTitle="Blog posts"
  items={content.blogs}
  availableTags={content.blogTags}
/>

<TimelineSection 
  sectionId="publications"
  sectionTitle="Publications"
  items={portfolioData.publications}
/>
