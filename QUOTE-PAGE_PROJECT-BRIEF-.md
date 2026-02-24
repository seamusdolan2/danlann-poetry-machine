# Quote Page — Claude Code Project Brief
**Project:** Flaneur 718 — Scroll Quote Experience  
**Author:** Séamus Dolan  
**Brief Version:** 2.0 — February 2026  
**Status:** Pre-build. Prototyping phase.

---

## A Note Before You Start

This is a creative brief, not a contract. The technical specs in here are real and should be followed. But the design decisions — typography, animation behavior, ornamental details, layout rhythm — these are starting points, not ceilings. If you see a better way, say so and try it. If a quote's mood calls for something that isn't in the animation pool, propose it. If a typeface combination feels more right than what's listed, use it. The goal is a page that feels like it was made by a thoughtful artist, not assembled from a checklist.

The author of this page has strong taste and wide references. He wants to collaborate, not just approve deliverables. Bring your own eye to this.

---

## What This Is

A single standalone WordPress page that displays one quote, lyric, poem excerpt, or passage at a time. Each scroll (desktop) or swipe (mobile) triggers an exit animation on the current quote and an entrance animation on a new one, chosen randomly from a curated array. No repeats until the full list cycles.

The experience is minimal, museum-quality, and contemplative. It should feel like something a serious artist or cultural institution made — not a website template. No header. No footer. No navigation. Nothing on the page except the quote, its attribution, and whatever the animation brings with it.

The content is extraordinarily wide-ranging: Ancient Greek poetry, Cormac McCarthy, Nine Inch Nails, Bukowski, Orwell, Aesop Rock, Dead Prez, Zen Buddhist masters, Mary Shelley, Donna Tartt, Terence McKenna, and original lines by the author himself. The page must hold all of this without flinching. A Sappho fragment and a hip-hop lyric about drugs should both feel completely at home here.

---

## Environment

| Property | Value |
|---|---|
| WordPress | 6.9.1 |
| Theme | Uncode v2.11.3 |
| GSAP | 3.12.5 (CDN) |
| ScrollTrigger | 3.12.5 (CDN) |
| CSS prefix | `fl718-` on all classes |
| Body class | `fl718-quotes-page` |

**Code injection path:**  
WordPress Dashboard → Uncode → Theme Options → Utility → CSS & JS  
CDN `<script>` tags go in the JS box BEFORE all custom code.

---

## WordPress Implementation — True Custom Template

This page uses a **custom PHP page template** that bypasses Uncode's header and footer entirely. Not a CSS hack — a clean PHP file that outputs only what we need.

### PHP Template File

Create `/wp-content/themes/uncode/page-quotes.php`:

```php
<?php
/*
 * Template Name: FL718 Quotes Page
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body class="fl718-quotes-page">
  <div id="fl718-quotes-root">
    <!-- JS renders everything here -->
  </div>
  <?php wp_footer(); ?>
</body>
</html>
```

**Then in WordPress:** New page → Page Attributes → Template → "FL718 Quotes Page"

The `wp_head()` and `wp_footer()` hooks stay so WordPress scripts (including injected GSAP and custom JS) still load correctly. Zero Uncode chrome.

### CSS Scoping

All CSS scoped to `body.fl718-quotes-page` to prevent bleed into other pages.

```css
body.fl718-quotes-page {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
```

---

## Visual Language

### The Atmosphere

Near-black with warmth. Not pure black — dark charcoal with amber undertones. A gallery at night. Light emerging from darkness.

The background **changes per quote**, transitioning smoothly with each scroll event (`transition: background-color 0.7s ease` on `body`). The shifts stay within a dark family — temperature and depth change, never brightness. The visitor experiences it as the light in a room changing, not the room itself.

**Mood palette — starting point, not final word:**

| Mood | Background | Character |
|---|---|---|
| `dark-raw` | `#171612` | Near-black, amber warmth |
| `tender-literary` | `#161b22` | Deep slate, blue undertone |
| `defiant-political` | `#1c1c1c` | True charcoal, neutral |
| `contemplative-ancient` | `#1a1510` | Warm brown-black |
| `wild-electric` | `#0f1520` | Deep navy-black |

If a quote's mood calls for a sixth or seventh category not listed here, add it.

### Type Color

Warm cream base: `#f5f0e8`. Not cold white — antique, handled, the color of a page that's been read. Attribution text: `#8a8278`, muted and subordinate.

