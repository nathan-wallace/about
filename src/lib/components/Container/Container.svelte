<script>
  import { designSystem } from '$lib/designSystem';
  export let maxWidth = '1200px';
  export let fullWidth = false;
  export let spaceX = designSystem.spacing.m;
  export let spaceY = designSystem.spacing.l;
  export let spaceXMobile = designSystem.spacing.mobile;
  export let spaceYMobile = designSystem.spacing.mobile;
  export let color = 'transparent';
  export let borderRadius = designSystem.radius;
  export let margin;
  export let padding;
  export let noSpaceY = false;

  $: effectiveSpaceY = noSpaceY ? '0' : spaceY;
  $: effectiveSpaceYMobile = noSpaceY ? '0' : spaceYMobile;
  $: computedMargin = margin ?? '0 auto';
  $: computedPadding = padding ?? `var(--space-y) var(--space-x)`;

</script>

<div
  class="container"
  style="
    --max-width: {maxWidth};
    --space-x: {spaceX};
    --space-y: {effectiveSpaceY};
    --space-x-mobile: {spaceXMobile};
    --space-y-mobile: {effectiveSpaceYMobile};
    --color: {color};
    --radius: {borderRadius};
    --margin: {computedMargin};
    --padding: {computedPadding};
  "
  class:full={fullWidth}
>
  <slot />
</div>

<style>
  .container {
    width:auto;
    background-color: var(--color);
    border-radius: var(--radius);
    max-width: var(--max-width);
    margin: var(--margin);
    padding: var(--padding);
  }
  .full {
    max-width: none;
  }
  @media (max-width: 600px) {
    .container {
      margin: 0;
      padding: var(--space-y-mobile) var(--space-x-mobile);
    }
  }
</style>
