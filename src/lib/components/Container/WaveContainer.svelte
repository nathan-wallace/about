<!-- WaveContainerPhased.svelte -->
<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  // ---------- Public props ----------
  export let waves = 6;                    // number of layered waves
  export let strokeWidth = 2;              // px
  export let colors = ["#FBC02E", "#FFD54F", "#FFF176"]; // cycled per wave
  export let amplitude = 22;               // base amplitude in px (at loop)
  export let wavelength = 180;             // distance between peaks in px
  export let drift = 48;                   // horizontal drift speed (px/sec)
  export let verticalJitter = 10;          // random +/- y offset per wave
  export let seed = 1;                     // RNG seed for reproducible jitter
  export let rotate = -45;                 // rotate entire field (deg)
  export let blendMode = "screen";         // CSS mix-blend-mode for the waves
  export let opacity = 1;                  // target opacity at loop

  // Phase controls (intro → loop → outro); times in ms
  export let intro = {
    enabled: true,
    duration: 1200,
    easing: "easeOutCubic",   // ease name from the table below
    fromAmplitude: 0.05,      // fraction of amplitude
    fromOpacity: 0
  };

  export let loop = {
    duration: 4000,           // how long one loop "cycle" lasts (ms)
    easing: "linear",
    ampJitter: 0.15,          // slow breathing: +/- fraction
    yoyo: true,               // mirror drift back-and-forth
    maxLoops: Infinity        // auto-transition to outro after N loops
  };

  export let outro = {
    enabled: false,           // start outro immediately after intro if no loop
    duration: 1000,
    easing: "easeInCubic",
    toAmplitude: 0,
    toOpacity: 0
  };

  export let autoPlay = true;            // start intro automatically
  export let respectReducedMotion = true;// disables animation if user prefers

  // Advanced: external control
  // set to "intro" | "loop" | "outro" to force a phase; "auto" lets component manage
  export let controlledPhase = "auto";

  // ---------- Internal state ----------
  let container;
  let w = 0, h = 0;
  let paths = [];             // computed path string per wave
  let rafId;
  let started = false;
  let phase = "idle";         // "idle" | "intro" | "loop" | "outro" | "done"
  let loopsDone = 0;
  let phaseStart = 0;         // ms timestamp when current phase started
  let prefersReducedMotion = false;

  const dispatch = createEventDispatcher();

  // ---------- Utilities ----------
  function mulberry32(a) {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
  }
  const rand = mulberry32(seed);

  // Small set of easing functions
  const eases = {
    linear: t => t,
    easeInCubic: t => t * t * t,
    easeOutCubic: t => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    easeOutQuint: t => 1 - Math.pow(1 - t, 5),
    easeInOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2
  };

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function nowMs() { return performance.now(); }

  // Build one sine path across width w; returns SVG path string
  function buildPath({ amp, phaseX, phaseY, offsetY }) {
    const steps = Math.max(64, Math.round(w / 12)); // dynamic resolution
    const midY = h / 2 + offsetY + phaseY;          // vertical center + breathing
    const k = (Math.PI * 2) / wavelength;
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * w;
      const y = midY + amp * Math.sin(k * x + phaseX);
      d += (i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    return d;
  }

  // ResizeObserver to keep SVG responsive
  let ro;
  function observeSize() {
    if (!container) return;
    ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        w = cr.width;
        h = cr.height;
      }
    });
    ro.observe(container);
  }

  // Derived per-wave constants (recomputed if props change materially)
  let layers = [];
  function computeLayers() {
    // Each wave gets a stable jitter and color
    const base = [];
    const colorsCycle = colors.length ? colors : ["currentColor"];
    const phaseShift = (Math.PI * 2) / Math.max(waves, 1);
    const rng = mulberry32(seed);
    for (let i = 0; i < waves; i++) {
      const jy = (rng() * 2 - 1) * verticalJitter;
      const ampScale = 0.85 + rng() * 0.3;    // 0.85–1.15 scaling
      const hueIndex = i % colorsCycle.length;
      base.push({
        color: colorsCycle[hueIndex],
        offsetY: jy,
        ampScale,
        phaseBias: i * phaseShift * 0.7 + rng() * 0.6
      });
    }
    layers = base;
  }

  // Phase management
  function setPhase(next) {
    if (phase === next) return;
    phase = next;
    phaseStart = nowMs();
    dispatch("phasechange", { phase });
  }

  export function start() {
    if (started) return;
    started = true;
    loopsDone = 0;
    const rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion = respectReducedMotion && rm ? rm.matches : false;

    if (controlledPhase !== "auto") {
      setPhase(controlledPhase);
    } else if (autoPlay) {
      setPhase(intro.enabled ? "intro" : (outro.enabled ? "outro" : "loop"));
    } else {
      setPhase("idle");
    }

    tickFrame();
  }

  export function goOut() {
    if (phase === "done" || phase === "outro") return;
    setPhase("outro");
  }

  export function pause() {
    if (typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(rafId);
    }
    rafId = 0;
  }
  export function resume() {
    if (!rafId) tickFrame();
  }

  function phaseElapsed() {
    return nowMs() - phaseStart;
  }

  // Core animation loop
  function tickFrame() {
    // If reduced motion, draw a static frame with minimal movement
    if (prefersReducedMotion) {
      const env = { amp: amplitude * 0.2, op: 1, driftPx: 0, breath: 0 };
      draw(env, 0);
      return;
    }

    const t = nowMs();
    const elapsed = phaseElapsed();

    // Resolve envelope per phase
    let env;
    if (phase === "intro") {
      const d = Math.max(1, intro.duration);
      const k = clamp(elapsed / d, 0, 1);
      const ease = (eases[intro.easing] || eases.easeOutCubic)(k);
      const ampNow = amplitude * (intro.fromAmplitude + (1 - intro.fromAmplitude) * ease);
      const opNow = intro.fromOpacity + (opacity - intro.fromOpacity) * ease;
      env = { amp: ampNow, op: opNow, driftPx: drift * (k / 1000), breath: 0 };
      if (k >= 1) {
        setPhase(outro.enabled && loop.maxLoops === 0 ? "outro" : "loop");
      }
    } else if (phase === "loop") {
      const d = Math.max(1, loop.duration);
      let k = (elapsed % d) / d; // 0..1
      const cycle = (eases[loop.easing] || eases.linear)(k);
      const yoyo = loop.yoyo ? (k < 0.5 ? k * 2 : (1 - k) * 2) : k;
      // Slow "breathing" amplitude
      const breath = Math.sin((t / 1000) * (Math.PI * 2 / 6)); // 6s breath
      const ampNow = amplitude * (1 + loop.ampJitter * breath);
      env = { amp: ampNow, op: opacity, driftPx: drift * (loop.yoyo ? (yoyo * 2 - 1) : 1), breath };

      // Loop counting & auto-outro
      if (k < 0.01 && t - phaseStart > 100) {
        loopsDone += 1;
        dispatch("loop", { count: loopsDone });
        if (loopsDone >= loop.maxLoops) setPhase(outro.enabled ? "outro" : "done");
      }
    } else if (phase === "outro") {
      const d = Math.max(1, outro.duration);
      const k = clamp(elapsed / d, 0, 1);
      const ease = (eases[outro.easing] || eases.easeInCubic)(k);
      const ampNow = amplitude * (1 - ease * (1 - (outro.toAmplitude / Math.max(amplitude, 0.0001))));
      const opNow = opacity * (1 - ease * (1 - (outro.toOpacity / Math.max(opacity, 0.0001))));
      env = { amp: ampNow, op: opNow, driftPx: drift * (1 - k), breath: 0 };
      if (k >= 1) setPhase("done");
    } else if (phase === "done" || phase === "idle") {
      env = { amp: 0, op: 0, driftPx: 0, breath: 0 };
    }

    draw(env, t);
    rafId = requestAnimationFrame(tickFrame);
  }

  // Draw all layers using the current envelope
  function draw(env, t) {
    const timeSec = t / 1000;
    const phaseX = (env.driftPx * timeSec) / Math.max(w, 1) * (Math.PI * 2) * (w / wavelength);
    const phaseY = env.breath * 2; // small vertical "float"

    paths = layers.map((L, i) => {
      return buildPath({
        amp: env.amp * L.ampScale,
        phaseX: phaseX + L.phaseBias,
        phaseY,
        offsetY: L.offsetY
      });
    });

    container?.style.setProperty("--waves-opacity", env.op.toFixed(3));
  }

  // React to external controlledPhase changes
  $: if (controlledPhase !== "auto" && started) {
    setPhase(controlledPhase);
  }

  // Recompute layers when props change materially
  $: computeLayers();

  onMount(() => {
    observeSize();
    if (autoPlay) start();
  });

  onDestroy(() => {
      if (typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(rafId);
      }
      ro && ro.disconnect();
    });
</script>

<div
  bind:this={container}
  class="wave-container"
  style="--rotate: {rotate}deg; --stroke: {strokeWidth}px; --blend: {blendMode}; opacity: var(--waves-opacity, 1)"
  aria-hidden="true"
>
  <svg class="wave-field" width="100%" height="100%" viewBox="0 0 {Math.max(w,1)} {Math.max(h,1)}" preserveAspectRatio="none">
    {#each paths as d, i}
      <path
        d={d}
        stroke={layers[i]?.color || "currentColor"}
        fill="none"
        stroke-width={strokeWidth}
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
        style="mix-blend-mode: var(--blend)"
      />
    {/each}
  </svg>
</div>

<style>
  .wave-container {
    position: absolute;
    inset: 0;
    transform: rotate(var(--rotate));
    pointer-events: none;
  }
  .wave-field {
    display: block;
    width: 100%;
    height: 100%;
  }

  /* Optional: Respect reduced motion with CSS too */
  @media (prefers-reduced-motion: reduce) {
    .wave-container { opacity: 0.9; }
  }
</style>
