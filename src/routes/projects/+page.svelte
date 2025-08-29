<script>
  import ProjectCard from '$lib/components/ProjectCard/ProjectCard.svelte';
  import Hero from '$lib/components/Hero/Hero.svelte';
  import { projects } from '$lib/data/projects';
  import { base } from '$app/paths';
</script>
<style>
  .grid {
    margin-top: 2rem;
    display: grid;
    gap: var(--spacing);
    grid-template-columns: 1fr;
  }

  @media (min-width: 600px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
<Hero
  heading="Projects"
  subheading="A selection of my open-source work."
  ctaText="Start a project"
  ctaLink={`${base}/contact`}
  image={`${base}/rocket.png`}
  alt="Rocket"
/>
<section class="grid">
  {#each projects as project}
    <ProjectCard {project} />
  {/each}
</section>
