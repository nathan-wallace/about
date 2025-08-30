<script>
  import { designSystem } from '$lib/designSystem';
  import Button from '$lib/components/Button/Button.svelte';

  export let open = false;

  function close() {
    open = false;
  }

  function handleBackdropKeydown(event) {
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
      close();
    }
  }

  // Move the modal element to <body> so that parent styles (like transforms
  // from the carousel) don't constrain its position. This ensures the modal
  // covers the entire viewport.
  function portal(node) {
    document.body.appendChild(node);
    return {
      destroy() {
        // Using node.remove() ensures we don't throw if the modal node has
        // already been detached from the DOM by Svelte. This makes the modal
        // re-usable after it is closed.
        node.remove();
      }
    };
  }
</script>

{#if open}
  <div
    class="backdrop"
    use:portal
    on:click|self={close}
    role="button"
    tabindex="0"
    on:keydown|self={handleBackdropKeydown}
  >
    <div
      class="modal glass"
      style="
        --modal-padding: {designSystem.spacing.l};
        --content-gap: {designSystem.spacing.m};
        --border-radius: {designSystem.radius};
      "
    >
      <Button
        class="close"
        on:click={close}
        aria-label="Close"
        type="button"
        style=" position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        border: none;
        background: var(--color-text);
        font-size: var(--font-size-h4);
        color: var(--color-bg);
        cursor: pointer;
        padding: 0.5rem 1rem;
        line-height: 1;"
      >
        &times;
      </Button>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
{/if}
<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal {
    position: relative;
    max-width: 600px;
    width: 90%;
    padding: var(--modal-padding);
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    gap: var(--content-gap);
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: var(--content-gap);
  }
</style>
