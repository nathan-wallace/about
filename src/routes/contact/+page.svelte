<script>
  import TextImage from '$lib/components/TextImage/TextImage.svelte';
  import Button from '$lib/components/Button/Button.svelte';
  import { base } from '$app/paths';
</script>
<svelte:head>
  <title>Contact — Nathan Wallace</title>
  <meta name="description" content="About Nathan Wallace: Technology specialist with full-stack range and program leadership. Federal, higher-ed, and association experience. PMP, CSM, ITIL v4, DHS Trusted Tester." />
  <meta property="og:title" content="Nathan Wallace — Program Management & Software Development (Front-end Specialist)" />
  <meta property="og:description" content="I turn strategy into shipped products with the customer in focus." />
  <meta property="og:image" content="https://nathan-wallace.github.io/about/meta.png" />
</svelte:head>
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
