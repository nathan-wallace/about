<script>
  import { onMount } from 'svelte';

  import Swiper, { Pagination, Navigation, Keyboard } from 'swiper';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';
  import ProjectCard from '$lib/components/ProjectCard/ProjectCard.svelte';
  import Heading from '$lib/components/Heading/Heading.svelte';

  export let items = [];
  let container;
  let swiper;

  onMount(() => {
    swiper = new Swiper(container, {
      modules: [Pagination, Navigation, Keyboard],
      loop: true,
      preventClicks: false,
      preventClicksPropagation: false,
      keyboard: { enabled: true },
      pagination: {
        el: container.querySelector('.swiper-pagination'),
        clickable: true
      },
      navigation: {
        nextEl: container.querySelector('.swiper-button-next'),
        prevEl: container.querySelector('.swiper-button-prev')
      },
      breakpoints: {
        640: { slidesPerView: 1, pagination: { enabled: true } },
        768: { slidesPerView: 2, pagination: { enabled: false } },
        1024: { slidesPerView: 3, pagination: { enabled: false } }
      },
      spaceBetween: 16
    });
  });
</script>
<Heading level={2} align="center">Stories in Code</Heading>
<p style="text-align: center;">A showcase of websites I've built and contributed to throughout my career.</p>
<div class="swiper" bind:this={container}>
  <div class="swiper-wrapper">
    {#each items as project}
      <div class="swiper-slide">
        <ProjectCard {project} headingLevel={3} />
      </div>
    {/each}
  </div>
  <div class="swiper-button-prev" aria-label="Previous slide"></div>
  <div class="swiper-button-next" aria-label="Next slide"></div>
  <div class="swiper-pagination"></div>
</div>

<style>
  .swiper {
    width: 100%;
    padding: var(--spacing-l) 0;
  }
  .swiper-wrapper {
    align-items: stretch;
  }
  .swiper-slide {
    width: auto;
    height: auto;
    display: flex;
  }
  .swiper-slide :global(article) {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 768px) {
    .swiper-pagination {
      display: none;
    }
  }
</style>
