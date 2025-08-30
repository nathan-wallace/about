<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  export let padding = 20;
  let pad = padding;
  $: pad = Math.min(padding, w * 0.1);

  export let shape = {
    lobes: 5,
    amplitude: 0.16,
    detail: 0.06,
    speed: 0.6,
    seed: 1
  };

  export let edge = {
    color: "#FFB703",
    secondary: "#FB8500",
    width: 3,
    glow: 10,
    dashLength: 22,
    gap: 14,
    speed: 60
  };

  export let middle = {
    ringColor: "rgba(255,255,255,0.65)",
    ringWidth: 1.5,
    shimmer: true,
    shimmerSpeed: 0.25
  };

  export let background = {
    colorA: "#0B1020",
    colorB: "#10203F",
    angle: 45
  };

  export let parallax = 0.25;
  export let scale = 0.0004;
  export let clipContent = true;
  export let respectReducedMotion = true;

  let host;
  let svgEl;
  let w = 1, h = 1;
  let rafId;
  let t0 = 0;
  let dashOffset = 0;
  let shimmerPhase = 0;
  let prefersReducedMotion = false;
  let isMobile = false;
  let mq;

  const dispatch = createEventDispatcher();

  function mulberry32(a) {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rand = mulberry32(shape.seed);

  const VERTS = 64;
  let baseNoise = Array.from({ length: VERTS }, () => rand());

  function blobPath(time) {
    const cx = w / 2, cy = h / 2;
    const rx = (w - pad * 2) / 2;
    const ry = (h - pad * 2) / 2;
    const A = shape.amplitude;
    const D = shape.detail;
    const L = Math.max(1, shape.lobes);
    const speed = shape.speed;

    const pts = [];
    for (let i = 0; i < VERTS; i++) {
      const theta = (i / VERTS) * Math.PI * 2;
      const big = Math.sin(theta * L + time * speed * Math.PI * 2);
      const small = Math.sin(theta * L * 2 + time * speed * 3.1 * Math.PI * 2 + baseNoise[i] * 6.283);
      const rfx = 1 + A * big + D * small * 0.6;
      const rfy = 1 + A * big * 0.9 + D * small * 0.6;
      const x = cx + rx * rfx * Math.cos(theta);
      const y = cy + ry * rfy * Math.sin(theta);
      pts.push({ x, y });
    }

    const tension = 0.5;
    function ctrl(a, b, c) {
      return { x: b.x + (c.x - a.x) * tension / 6, y: b.y + (c.y - a.y) * tension / 6 };
    }

    let d = "";
    for (let i = 0; i < pts.length; i++) {
      const p0 = pts[(i - 1 + pts.length) % pts.length];
      const p1 = pts[i];
      const p2 = pts[(i + 1) % pts.length];
      const p3 = pts[(i + 2) % pts.length];
      const c1 = ctrl(p0, p1, p2);
      const c2 = ctrl(p1, p2, p3);
      if (i === 0) d += `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
      d += ` C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)} ${c2.x.toFixed(2)} ${c2.y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
    }
    d += " Z";
    return d;
  }

  let ro;
  function observeSize() {
    ro = new ResizeObserver(([entry]) => {
      const cr = entry.contentRect;
      w = Math.max(1, cr.width);
      h = Math.max(1, cr.height);
    });
    ro.observe(host);
  }

  function loop(time) {
    if (!t0) t0 = time;
    const dt = (time - t0) / 1000;
    t0 = time;

    if (!prefersReducedMotion) {
      dashOffset -= edge.speed * dt;
      shimmerPhase += (middle.shimmer ? middle.shimmerSpeed : 0) * dt;
    }

    const t = prefersReducedMotion ? 0 : time / 1000;
    const d = blobPath(t);
    pathEdgeGlow.setAttribute("d", d);
    pathEdge.setAttribute("d", d);
    pathMiddleRing.setAttribute("d", d);
    pathClip.setAttribute("d", d);

    groupBg.setAttribute("transform", "scale(1.02)");
    groupMid.removeAttribute("transform");
    if (groupSlot) {
      if (!prefersReducedMotion && (parallax || scale) && !isMobile) {
        const rect = host.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const center = rect.top + rect.height / 2;
        const offset = center - viewportCenter;
        const translateY = -offset * parallax;
        const s = Math.max(0, 1 - Math.abs(offset) * scale);
        const transform = `translate(${(w / 2).toFixed(2)} ${(h / 2).toFixed(2)}) scale(${s.toFixed(3)}) translate(${(-w / 2).toFixed(2)} ${(-h / 2).toFixed(2)}) translate(0 ${translateY.toFixed(2)})`;
        groupSlot.setAttribute("transform", transform);
      } else {
        groupSlot.removeAttribute("transform");
      }
    }
    groupEdge.removeAttribute("transform");

    pathEdge.style.strokeDasharray = `${edge.dashLength} ${edge.gap}`;
    pathEdge.style.strokeDashoffset = `${dashOffset}`;
    gradShimmer.setAttribute("gradientTransform", `rotate(0 ${w/2} ${h/2}) translate(${(Math.sin(shimmerPhase*6.283)*w*0.15).toFixed(2)} 0)`);

    rafId = requestAnimationFrame(loop);
  }

  let pathEdge, pathEdgeGlow, pathMiddleRing, pathClip;
  let groupBg, groupMid, groupEdge, groupSlot, gradShimmer;
  function updateIsMobile(e) {
    isMobile = e.matches;
  }

  $: {
    if (svgEl) {
      gradShimmer = svgEl.querySelector("#mid-shimmer");
    }
  }

  onMount(() => {
    observeSize();
    const rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion = respectReducedMotion && rm ? rm.matches : false;
    if (window.matchMedia) {
      mq = window.matchMedia("(max-width: 768px)");
      updateIsMobile(mq);
      mq.addEventListener("change", updateIsMobile);
    }
    rafId = requestAnimationFrame(loop);
  });

  onDestroy(() => {
    // cancelAnimationFrame is not available during SSR
    if (typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(rafId);
    }
    ro && ro.disconnect();
    mq && mq.removeEventListener("change", updateIsMobile);
  });
