<script>
  import { page } from '$app/stores';
  import { base } from '$app/paths';

  const homeHref = base || '/';

  export let links = [
    { href: homeHref, label: 'Home' },
    { href: `${base}/projects`, label: 'Projects' },
    { href: `${base}/experience`, label: 'Experience' },
    { href: `${base}/contact`, label: 'Connect' }
  ];

  // variant can be "main" for the sticky navigation or "footer" for the footer links
  export let variant = 'main';

  $: currentPath = $page.url.pathname;
  $: navLabel = variant === 'footer' ? 'Footer Navigation' : 'Main Navigation';
</script>
<nav
  class:glass={variant === 'main'}
  class={variant}
  aria-label={navLabel}
>
  <ul>
    {#each links as { href, label }}
      <li>
        <a
          href={href}
          aria-current={currentPath === href ? 'page' : undefined}
          class:active={currentPath === href}
        >
          {label}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav.main {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing);
    padding: var(--spacing);
    position: sticky;
    top: 0;
    z-index: 10;
    border-radius: 0;
  }

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  nav.main ul {
    gap: var(--spacing-m);
  }

  nav.footer ul {
    justify-content: center;
    gap: var(--spacing);
    flex-wrap: wrap;
    margin-bottom: var(--spacing-s);
  }

  a {
    text-decoration: none;
    color: var(--color-text);
  }

  a:hover {
    color: var(--color-primary);
  }

  a.active {
    color: var(--color-primary);
  }
</style>
