<script>
import { designSystem } from '$lib/designSystem';
export let href = undefined;
export let type = 'button';

$: isExternal = href && /^https?:\/\//.test(href);
</script>

{#if href}
  <a
    class="button"
    href={href}
    on:click
    {...$$restProps}
    target={isExternal ? '_blank' : undefined}
    rel={isExternal ? 'noopener noreferrer' : undefined}
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
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6"
        />
      </svg>
    {/if}
  </a>
{:else}
  <button class="button" type={type} on:click {...$$restProps}>
    <slot />
  </button>
{/if}

<style >
  .button {
    display: inline-flex;
    align-items: center;
    gap: calc(var(--spacing) * 0.25);
    padding: calc(var(--spacing) * 0.75) calc(var(--spacing) * 1.25);
    border-radius: 0;
    border: none;
    background: var(--gradient-primary);
    color: white;
    text-decoration: none;
    font-weight: 600;
    font: inherit;
    transition: transform var(--transition-time), box-shadow var(--transition-time), background var(--transition-time);
    transform-style: preserve-3d;
  }
.button:hover {
  background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
  transform: translateY(-3px) rotateX(2deg) rotateY(-2deg);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
  .button:hover {
    transform: none;
    box-shadow: none;
  }
}
  .external-icon {
    width: 1em;
    height: 1em;
  }
</style>
