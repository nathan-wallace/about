<script>
import Heading from '$lib/components/Heading/Heading.svelte';
export let title;
export let summary = '';
export let image;
export let video;
export let alt = title;
export let textOnly = false;
export let bgColor = 'var(--color-primary)';
export let labelPosition = 'bottom';
export let togglePosition = 'top-right';
export let variant = 'light';
let open = textOnly;
let videoRef;
let textColor;

// Determine whether light or dark text provides better contrast
function getContrastColor(color) {
  let c = color.trim();
  if (typeof window !== 'undefined' && c.startsWith('var(')) {
    const match = c.match(/var\((--[^)]+)\)/);
    if (match) {
      const value = getComputedStyle(document.documentElement).getPropertyValue(match[1]);
      if (value) c = value.trim();
    }
  }
  let r, g, b;
  if (c.startsWith('#')) {
    c = c.slice(1);
    if (c.length === 3) c = c.split('').map((ch) => ch + ch).join('');
    r = parseInt(c.slice(0, 2), 16);
    g = parseInt(c.slice(2, 4), 16);
    b = parseInt(c.slice(4, 6), 16);
  } else if (c.startsWith('rgb')) {
    const vals = c.match(/\d+/g)?.map(Number) ?? [0, 0, 0];
    [r, g, b] = vals;
  } else {
    // Fallback to black if format is unrecognized
    r = g = b = 0;
  }
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000' : '#fff';
}

$: textColor = getContrastColor(bgColor);

function handleMouseEnter() {
  if (videoRef) {
    videoRef.play();
  }
}

function handleMouseLeave() {
  if (videoRef) {
    videoRef.pause();
  }
}
</script>

<section
  class="experience-card interactive"
  class:glass={!textOnly}
  class:open={open}
  class:text-only={textOnly}
  class:light={variant === 'light'}
  class:dark={variant === 'dark'}
  style={`--bg-color: ${bgColor}; color: ${textColor};`}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  role="region"
>
  {#if !textOnly && (video || image)}
    <div class="image-wrapper">
      {#if video}
        <video
          bind:this={videoRef}
          src={video}
          poster={image}
          muted
          playsinline
          preload="metadata"
          loop
        />
        <div class="video-overlay"></div>
      {:else if image}
        <img src={image} alt={alt} loading="lazy" />
      {/if}
    </div>
  {/if}
  <div class="overlay">
    <Heading level={2}>{title}</Heading>
    {#if summary}
      <p class="summary">{summary}</p>
    {/if}
    <div class="details">
      <slot />
    </div>
  </div>
  {#if !open}
    <div
      class="label"
      class:has-video={!!video}
      class:top={labelPosition === 'top'}
      class:bottom={labelPosition === 'bottom'}
      class:left={labelPosition === 'left'}
      class:right={labelPosition === 'right'}
      aria-hidden="true"
    >
      <Heading
        level={2}
        style="font-size: clamp(var(--font-size-h5), 10cqw, var(--font-size-xx));"
      >
        {title}
      </Heading>
    </div>
  {/if}
  {#if !textOnly}
    <button
      class="toggle"
      class:top-left={togglePosition === 'top-left'}
      class:top-right={togglePosition === 'top-right'}
      class:bottom-left={togglePosition === 'bottom-left'}
      class:bottom-right={togglePosition === 'bottom-right'}
      aria-expanded={open}
      aria-label={open ? 'Hide details' : 'Show details'}
      on:click={() => (open = !open)}
    >
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="20" fill="currentColor" />
        <path
          d="M30.8 18.3h-9.1V9.2c0-.9-.8-1.7-1.7-1.7s-1.7.8-1.7 1.7v9.1H9.2c-.9 0-1.7.8-1.7 1.7s.8 1.7 1.7 1.7h9.1v9.1c0 .9.8 1.7 1.7 1.7s1.7-.8 1.7-1.7v-9.1h9.1c.9 0 1.7-.8 1.7-1.7s-.8-1.7-1.7-1.7Z"
          fill="var(--bg-color)"
        />
      </svg>
    </button>
  {/if}
  </section>

<style>
  .experience-card {
    position: relative;
    overflow: hidden;
    border-radius: 1.5rem;
    aspect-ratio: 3/ 4;
    background: var(--bg-color);
    container-type: inline-size;
  }
  .image-wrapper {
    position: absolute;
    inset: 0;
  }
  .image-wrapper img,
  .image-wrapper video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    object-fit: cover;
  }
  .video-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
  .overlay {
    position: absolute;
    inset: 0;
    padding: var(--spacing-l);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
    opacity: 0;
    transition: opacity var(--transition-time);
    overflow: auto;
    pointer-events: none;
  }
  .experience-card.light .overlay {
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
  }
  .experience-card.dark .overlay {
    background: rgba(255, 255, 255, 0.8);
    color: #000;
  }
  .experience-card.open .overlay {
    opacity: 1;
    pointer-events: auto;
  }
  .summary {
    margin: 0;
    color: inherit;
  }
  .details {
    margin-top: var(--spacing-m);
  }
  .details :global(p) {
    margin: 0 0 var(--spacing-s);
  }
  .details :global(p:last-child) {
    margin-bottom: 0;
  }
  .label {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: normal;
    align-items: center;
    padding: var(--spacing-l);
    background: var(--bg-color);
    color: inherit;
    pointer-events: none;
    text-align: left;
    line-height: 1;
  }
  .label.has-video {
    background: none;
  }
  .label.top {
    align-items: flex-start;
  }
  .label.bottom {
    align-items: flex-end;
  }
  .label.left {
    justify-content: flex-start;
  }
  .label.right {
    justify-content: flex-end;
  }
  .toggle {
    position: absolute;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: inherit;
    z-index: 1;
  }
  .toggle.top-left {
    top: var(--spacing-s);
    left: var(--spacing-s);
  }
  .toggle.top-right {
    top: var(--spacing-s);
    right: var(--spacing-s);
  }
  .toggle.bottom-left {
    bottom: var(--spacing-s);
    left: var(--spacing-s);
  }
  .toggle.bottom-right {
    bottom: var(--spacing-s);
    right: var(--spacing-s);
  }
  .toggle svg {
    width: 40px;
    height: 40px;
    fill: currentColor;
    transition: transform var(--transition-time);
  }
  .toggle[aria-expanded='true'] svg {
    transform: rotate(45deg);
  }
  .experience-card.text-only {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .experience-card.text-only .overlay {
    position: static;
    opacity: 1;
    background: transparent;
    padding: var(--spacing-l);
  }
  .experience-card.text-only .summary {
    display: none;
  }
</style>

