<script>
  export const prerender = true;
  import Container from '$lib/components/Container/Container.svelte';
</script>

<Container noSpaceY={true}>
  <slot />
</Container>