Type color can also shift subtly per mood. A red-tinted cream for the darkest material. A cooler off-white for the most spare and contemporary. These are suggestions — follow the quotes' emotional logic.

### Layout System

Every quote carries a `layout` field. Three modes:

| Layout | Treatment | When to use |
|---|---|---|
| `left` | Full width, left-aligned. No max-width cap. | Default for most quotes — prose, lyrics, multi-line passages. Reads like encountering text on a wall or in a book. |
| `center` | `max-width: 65ch`, centered on stage. | Short lyric quotes, two-line couplets, poems with intentional short-line structure. |
| `display` | Full width, centered, type scaled up to `clamp(3rem, 7.5vw, 6.5rem)`. | Very short power statements (under ~10 words). Fills the viewport. |

Rules for `left` layout align left-edge, not centered. Attribution inherits left-align.

A thin 1px horizontal rule ornament (roughly 18–30% width depending on layout, low opacity) above and below the quote block is the only decoration — unless a specific quote calls for something else. Attribution sits small and subordinate below.

**Engine note:** `renderQuote()` applies `fl718-layout-[value]` as a class on `#fl718-quote-block` after the font and length classes. CSS layout classes must appear after length-based sizing rules so `display` overrides can win at equal specificity.

---

## Typography Inspirations

Six reference images were provided. Here is what each one contributes to this project. These are not mandates — they are a visual vocabulary to pull from.

---

**Inspiration 1 — Risograph/Letterpress Zine**  
A Spanish-language spread with mixed typefaces, two-color letterpress printing, illustrated motifs. Chaotic in a precise way — the chaos is controlled. What's useful here: **the idea of texture as presence**. Ink doesn't sit perfectly flat. Letters carry weight and grain. When we do a letterpress animation, the type should feel like it has mass. Also useful: mixing register within a single quote — one word in heavy block caps, the next in flowing italic. The page doesn't have to commit to one typographic voice per quote; it can code-switch within a quote.

**Inspiration 2 — Regeneration Manifesto (Book Spread)**  
Dark green cover, gold pages, bold modern sans at display scale. What's useful: **scale confidence**. A single headline taking up most of a page spread is not wasteful — it is authoritative. For the right quote, filling nearly the entire viewport with three or four words is the correct decision. The subordinate body text relationship — tiny caption vs. massive header — is exactly the attribution hierarchy we want.

**Inspiration 3 — The Daily Drip Zine**  
White background, editorial serif in italic + all-caps letter-spaced sans. The pill ornament. This is the closest reference to the page's base register — clean, editorial, unhurried. What's useful: **the serif/sans contrast as a pairing within one typographic moment**. The quote in italic serif, the attribution in tracked caps. The pill ornament is the right scale of decoration — restrained enough to earn its place. On a dark background, this same system reads as sophisticated rather than sterile.

**Inspiration 4 — Jorge Luis Borges Editorial Spread**  
Heavy condensed display type stacked in syllables, divided by strong horizontal rules. Cream ground, near-black type. What's useful: **treating the quote as an architectural object**. Words broken across lines not by syntax but by design. Stacked single words, each word its own line. The horizontal rule as a structural element, not a decoration. For a short, powerful quote — four to eight words — this stacked-word treatment with dividing rules could be extraordinary. Borges himself is in the quote collection; this treatment for that material would be a considered choice.

**Inspiration 5 — Botanicum Letterpress Cover**  
Woodblock-style display type, botanical illustration integrated into the letterforms, organic texture throughout. Cream ground. What's useful: **texture living inside the letters themselves, not on top of them**. For the ink-bleed and darkroom animations specifically, the type should feel like it has a material relationship with the surface — not clean vector shapes sitting on a background but marks being made. This is also the reference for a more organic, hand-drawn quality of letterform when the content calls for it.

**Inspiration 6 — Urban/Street Editorial**  
Dark background, heavy condensed white type, Shepard Fairey street art photography. Also: bright green spread with massive black type. What's useful: **the stencil quality of letterforms against dark**. For the defiant-political and dark-raw moods, type at maximum weight and minimum decoration is the correct call. No italics, no serifs — just compressed mass. Also useful from the green spread: the idea that an unexpected background color (not just variants of dark) could be the right choice for a specific wild or defiant quote.

---

## Typography System

Typography changes per quote, driven by the mood tag. There is no single typeface for the page. The font is part of the quote's atmosphere.

**Starting palette — 5 classes, expandable:**

