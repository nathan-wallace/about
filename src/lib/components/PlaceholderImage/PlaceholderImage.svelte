<script>
  export let width = 800;
  export let height = 600;
  export let text = 'Placeholder';
  export let alt = text;
  const encoded = encodeURIComponent(text);
  const src = `https://placehold.co/${width}x${height}?text=${encoded}`;
  const src2x = `https://placehold.co/${width * 2}x${height * 2}?text=${encoded}`;
</script>

<img src={src} srcset={`${src} 1x, ${src2x} 2x`} alt={alt} width={width} height={height} loading="lazy" />

<style>
  img {
    width: 100%;
    max-width: 100%;
    height: auto;
    display: block;
  }
</style>
