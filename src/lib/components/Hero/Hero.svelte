<script>
  import Container from '$lib/components/Container/Container.svelte';
  import Button from '$lib/components/Button/Button.svelte';
  import Heading from '$lib/components/Heading/Heading.svelte';

  export let heading = 'Bring your ideas to life';
  export let subheading = 'Customer-focused web products from concept to launch.';
  export let ctaText = 'Start a project';
  export let ctaLink = '#contact';
  export let image = '/lightbulb.png';

  /**
   * Heading level (1-6) used for the hero heading
   */
  export let headingLevel = 1;

  export let alt = 'Lightbulb';
</script>

<section class="hero glass">
  <Container>
    <div class="content">
      <div class="copy">
        <Heading level={headingLevel}>{heading}</Heading>
        <p class="sub">{subheading}</p>
        {#if ctaText}
          <Button href={ctaLink}>{ctaText}</Button>
        {/if}
      </div>
      <img
        class="illustration"
        src={image}
        alt={alt}
        width="600"
        height="400"
        loading="lazy"
      />
    </div>
  </Container>
</section>
<style>
  .hero{
    margin-top: 1rem;
  }
  .content {
    display: grid;
    gap: var(--spacing-l);
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    align-items: center;
  }

  .copy {
    margin-left: 0;
  }

  .copy :global(.heading) {
    margin: 0 0 var(--spacing-s) 0;
  }

  .sub {
    margin: 0 0 var(--spacing-m) 0;
    color: var(--color-muted);
  }

  .illustration {
    width: 80%;
    max-width: 80%;
    height: auto;
    display: block;
  }

  @media (min-width: 1024px) {
    .copy {
      margin-left: var(--spacing-l);
    }
  }

  @media (max-width: 600px) {
    .content {
      grid-template-columns: 1fr;
    }
    .illustration {
      margin-left: auto;
      margin-right: auto;
    }
  }

</style>
