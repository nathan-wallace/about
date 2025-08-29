<script>
import { designSystem } from '$lib/designSystem';
export let href = '#';
$: isExternal = href && /^https?:\/\//.test(href);
</script>

<a
  class="link"
  href={href}
  target={isExternal ? '_blank' : undefined}
  rel={isExternal ? 'noopener noreferrer' : undefined}
  {...$$restProps}
>
  <slot />
  {#if isExternal}
    <svg
      class="external-icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M13 5h6m0 0v6m0-6L10 14" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6" />
    </svg>
  {/if}
</a>

<style>
  .link {
    color: var(--color-primary);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  .link:hover,
  .link:focus {
    color: var(--color-secondary);
  }

  .external-icon {
    width: 1em;
    height: 1em;
    margin-left: 0.25em;
  }
</style>