| Class | Suggested Font | Character |
|---|---|---|
| `fl718-font-literary` | Playfair Display italic | Tender, editorial, elegant |
| `fl718-font-brutal` | Bebas Neue or Anton | Aggressive, architectural, defiant |
| `fl718-font-archival` | IM Fell English or Libre Baskerville | Old, weighted, classical, gravitas |
| `fl718-font-system` | DM Mono or Space Mono | Clean, precise, contemporary |
| `fl718-font-expressive` | Abril Fatface or Playfair Display Black | Large, theatrical, visceral |

These are suggestions, not locked choices. If you find a Google Font that better serves a mood, use it and note the substitution. The goal is a page that code-switches typographically the way the content code-switches emotionally.

**Sizing:**  
Standard quotes: `clamp(1.8rem, 4vw, 3.5rem)`  
Long quotes: `clamp(1.1rem, 2vw, 1.6rem)`  
Very short quotes (under 10 words): Consider going larger — `clamp(2.5rem, 6vw, 5rem)`

---

## Quote Data Structure

```javascript
const fl718Quotes = [
  {
    id: 1,
    text: "Go all the way. It could mean losing everything — wife, family, job. It could mean not eating for three or four days. It could mean freezing on a park bench. It could mean jail. It could mean mockery. Isolation. Ridicule. The non-understanding of family and friends. Go all the way. There is no other feeling like it. You will be alone with the gods, and the nights will flame with fire.",
    attribution: "— Charles Bukowski",
    source: "Roll the Dice",
    mood: "dark-raw",
    length: "long",
    animation: "letterpress",
    font: "fl718-font-brutal"
  },
  {
    id: 2,
    text: "Some things you must always be unable to bear. Injustice and outrage and dishonor and shame — no matter how young you are or how old you have got.",
    attribution: "— William Faulkner",
    source: null,
    mood: "defiant-political",
    length: "standard",
    animation: "paper-rip",
    font: "fl718-font-archival"
  }
  // all quotes follow this pattern
];
```

**Required fields:** `id`, `text`, `attribution`, `source` (or `null`), `mood`, `length`, `animation`, `font`, `layout`

---

## Animation Pool

17 animations. Randomly assigned per quote, no immediate repeats. Each has a distinct entrance and exit — they are not reverses of each other. The pool can grow. If a quote suggests an animation that isn't here, design it and add it.

---

**`paint-drip`**  
Entrance: Paint drips fall from top, accumulate into letters and words.  
Exit: Paint slides downward off screen, canvas tilts.  
Font: `fl718-font-expressive`

**`etch-a-sketch`**  
The full toy appears — red frame, white knobs, grey aluminum screen. Knobs spin (CSS rotate). Quote draws in constrained monospace outline strokes via SVG `stroke-dashoffset`. Grid-limited, mechanical, deliberate.  
Exit: Toy shakes — horizontal `translateX` oscillation — screen wipes.  
Font: `fl718-font-system` (inside the toy frame, which is the stage)  
*Note: The toy frame is a container — scale it to viewport. Knobs must remain visible on mobile.*

**`card-shuffle`**  
Entrance: Cards fed into shuffler, machine overloads, ejects words. Words tumble and snap into position.  
Exit: Words scatter off-screen.  
Font: `fl718-font-brutal`

**`paper-rip`**  
Entrance: CSS `clip-path` tear across screen. Quote already sitting behind it, waiting.  
Exit: Tear from opposite direction covers it again.  
Font: `fl718-font-literary`

**`marquee-bulb`**  
Entrance: Letters as individual bulb glyphs, flicker on sequentially. Uneven timing — some hesitate before catching.  
Exit: Bulbs pop off in cascade or reverse.  
Font: `fl718-font-archival`

**`pond-ripple`**  
Entrance: Stone skips across screen, radial SVG ripples at each contact, letters coalesce from interference.  
Exit: Ripples fade, text dissolves back.  
Font: `fl718-font-literary`

**`ikea-assembly`**  
Entrance: Word/letter components slide in from edges, snap and lock into place with impact ease.  
Exit: Disassembles in reverse.  
Font: `fl718-font-system`

**`data-dissolve`**  
Exit-only: Characters replaced one by one with random glyphs and numbers. Used as exit — entrance handled by a different effect.  
Font: `fl718-font-system`

**`string-stitch`**  
Entrance: Scattered letter-forms. SVG threads extend between them, pull taut, draw letters into position. Thread-lines faintly visible at rest.  
Exit: Threads go slack, letters drift apart.  
Font: `fl718-font-literary`

