<script>
  import { designSystem } from '$lib/designSystem';
  export let level = 1;
  // Optional size token, supports custom values like 'xx'
  export let size;
  export let weight = 'bold';
  export let align = 'left';
  $: tag = `h${level}`;
  $: computedSize = size
    ? designSystem.typography.headings.sizes[size] ?? size
    : designSystem.typography.headings.sizes[tag];
  $: computedWeight = designSystem.typography.headings.weights[weight] ?? weight;
</script>

<svelte:element
  this={tag}
  class="heading"
  style="font-size: {computedSize}; font-weight: {computedWeight}; text-align: {align};"
  {...$$restProps}
>
  <slot />
</svelte:element>

<style>
  .heading {
    margin: 0;
  }
</style>
