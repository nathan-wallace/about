<script>
  import '../app.css';
  import Nav from '$lib/components/Nav/Nav.svelte';
  import Footer from '$lib/components/Footer/Footer.svelte';
  const year = new Date().getFullYear();
</script>

<svelte:head>
  <title>Nathan Wallace — Developer & Program Manager (Front-end Specialist)</title>
  <meta
    name="description"
    content="Portfolio of Nathan Wallace: front-end specialist with full-stack range and program leadership. Federal, higher-ed, and association experience. PMP, CSM, ITIL v4, DHS Trusted Tester."
  />
  <meta
    property="og:title"
    content="Nathan Wallace — Developer & Program Manager (Front-end Specialist)"
  />
  <meta
    property="og:description"
    content="I turn strategy into shipped, accessible software—hands-on and delivery-minded."
  />
</svelte:head>

<a href="#main-content" class="skip-link">Skip to content</a>
<header>
  <Nav />
</header>
<main id="main-content">
  <slot />
</main>
<Footer {year} />

<style>
  :global(a) {
    color: var(--color-text);
    text-decoration: none;
    font-weight: 500;
  }

  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-primary);
    color: white;
    padding: var(--spacing-s);
    z-index: 100;
  }

  .skip-link:focus {
    top: 0;
  }
</style>

