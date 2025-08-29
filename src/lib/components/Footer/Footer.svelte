<script>
  import Nav from '../Nav/Nav.svelte';
  import Link from '../Link/Link.svelte';
  export let year = new Date().getFullYear();
  export let author = 'Nathan Wallace';
</script>


<footer>
  <Nav variant="footer" />
  <p class="accessibility">
    This site aims for WCAG 2.2 AA. Found an issue? I want to fix it—send a <Link href="https://github.com/nathan-wallace/about">quick note</Link>.
  </p>
  <p style="margin-top: 2rem;">Copyright &copy; {year} {author}. All rights reserved.</p>
</footer>

<style>
  footer {
    text-align: center;
    padding: var(--spacing-l) var(--spacing-m) var(--spacing-m) var(--spacing-m);
    background: var(--gradient-surface);
    color: var(--color-text);
    margin-top: var(--spacing-l);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);
  }

  .accessibility {
    font-size: 0.875rem;
    color: var(--color-muted);
  }

  p {
    margin: 0;
    font-size: 0.875rem;
  }
</style>
