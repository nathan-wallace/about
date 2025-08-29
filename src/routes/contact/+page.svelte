<script>
  import TextImage from '$lib/components/TextImage/TextImage.svelte';
  import Button from '$lib/components/Button/Button.svelte';
  import { base } from '$app/paths';
</script>

<TextImage
  heading="Let's connect"
  headingLevel={1}
  body="Technology changes fast, but relationships and good conversations never go out of style. If you’d like to connect, you’ll find me on the platforms below."
  image={`${base}/communicator.png`}
  alt="Communicator icon"
  mediaPosition="right"
>
  <div class="links">
    <Button href="https://www.linkedin.com/in/nathan-wallace-digital">LinkedIn</Button>
    <Button href="https://github.com/nathan-wallace">GitHub</Button>
  </div>
</TextImage>

<style>
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-m);
    margin-top: var(--spacing-m);
  }
</style>
