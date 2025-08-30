<script>
  import PlaceholderImage from '$lib/components/PlaceholderImage/PlaceholderImage.svelte';
  import Button from '$lib/components/Button/Button.svelte';
  import Heading from '$lib/components/Heading/Heading.svelte';
  import Modal from '$lib/components/Modal/Modal.svelte';
  import { designSystem } from '$lib/designSystem';
  import { base } from '$app/paths';

  const defaultSkills = ['Project Management', 'Drupal', 'Tech Lead'];

  export let project = {
    title: '',
    description: '',
    link: '',
    image: '',
    details: null,
    skills: defaultSkills
  };

  let showModal = false;

  $: skillsList = project.skills ?? defaultSkills;

  $: imageSrc = project.image && project.image.startsWith('/') ? `${base}${project.image}` : project.image;
  $: modalImgSrc =
    project.details?.img && project.details.img.startsWith('/')
      ? `${base}${project.details.img}`
      : project.details?.img;

  // Heading level for the project title; defaults to h2
  export let headingLevel = 2;

  function handleClick() {
    showModal = true;
  }
</script>
<article
  class="glass interactive"
  style="
    --card-padding: {designSystem.spacing.s};
    --card-gap: calc({designSystem.spacing.m} / 2);
    --card-radius: {designSystem.radius};
  "
>
  <div class="image-wrapper">
    {#if project.image}
      <img src={imageSrc} alt={`Preview of ${project.title}`} loading="lazy" />
    {:else}
      <PlaceholderImage
        width={400}
        height={200}
        text={project.title}
        alt={`Preview of ${project.title}`}
      />
    {/if}
  </div>
  <Heading level={headingLevel} class="project-title">{project.title}</Heading>
  {#if project.description}
  <p>{project.description}</p>
  {/if}
  {#if project.details}
    <Button on:click={handleClick}>View</Button>
  {:else}
    <Button href={project.link}>View</Button>
  {/if}
</article>
{#if project.details}
  <Modal bind:open={showModal}>
    {#if project.details.title}
      <Heading level={3}>{project.details.title}</Heading>
    {/if}
    {#if project.details.img}
      <img src={modalImgSrc} alt={project.details.title} />
    {/if}
      {#if skillsList && skillsList.length}
        <div
          class="skills-wrapper"
          style="
            --skill-bg: {designSystem.colors.text};
            --skill-color: {designSystem.colors.background};
          "
        >
          <span class="skills-label">Skills</span>
          <ul class="skills">
            {#each skillsList as skill}
              <li class="skill">{skill}</li>
            {/each}
          </ul>
        </div>
      {/if}
    {#if project.details.description}
      <p>{project.details.description}</p>
    {/if}
    {#if project.details.links}
      {#each project.details.links as link}
        <Button href={link.href}>{link.text}</Button>
      {/each}
    {/if}
  </Modal>
{/if}
<style>
  article {
    padding: var(--card-padding);
    display: flex;
    flex-direction: column;
    gap: var(--card-gap);
    text-align: left;
    border-radius: var(--card-radius);
    width: 100%;
    box-sizing: border-box;
  }
  @media (min-width: 600px) {
    article {
      --card-padding: var(--spacing-m);
    }
  }
  
  .image-wrapper {
    width: 100%;
    aspect-ratio: 2 / 1;
    overflow: hidden;
    border-radius: var(--radius);
  }
  .image-wrapper :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  :global(.project-title) {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    flex: 1;
    margin: 0;
    opacity: 0.8;
  }
  .skills-wrapper {
    margin: var(--spacing) 0;
  }
  .skills-label {
    font-weight: bold;
    display: block;
    margin-bottom: calc(var(--spacing-s) / 2);
  }
  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-s);
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .skill {
    background: var(--skill-bg);
    color: var(--skill-color);
    padding: calc(var(--spacing-s) / 2) var(--spacing-m);
    border-radius: 9999px;
    font-size: 0.875rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
</style>

