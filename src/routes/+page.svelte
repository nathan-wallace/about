<script>
  import Container from '$lib/components/Container/Container.svelte';
  import Hero from '$lib/components/Hero/Hero.svelte';
  import TextImage from '$lib/components/TextImage/TextImage.svelte';
  import Carousel from '$lib/components/CardCarousel/CardCarousel.svelte';
  import PortalCTA from "$lib/components/PortalCTA/PortalCTA.svelte";
  import Button from '$lib/components/Button/Button.svelte';
  import Heading from '$lib/components/Heading/Heading.svelte';
  import { carouselItems } from '$lib/data/carousel';
  import { base } from '$app/paths';

  const shape = { lobes: 8, amplitude: 0.1, detail: 0.05, speed: 0.1, seed: 1 };
  const edge  = { color:"#00E5FF", secondary:"#7C4DFF", width:6, glow:12, dashLength:24, gap:14, speed:80 };
  const middle = { ringColor:"rgba(255,255,255,0.7)", ringWidth:1.5, shimmer:true, shimmerSpeed:0.05 };
  const background = { colorA:"#0A0F25", colorB:"#15244D", angle:45 };
  let ctaLink = `${base}/projects`;
  let ctaText = "Enter the portal";
</script>
<style>
  .portal-wrapper {
    aspect-ratio: 1 / 1;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding-inline: 1rem;
    overflow: hidden;
  }
</style>
<svelte:head>
  <title>Nathan Wallace — Developer & Program Manager (Front-end Specialist)</title>
  <meta name="description" content="About Nathan Wallace: front-end specialist with full-stack range and program leadership. Federal, higher-ed, and association experience. PMP, CSM, ITIL v4, DHS Trusted Tester." />
  <meta property="og:title" content="Nathan Wallace — Developer & Program Manager (Front-end Specialist)" />
  <meta property="og:description" content="I turn strategy into shipped, accessible software—hands-on and delivery-minded." />
</svelte:head>
<Container> 
<Hero
  heading="Bring your ideas to life"
  subheading="Customer-focused web products and project execution from concept to launch."
  ctaText="Start a project"
  ctaLink={`${base}/contact`}
  image={`${base}/lightbulb.png`}
  alt="Lightbulb"
/>
</Container>
<Container noSpaceY={true}> 
<TextImage
  heading="From concept to launch"
  headingLevel={2}
  body="Hands-on leadership that turns ideas into accessible, production-ready experiences."
  image={`${base}/rocket.png`}
  alt="rocket icon"
/>
</Container>
<Container>
<Carousel items={carouselItems}></Carousel>
</Container>

<Container >
  <section class="portal-wrapper">
    <PortalCTA
      padding={40}
      {shape}
      {edge}
      {middle}
      {background}
      parallax={0.45}
    >
      <div>
       <Heading level={2} style="color:white; margin-bottom:1rem;">Ready to Explore?</Heading>
       <Button href={ctaLink}>{ctaText}</Button>
      </div>
    </PortalCTA>
  </section>
</Container>



