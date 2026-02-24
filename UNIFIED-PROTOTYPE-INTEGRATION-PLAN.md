# Unified Prototype Integration Plan
**Project:** FL718 Quotes Page
**Date:** February 2026
**Status:** Approved — ready to build

Integrates all 12 animation demo files and the Phase 1 engine into a single working prototype at `quote-page-proto/index.html`.

---

## What We're Building

A new file: `quote-page-proto/index.html`. This is the Phase 1 engine with the hardcoded fade replaced by a dispatch router, all 12 animation functions ported in, and all supporting CSS and HTML structure added. The `quotes.js` file stays exactly as-is next to it.

---

## Step 1 — Create the New File from Phase 1

Copy `concepts/Phase 1/index.html` to `quote-page-proto/index.html` as the starting point. Update the `quotes.js` script tag path (it's already in the same folder). The base CSS, HTML structure, scroll hint, and input handlers all carry over unchanged.

---

## Step 2 — HTML Structure Additions

Three additions to the `<body>` beyond Phase 1's clean structure.

**SVG filter defs** (needed by `darkroom-develop` and `smoke-dissolve`):

```html
<svg id="fl718-svg-filters" style="display:none" aria-hidden="true">
  <defs>
    <!-- darkroom-develop -->
    <filter id="fl718-darkroom-filter"> ... </filter>
    <!-- smoke-dissolve -->
    <filter id="fl718-smoke-filter"> ... </filter>
  </defs>
</svg>
```

**Navigation map SVG container** (populated and cleared by the animation, persistent in HTML):

```html
<svg id="fl718-nav-map" ...></svg>
```

**Etch-a-sketch frame**: The animation injects and removes its own DOM entirely — no persistent element needed.

Note: No rip overlay or ink-bleed filter needed. Both were cut from the pool in session 16.

---

## Step 3 — CSS Additions

The Phase 1 CSS covers everything shared (mood colors, layout, fonts, rules, attribution). Each animation brings its own CSS block:

| Animation | What it needs |
|---|---|
| `etch-a-sketch` | Frame, screen, knob styles + `@keyframes` shake. Largest CSS block. |
| `navigation-map` | Coordinate label positioning, bearing line classes |
| `marquee-bulb` | `.fl718-bulb-lit` text-shadow glow + `@keyframes flicker` |
| `card-shuffle` | `perspective: 900px` on `#fl718-quotes-root` (for rotateY depth) |
| `string-stitch` | SVG overlay positioning |
| `pond-ripple` | Stone element CSS |
| `paint-drip` | Drip element CSS |
| `smoke-dissolve` / `darkroom-develop` | Nothing beyond the SVG filters |
| `letterpress` / `ikea-assembly` / `data-dissolve` | No new CSS needed |

---

## Step 4 — Engine Changes (the core work)

### 4a. Add `currentQuote` tracking

The engine currently only tracks `currentIndex`. The exit dispatcher needs to know the *current* quote's animation type. Add:

```javascript
var currentQuote = null;
```

Update `init()` and `transition()` to set it.

### 4b. Replace `transition()` with the dispatch router

Current Phase 1 `transition()` has a hardcoded GSAP timeline. Replace it with:

```javascript
function transition() {
  if (isTransitioning) return;
  isTransitioning = true;
  // ... dismiss scroll hint ...

  var idx = nextIndex();
  var nextQuote = fl718Quotes[idx];

  runExit(currentQuote, function() {
    currentIndex = idx;
    currentQuote = nextQuote;
    renderQuote(nextQuote);           // mid-transition swap, same as before
    runEntrance(nextQuote, function() {
      isTransitioning = false;
    });
  });
}
```

### 4c. The dispatch functions

```javascript
function runExit(quote, cb) {
  // null guard: first-load has no current quote
  if (!quote) { cb(); return; }
  switch (quote.animation) {
    case 'letterpress':      exitLetterpress(cb);    break;
    case 'darkroom-develop': exitDarkroom(cb);       break;
    case 'pond-ripple':      exitPondRipple(cb);     break;
    case 'string-stitch':    exitStringStitch(cb);   break;
    case 'card-shuffle':     exitCardShuffle(cb);    break;
    case 'etch-a-sketch':    exitEtchSketch(cb);     break;
    case 'navigation-map':   exitNavMap(cb);         break;
    case 'marquee-bulb':     exitMarqueeBulb(cb);    break;
    case 'smoke-dissolve':   exitSmoke(cb);          break;
    case 'paint-drip':       exitPaintDrip(cb);      break;
    case 'ikea-assembly':    exitIkea(cb);           break;
    case 'data-dissolve':    exitDataDissolve(cb);   break;
    default:                 simpleFade('out', cb);  break;
  }
}

function runEntrance(quote, cb) {
  // data-dissolve quotes carry an entrance override field
  var key = quote.entrance || quote.animation;
  switch (key) {
    case 'letterpress':      entranceLetterpress(quote, cb);     break;
    case 'darkroom-develop': entranceDarkroom(quote, cb);        break;
    case 'pond-ripple':      entrancePondRipple(quote, cb);      break;
    case 'string-stitch':    entranceStringStitch(quote, cb);    break;
    case 'card-shuffle':     entranceCardShuffle(quote, cb);     break;
    case 'etch-a-sketch':    entranceEtchSketch(quote, cb);      break;
    case 'navigation-map':   entranceNavMap(quote, cb);          break;
    case 'marquee-bulb':     entranceMarqueeBulb(quote, cb);     break;
    case 'smoke-dissolve':   entranceSmoke(quote, cb);           break;
    case 'paint-drip':       entrancePaintDrip(quote, cb);       break;
    case 'ikea-assembly':    entranceIkea(quote, cb);            break;
    case 'data-dissolve':    entranceSmoke(quote, cb);           break; // data-dissolve is exit-only; entrance always routes to smoke
    default:                 simpleFade('in', cb);               break;
  }
}
```

### 4d. `simpleFade` as the fallback utility

Keep the Phase 1 fade as a named utility. Used as: default branch in both dispatchers, reduced-motion global fallback, and internal fallbacks inside animations that don't support long quotes.

```javascript
function simpleFade(direction, cb) {
  if (direction === 'out') {
    gsap.to(block, { opacity: 0, y: -6, duration: 0.38, ease: 'power2.in', onComplete: cb });
  } else {
    gsap.fromTo(block, { opacity: 0, y: 7 }, { opacity: 1, y: 0, duration: 0.54, ease: 'power2.out', onComplete: cb });
  }
}
```

### 4e. Update `init()`

`init()` currently calls a hardcoded `gsap.fromTo` for the first quote. Change it to set `currentQuote = fl718Quotes[currentIndex]` after `renderQuote()`, then call `runEntrance(currentQuote, cb)` — so the first quote arrives with its own animation, not always a fade.

---

## Step 5 — Port Each Animation's Entrance and Exit Functions

All 12 animations, grouped by porting complexity.

### Group A — Straightforward ports (demo code translates directly)

- **`letterpress`** — word split + GSAP y + scaleY impact
- **`ikea-assembly`** — word split + x travel + rotateY + thwack + clearProps before each entrance
- **`marquee-bulb`** — char split + `buildTimestamps()` + CSS flicker class + exit surge/cut
- **`data-dissolve`** — char split + glyph substitution loop + fade (exit only; entrance routes to smoke-dissolve)
- **`smoke-dissolve`** — SVG filter proxy tween + y drift + `gsap.fromTo` for explicit from-state on each entrance
- **`darkroom-develop`** — CSS filter brightness/contrast curve + SVG displacement; remove filter on completion
- **`paint-drip`** — `buildDripSchedule()` + drip element fall + word snap-on-arrival + whole-block tilt exit

### Group B — Need SVG overlay management

- **`string-stitch`** — char scatter + `gsap.ticker` thread tracking + bezier sag exit; SVG overlay created/destroyed per transition
- **`pond-ripple`** — stone physics (parabolic arc) + SVG ripple rings with `mix-blend-mode: screen` + word group reveal on skip landing; stone and ripple elements created/destroyed per transition
- **`card-shuffle`** — `buildTimestamps()` with accelerating stagger + rotateY tumble + thwack + simultaneous scatter exit; `prevWasFallback` flag for long-quote breath-on-glass

### Group C — More complex coordination

- **`navigation-map`** — compass rose build + coordinate grid + bearing lines draw via `stroke-dashoffset` + word delivery at `tGroup` offset; all timeouts managed via `nmDelay()`/`nmClearTimers()` for clean rapid-scroll abort; exit retracts lines in reverse, collapses rose

### Group D — Stage takeover

- **`etch-a-sketch`** — injects the red frame DOM, hides `#fl718-quotes-root`, runs canvas draw with `document.fonts.ready` guard, escalating shake exit, wipes canvas, removes all injected DOM, restores root; long-quote fallback is telegraph (char-by-char setTimeout reveal — needs to exist as an internal utility, not a routed animation)

---

**Function signatures across all animations:**

```javascript
function entranceXxx(quote, cb) { ... }
function exitXxx(cb) { ... }
```

The `cb` is called when the animation is complete and the engine can set `isTransitioning = false`.

---

## Step 6 — Reduced Motion

One `prefers-reduced-motion` check at the top of both `runExit` and `runEntrance`. If the media query matches, both dispatchers skip directly to `simpleFade`. This replaces the individual checks scattered across each demo file with one global gate:

```javascript
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function runExit(quote, cb) {
  if (prefersReducedMotion || !quote) { simpleFade('out', cb); return; }
  // ... switch ...
}

function runEntrance(quote, cb) {
  if (prefersReducedMotion) { simpleFade('in', cb); return; }
  // ... switch ...
}
```

---

## Step 7 — Clean Up Demo Artifacts

Each demo file contains things that don't belong in the unified engine:

- **Remove:** Demo shuffle UI (prev/next buttons, quote counter badge, animation name badge)
- **Remove:** Per-animation fallback badges ("TELEGRAPH | LONG QUOTE")
- **Keep:** `#fl718-mockup-label` (useful during testing)
- **Keep:** Scroll hint UI

---

## Build Order Within This Step

Build in this sequence so the file is runnable at every stage:

1. HTML structure additions + SVG filters copied in
2. All animation CSS blocks merged in
3. `simpleFade` utility + full dispatch scaffolding wired — all branches fall through to `simpleFade`. File is fully runnable at this point; every quote transitions with a clean fade.
4. Port Group A animations (7 straightforward ports)
5. Port `card-shuffle` + `string-stitch` (Group B, simpler of the two)
6. Port `pond-ripple` + `navigation-map` (more coordination)
7. Port `etch-a-sketch` (stage takeover — test in isolation after porting)
8. Update `init()` so first quote uses its own entrance animation
9. Full test pass

---

## Test Checklist

- [ ] Every animation plays entrance and exit cleanly
- [ ] Rapid scroll during any animation does nothing (input lock holds)
- [ ] `data-dissolve` quotes exit with data-dissolve, enter with smoke-dissolve
- [ ] Long quotes use correct fallback for each animation (etch → telegraph, card-shuffle → breath-on-glass, etc.)
- [ ] Short/display quotes render correctly (oversized type, center layout)
- [ ] Background color transitions smoothly on each swap
- [ ] Font swap happens with no flash of unstyled text
- [ ] `prefers-reduced-motion` — all animations fall back to simple fade
- [ ] Mobile swipe works (50px threshold, passive listeners)
- [ ] First-load quote arrives with its own animation
- [ ] No console errors across all 87 quotes
- [ ] `navigation-map` PNG asset (`navigation-map.png`) path is correct relative to new file location
- [ ] Etch-a-sketch canvas clears and DOM is fully removed after exit

---

## What You'll Have at the End

A single `quote-page-proto/index.html` that runs the full experience — all 87 quotes, all 12 animations dispatching correctly, long-quote fallbacks in place, mobile swipe working, first quote arriving with its own animation.

That file maps 1:1 to the WordPress deployment:

| Prototype | WordPress |
|---|---|
| `<style>` block | Uncode → Theme Options → CSS box |
| `<script>` block | Uncode → Theme Options → JS box |
| `<body>` HTML | Custom HTML block in page editor |
| PHP template | Already written — `page-quotes.php` |

---

*FL718 Unified Prototype Integration Plan — February 2026 — Flaneur 718*