**`navigation-map`**  
Entrance: Compass roses, rhumb lines, dotted routes animate across screen. Lines converge — intersections spell the quote.  
Exit: Lines diverge and drift off-frame.  
Font: `fl718-font-archival`

**`darkroom-develop`**  
Entrance: Screen is flat grey. Quote materializes slowly — like photo paper in chemical developer. Darkest strokes emerge first.  
Exit: Image overexposes. Whites bloom outward until text is gone.  
Technical: SVG `feTurbulence` + `feDisplacementMap`, animated via GSAP.  
Font: `fl718-font-literary`

**`breath-on-glass`**  
Entrance: Letters materialize with blur-corona — damp, uneven, slightly warm. Resolve to sharp over 1.5–2 seconds.  
Exit: Condensation evaporates from outside in.  
Technical: CSS `filter: blur()` from ~6px to 0, slight opacity.  
Font: `fl718-font-literary`

**`letterpress`**  
Entrance: Each word drops from above, hits the page with compression ease. Texture artifact on arrival, settles.  
Exit: Letters lift off cleanly.  
Technical: GSAP `y` tween with `elastic.out` or `back.out`. Consider `scaleY` micro-compression on impact.  
Font: `fl718-font-brutal`

**`telegraph`**  
Entrance: Characters appear one by one — uneven cadence, clusters fast then a pause then more. Human, not mechanical.  
Exit: Characters deleted in random reverse bursts.  
Technical: `setTimeout` with randomized intervals.  
Font: `fl718-font-system`

**`smoke-dissolve`**  
Entrance: Turbulent smoke condenses from above, `feTurbulence` resolving into letterforms.  
Exit: Letters warp, drift upward, dissipate.  
Technical: SVG filter. CPU-intensive — use sparingly, pair with shorter quotes.  
Font: Any — the animation carries the weight.

**`ink-bleed`**  
Entrance: Letters emerge from smeared blooming ink blot — organic at edges, precise at center.  
Exit: Ink bleeds outward until form is unreadable.  
Technical: SVG `feTurbulence` + `feDisplacementMap`. This is ink, not light — distinct from `darkroom-develop`.  
Font: `fl718-font-archival`

**`held-breath`**  
Entrance: Screen holds still — 800–1200ms of complete stillness. Then the quote appears in a single immediate frame. No easing. No transition. It was always there.  
Exit: Slow imperceptible opacity fade over 3 seconds.  
Technical: The entrance IS the absence of animation. The timing of the silence is everything.  
Font: `fl718-font-literary`

---

## Scroll / Trigger Logic

One scroll event = one transition. Not one scroll tick — one discrete scroll gesture.

- Desktop: `wheel` event, debounced. One delta, one transition. Ignore velocity and magnitude.
- Mobile: `touchstart` / `touchend`, minimum ~50px vertical threshold.
- Keyboard: Arrow Up / Down also trigger.
- While a transition is in progress: input locked. No queuing. The current animation completes.

**Sequence:**
1. Scroll/swipe detected → lock input
2. Exit animation plays (~600–1000ms depending on animation)
3. Background color transition fires simultaneously with exit
4. Font class swaps during background transition
5. New quote selected from deck (see selection rules below)
6. Entrance animation plays
7. Input unlocked

### Quote Selection Rules

The deck is a Fisher-Yates shuffle of all quote indices, dealt one at a time until exhausted, then reshuffled. Three rules are enforced on every deck build:

1. **No same-quote repeat at deck boundary.** The first quote of a new deck cannot be the same as the last quote of the previous deck.

2. **No consecutive same-author or same-animation.** After shuffling, a separation pass scans the deck and swaps apart any adjacent quotes that share the same `attribution` or the same `animation` value. This also applies across the deck boundary — the first quote of a new deck is checked against the last quote of the previous deck. *(Added February 2026.)*

3. **Animation coverage in the first 20 quotes.** After shuffling, the first 20 slots are checked for representation of all 12 animation types. Any missing animation is pulled from deeper in the deck and swapped into a random position between slots 5–20. This guarantees the visitor sees every animation type within their first ~20 scrolls. *(Added February 2026.)*

Rules are applied in order: shuffle → coverage guarantee → adjacency separation. The adjacency pass runs last so it cleans up any conflicts introduced by coverage swaps.

---

## Long Quote Mode

Triggered by `length: "long"` or automatically if word count > 80.

- Font size: `clamp(1.1rem, 2vw, 1.6rem)`
- Max-width: `55ch`
- Line-height: `1.75`
- Some animations disabled (etch-a-sketch, card-shuffle) — fall back to breath-on-glass, letterpress, or held-breath