</script>

  <div
    class="portal-cta"
    bind:this={host}
  >
  <svg
    class="portal-svg"
    bind:this={svgEl}
    width="100%"
    height="100%"
    viewBox="0 0 {Math.max(w,1)} {Math.max(h,1)}"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color={background.colorA} />
        <stop offset="100%" stop-color={background.colorB} />
      </linearGradient>

      <linearGradient id="mid-shimmer" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={w} y2="0">
        <stop offset="0%"   stop-color="rgba(255,255,255,0)" />
        <stop offset="40%"  stop-color="rgba(255,255,255,0)" />
        <stop offset="50%"  stop-color="rgba(255,255,255,0.32)" />
        <stop offset="60%"  stop-color="rgba(255,255,255,0)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0)" />
      </linearGradient>

      <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color={edge.color} />
        <stop offset="100%" stop-color={edge.secondary} />
      </linearGradient>

      <filter id="edge-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation={edge.glow / 2} result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <clipPath id="portal-clip">
        <path bind:this={pathClip} d="M0,0 h10 v10 h-10 z" />
      </clipPath>
    </defs>

    <!-- Deep background, clipped -->
    <g bind:this={groupBg} clip-path="url(#portal-clip)">
      <rect x="0" y="0" width={w} height={h} fill="url(#bg-grad)"></rect>
      <g opacity="0.18">
        {#each Array(50) as _, i}
          <circle cx={(i*73 % w)} cy={(i*127 % h)} r={(i%3)+0.5} fill="white" />
        {/each}
      </g>
    </g>

    <!-- Middle layer constrained by the blob path -->
    <g bind:this={groupMid} clip-path="url(#portal-clip)">
      <rect x="0" y="0" width={w} height={h} fill="url(#mid-shimmer)" opacity={middle.shimmer ? 1 : 0}/>
      <path bind:this={pathMiddleRing}
        d="M0,0 h10 v10 h-10 z"
        fill="none"
        stroke={middle.ringColor}
        stroke-width={middle.ringWidth}
        vector-effect="non-scaling-stroke"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    </g>

    <!-- Slot content -->
    <g bind:this={groupSlot} clip-path={clipContent ? "url(#portal-clip)" : undefined}>
      <foreignObject x="0" y="0" width={w} height={h}>
        <div class="cta-slot" xmlns="http://www.w3.org/1999/xhtml">
          <slot />
        </div>
      </foreignObject>
    </g>

    <!-- Edge strokes -->
    <g bind:this={groupEdge} style="pointer-events:none">
      <path
        bind:this={pathEdgeGlow}
        d="M0,0 h10 v10 h-10 z"
        fill="none"
        stroke="url(#edge-grad)"
        stroke-width={edge.width * 3}
        opacity="0.55"
        filter="url(#edge-glow)"
        vector-effect="non-scaling-stroke"
      />
      <path
        bind:this={pathEdge}
        d="M0,0 h10 v10 h-10 z"
        fill="none"
        stroke="url(#edge-grad)"
        stroke-width={edge.width}
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
</div>

<style>
  .portal-cta {
    position: relative;
    display: grid;
    place-items: center;
    isolation: isolate;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .portal-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .cta-slot {
    width: 100%;
    height: 100%;
    padding: var(--pad);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    text-align: center;
    margin: 0 auto;
  }
  .cta-slot :is(a, button) {
    position: relative;
  }
  .cta-slot :is(a, button):focus-visible {
    outline: 2px solid rgba(255,255,255,0.75);
    outline-offset: 2px;
    border-radius: 9999px;
  }
  @media (prefers-reduced-motion: reduce) {
    .portal-svg { filter: saturate(0.9); }
  }
</style>
