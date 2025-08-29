<script>
  import Container from '$lib/components/Container/Container.svelte';
  import PlaceholderImage from '$lib/components/PlaceholderImage/PlaceholderImage.svelte';
  import Heading from '$lib/components/Heading/Heading.svelte';

  /**
   * Heading displayed beside the image
   */
  export let heading = '';
  /**
   * Heading level (1-6) used for the hero heading
   */
  export let headingLevel = 1;
  /**
   * Paragraph copy displayed below the heading
   */
  export let body = '';
  /**
   * Source url for the image
   */
  export let image;
  /**
   * Alt text for the image
   */
  export let alt = heading;
  /**
   * Position of the media relative to the text: 'left' or 'right'
   */
  export let mediaPosition = 'left';
  /**
   * Vertical alignment of content: 'top', 'center', or 'bottom'
   */
  export let verticalAlign = 'center';
</script>

<section class="text-image">
  <Container noSpaceY={true}>
    <div class="content {verticalAlign}" class:reverse={mediaPosition === 'right'}>
      <figure class="media">
        {#if image}
          <img src={image} alt={alt} loading="lazy" />
        {:else}
          <PlaceholderImage width={600} height={400} text={heading} alt={alt} />
        {/if}
      </figure>
      <div class="copy">

        {#if heading}
        <Heading level={headingLevel}>{heading}</Heading>
        {/if}
        {#if body}<p>{body}</p>{/if}
        <slot />
      </div>
    </div>
  </Container>
</section>

<style>
  .content {
    display: flex;
    gap: var(--spacing-l);
    align-items: center;
  }
  .content.reverse {
    flex-direction: row-reverse;
  }
  .content.top {
    align-items: flex-start;
  }
  .content.center {
    align-items: center;
  }
  .content.bottom {
    align-items: flex-end;
  }

  .media {
    margin: 0;
  }

  .media img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: var(--radius);
  }

  .copy :global(.heading) {
    margin: 0 0 var(--spacing-s);
  }
  .copy p {
    margin: 0;
    color: var(--color-muted);
  }

  @media (min-width: 1024px) {
    /* Add outer spacing for alignment on large screens */
    .content:not(.reverse) .copy {
      margin-right: var(--spacing-l);
    }
    .content.reverse .copy {
      margin-left: var(--spacing-l);
    }
  }

  @media (max-width: 600px) {
    .content,
    .content.reverse {
      flex-direction: column;
    }
  }
</style>

