<script>
  import { designSystem } from '$lib/designSystem';
  export let level = 1;
  // Optional size token, supports custom values like 'xx'
  export let size;
  export let sizeMobile;
  export let weight = 'bold';
  export let align = 'left';
  $: tag = `h${level}`;
  $: computedSize = size
    ? designSystem.typography.headings.sizes[size] ?? size
    : designSystem.typography.headings.sizes[tag];
  $: computedWeight = designSystem.typography.headings.weights[weight] ?? weight;
  $: computedMobileSize = sizeMobile
    ? designSystem.typography.headings.mobileSizes[sizeMobile] ?? sizeMobile
    : designSystem.typography.headings.mobileSizes[tag] ?? computedSize;
</script>

<svelte:element
  this={tag}
  class="heading"
  style="--heading-size: {computedSize}; --heading-size-mobile: {computedMobileSize}; font-weight: {computedWeight}; text-align: {align};"  {...$$restProps}
>
  <slot />
</svelte:element>

<style>
  .heading {
    margin: 0;
    font-size: var(--heading-size);
  }
  @media (max-width: 600px) {
    .heading {
      font-size: var(--heading-size-mobile);
    }
  }
</style>