---

## Responsive / Mobile

- Swipe replaces scroll
- `clamp()` throughout — no breakpoint switching needed
- Etch-A-Sketch: toy frame scales to viewport, knobs always visible
- Touch: passive listeners where possible
- No horizontal overflow in any animation state

---

## GSAP Technical Notes — Known Production Bugs

These are documented in the project's WordPress/Uncode production reference. Read them before writing animation code.

**CDN load order — non-negotiable:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

**GSAP cannot target `::before` / `::after`**  
They are not DOM nodes. Use real `<span>` elements styled to look like pseudo-elements.

**`backgroundColor` silently fails against a CSS gradient**  
If an element has `background: linear-gradient(...)` in CSS, `backgroundColor` does nothing. Animate `background` directly, or use an opacity overlay.

**ScrollTrigger compound offset syntax is invalid**  
`end: 'bottom 80%-=400px'` silently breaks. Use `end: '+=400'` or clean two-keyword format.

**This page does NOT use ScrollTrigger for transitions**  
ScrollTrigger scrubs animations to scroll position. Quote transitions are triggered by events. Use `gsap.timeline()` called from the wheel/touch handler.

**Overflow scoping for Uncode:**
```css
body.fl718-quotes-page .post-wrapper,
body.fl718-quotes-page .uncont,
body.fl718-quotes-page #wrapper,
body.fl718-quotes-page .wrapper {
  overflow: visible !important;
  max-height: none !important;
  height: auto !important;
}
```

**Background color transition belongs to CSS, not GSAP:**  
`transition: background-color 0.7s ease` on `body.fl718-quotes-page`. Don't animate this with GSAP — let the cascade handle it.

---

## File Structure

**For prototyping — standalone HTML first. WordPress integration after concept is proven.**

```
/quote-page-proto/
  index.html          ← All-in-one prototype
  quotes.js           ← Quote data array
  /animations/
    paint-drip.js
    etch-a-sketch.js
    darkroom-develop.js
    ... one file per animation
```

**For WordPress production:**
```
/wp-content/themes/uncode/
  page-quotes.php     ← PHP shell only

Uncode → Theme Options → Utility → CSS & JS:
  [CSS box]           ← All styles, scoped to body.fl718-quotes-page
  [JS box]            ← GSAP CDN tags + full JS
```

---

## Prototyping Phases

**Phase 1 — Engine before animations.**  
Scroll event → quote swap → background transition → font class swap, with a simple fade. Prove the state machine is solid before adding visual complexity.

**Phase 2 — Six first animations, most technically distinct:**
1. `held-breath` — proves timing logic with zero animation
2. `letterpress` — GSAP y + ease, proves animation integration
3. `breath-on-glass` — CSS filter blur, proves filter pipeline
4. `telegraph` — setTimeout chain, proves character-level rendering
5. `paper-rip` — clip-path geometry, proves SVG/CSS animation
6. `darkroom-develop` — SVG filter, proves the hardest category

**Phase 3 — Remaining animations once Phase 2 is stable.**  
**Phase 4 — Full quote array populated.**

**What a good prototype looks like:**
- Scroll triggers a clean, locked transition
- Background shifts smoothly per quote
- Font changes with no flash of unstyled text
- At least 3 animations working and feeling cinematic
- Mobile swipe works
- Long quote mode renders correctly
- Nothing on the page that shouldn't be there

---

## Creative Latitude

These decisions are **open for your input and invention:**

- Specific typeface selections within each mood class
- Whether individual quotes deserve custom layout treatment (stacked single words, asymmetric positioning, oversized single-character display)
- Ornamental details beyond the thin rule — a fine border on the Etch-A-Sketch frame, a faint watermark, a progress indicator that is itself a design element rather than a UI widget
- Animation variations not in the pool — if a quote suggests one, propose and build it
- Whether some animations should have typographic behavior built into them (letters that arrive at different weights, words that scale differently based on their emotional load)
- Background color additions to the mood palette
- Color shifts within type per mood (warm cream vs. cooler off-white vs. a barely-there warm red)

The brief is thorough so you have context. It is not thorough because everything is decided. Bring a point of view.

---

## Tone

Quiet and cinematic. Museum or serious artist, not website template. The absence of things is a design decision. If an animation looks like it belongs on a marketing site, it's wrong. When in doubt, do less — and do that less thing with complete commitment.

---

*Brief v2.0 — February 2026 — Flaneur 718*
