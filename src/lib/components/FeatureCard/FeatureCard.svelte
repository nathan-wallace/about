<script>
  import PlaceholderImage from '$lib/components/PlaceholderImage/PlaceholderImage.svelte';
  import Heading from '$lib/components/Heading/Heading.svelte';
  export let title;
  export let description;
  export let image;
  export let alt = title;
</script>

<article class="feature glass interactive">
  {#if image}
    <img src={image} alt={alt} loading="lazy" />
  {:else}
    <PlaceholderImage width={400} height={250} text={title} alt={alt} />
  {/if}
  <Heading level={3}>{title}</Heading>
  <p>{description}</p>
</article>

<style>
  
.feature {
  padding: var(--spacing-m);
  border-radius: var(--radius);
  text-align: center;
}
.feature h3 {
  margin: var(--spacing-m) 0 var(--spacing-s);
}

.feature p {
  margin: 0;
  color: var(--color-muted);
}

.feature img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
