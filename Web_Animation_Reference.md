# Web Animation & JavaScript — Technical Reference

**Last Updated:** February 2026
**Projects:** Flaneur 718 About Me · Nook Nook Mats · FL718 Quotes Page

All animation patterns, JavaScript techniques, and CSS effects. Framework-agnostic and reusable across any web project. For WordPress/Uncode-specific patterns, see `WordPress-Uncode_Reference.md`.

---

## Tool Decision Guide

| Situation | Tool |
|---|---|
| Animation progress follows scroll position | GSAP ScrollTrigger with `scrub` |
| Animation plays once when element enters viewport | IntersectionObserver |
| Many small uniform elements pop in sequentially | CSS transitions + class toggle |
| One gesture = one discrete transition | `gsap.timeline()` from event handler |
| Background color follows a class change | CSS `transition` on the element |
| Animating multiple unrelated properties with custom math | `ScrollTrigger.create({ onUpdate })` |

---

## GSAP ScrollTrigger

### CDN Links (v3.12.5)

Add these **BEFORE** your custom animation code:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

```javascript
gsap.registerPlugin(ScrollTrigger);
```

### Basic Pattern

```javascript
gsap.to('.fl718-element', {
  opacity: 1,
  y: 0,
  scrollTrigger: {
    trigger: '.fl718-element',
    start: 'top 80%',       // When top of trigger hits 80% down viewport
    end: 'bottom 60%',
    scrub: 1,               // 1 second smoothing delay
    markers: false,         // Set true for debugging
  }
});
```

### Scrub Values

- `scrub: true` → Tied directly to scroll, no smoothing (can feel mechanical)
- `scrub: 0.5` → Fast response — good for text/color transitions
- `scrub: 1` → 1 second smoothing (recommended for most animations)
- `scrub: 1.8` → Weighted, luxurious feel — good for editorial contexts
- `scrub: 2` → Very smooth but can feel sluggish
- No scrub → Animation plays once when triggered (not tied to scroll position)

### Start/End Positions

Format: `"[trigger position] [viewport position]"`

- `start: 'top top'` → Top of element hits top of viewport
- `start: 'top 80%'` → Top of element hits 80% down viewport
- `start: 'center center'` → Center of element hits center of viewport
- `end: 'bottom top'` → Bottom of element hits top of viewport
- `end: '+=400'` → 400px past the start point (pixel offset from start)

### CRITICAL BUG: Invalid `end` Compound Offset Syntax

**Discovered:** February 16, 2026

❌ **This syntax is INVALID and silently fails:**
```javascript
end: 'bottom 80%-=400px',  // ❌ Compound offset — NOT supported
```

✅ **Use clean two-keyword format only:**
```javascript
end: 'bottom 50%',   // ✅ Simple and correct
end: '+=400',        // ✅ Pixel offset FROM the start point — also valid
```

**Why:** The `-=` operator is only valid inside GSAP `to()`/`from()` tweens. In `start`/`end` strings, it silently does nothing — no console error, just unexpected behavior.

### CRITICAL BUG: `backgroundColor` Cannot Override a CSS `background` Gradient

**Discovered:** February 16, 2026

**Symptom:** Animating `backgroundColor` with GSAP has no visual effect at all.

**Root Cause:** When CSS uses `background: linear-gradient(...)` (the shorthand property), GSAP's `backgroundColor` targets a *different* CSS property. The gradient wins in the cascade.

❌ **This silently fails:**
```css
.fl718-header { background: linear-gradient(to bottom, #ebebeb 0%, #f0ebe5 100%); }
```
```javascript
gsap.to('.fl718-header', { backgroundColor: '#FFFEF9' });  // ❌ No effect
```

✅ **Fix: Target `background` directly:**
```javascript
gsap.to('.fl718-header', { background: '#FFFEF9' });  // ✅ Overwrites the gradient
```

✅ **Alternative: Overlay div with opacity animation (GPU-accelerated, always reliable):**
```html
<div class="fl718-header-wrap">
  <div class="fl718-header-overlay"></div>
  <!-- content -->
</div>
```
```css
.fl718-header-wrap { position: relative; background: linear-gradient(...); }
.fl718-header-overlay { position: absolute; inset: 0; background: #FFFEF9; opacity: 0; pointer-events: none; }
```
```javascript
gsap.to('.fl718-header-overlay', { opacity: 1, scrollTrigger: { ... } });
```

**Quick diagnostic:** If a GSAP color animation does nothing, check whether the element uses `background: linear-gradient()` in CSS. If yes — switch to `background` or use the overlay pattern.

### CRITICAL: GSAP Cannot Target CSS Pseudo-elements

❌ **This will NOT work:**
```javascript
gsap.to('.element::after', { opacity: 1 });
// Error: GSAP target .element::after not found
```

✅ **Solution: Use real DOM elements instead of `::before`/`::after`.**
Pseudo-elements aren't real DOM nodes — JavaScript cannot access them.

### Common GSAP Animations

```javascript
// Fade in
gsap.from('.element', { opacity: 0, duration: 1 });

// Slide up
gsap.from('.element', { y: 50, opacity: 0, duration: 1 });

// Blur to sharp
gsap.to('.element', { filter: 'blur(0px)', duration: 1 });

// Photo paper development (text)
gsap.to('.fl718-thesis-text', {
  color: '#1a1a1a',
  filter: 'brightness(1) contrast(1)',
  scrollTrigger: {
    trigger: '.fl718-thesis-section',
    start: 'top 70%',
    end: 'center 30%',
    scrub: 0.5,
  }
});

// Horizontal scroll (vertical scroll drives horizontal movement)
gsap.to('.film-strip', {
  x: -maxScroll,
  ease: 'none',
  scrollTrigger: {
    trigger: '.film-section',
    start: 'top top',
    end: '+=3000',
    scrub: 1,
    pin: true,
    anticipatePin: 1,
  }
});
```

### Advanced GSAP Patterns

#### `gsap.set()` for Initial States

Prevents elements from flashing in their default state before animation starts:

```javascript
// Set initial state instantly (no animation)
gsap.set(artifact, { opacity: 0, x: -280, y: -90, rotation: 20 });
// Then animate from that state
gsap.to(artifact, { opacity: 1, x: 0, y: 0, rotation: -2, duration: 0.8, ease: 'power3.out' });
```

#### `overwrite: 'auto'` for Hover Conflicts

Prevents hover animations from conflicting with ongoing scroll animations:

```javascript
artifact.addEventListener('mouseenter', () => {
  gsap.to(artifact, {
    y: -15, scale: 1.05, duration: 0.35, ease: 'power2.out',
    overwrite: 'auto',  // Cancels only conflicting properties
  });
});
```

#### `gsap.delayedCall()` for Post-Animation Adjustments

More organized than nested `setTimeout`, automatically paused/resumed with GSAP's globalTimeline:

```javascript
gsap.delayedCall(3.8, () => {
  gsap.to('.artifact--postcards', { x: '+=5', y: '-=3', rotation: '+=0.6', duration: 0.28 });
});
```

#### `.call()` Inside a Timeline — Mid-Animation DOM Swap

The key to seamless content transitions: swap content during the invisible frame between exit and entrance:

```javascript
gsap.timeline()
  .to(block, { opacity: 0, y: -6, duration: 0.38, ease: 'power2.in' })

  // .call() fires between tweens — element is invisible, safe to swap
  .call(function () {
    block.textContent = newQuote.text;
    block.className = newQuote.font;
    body.className = 'fl718-quotes-page fl718-mood-' + newQuote.mood;
    gsap.set(block, { y: 7 });  // Reposition for entrance without animation
  })

  .to(block, { opacity: 1, y: 0, duration: 0.54, ease: 'power2.out' });
```

#### Outer/Inner Nesting — Scrub + Entrance on the Same Element

**Discovered:** February 17, 2026

**Problem:** When you want (a) a one-shot entrance animation AND (b) a continuous parallax scrub on the same element, GSAP conflicts because both tweens own the `y` property — the scrub clobbers the entrance animation's `y` on every scroll tick.

**Solution:** Separate onto different DOM nodes.

```html
<!-- Outer: ONLY the scrub parallax Y -->
<div class="nook-photo-outer">
  <!-- Inner: ONLY the entrance animation -->
  <div class="nook-photo-inner">
    <img src="product.jpg" />
  </div>
</div>
```

```javascript
// Outer: ScrollTrigger scrub — runs continuously while scrolling
gsap.to('.nook-photo-outer', {
  y: -80, ease: 'none',
  scrollTrigger: { trigger: '.section', start: 'top bottom', end: 'bottom top', scrub: 1.8, invalidateOnRefresh: true }
});

// Inner: One-shot entrance — runs once, never clobbered
gsap.set('.nook-photo-inner', { y: -120, opacity: 0, rotateZ: -2.8 });
gsap.to('.nook-photo-inner', { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.25 });
```

**General rule:** Any time two GSAP tweens targeting the same CSS property would run concurrently — separate them onto different DOM nodes.

---

## IntersectionObserver

### Setup Template (Start Here)

```javascript
// 1. Flag to prevent re-triggering
let animationTriggered = false;

// 2. Create observer
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // 3. Check intersection AND flag
    if (entry.isIntersecting && !animationTriggered) {
      animationTriggered = true;

      // 4. Clear any whitespace
      entry.target.textContent = '';

      // 5. Trigger animation
      setTimeout(() => yourAnimationFunction(entry.target), 300);

      // 6. Unobserve to prevent re-trigger
      animationObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,              // Low threshold for reliability
  rootMargin: '0px 0px 150px 0px'  // Triggers just before section is in view
});

// 7. Set up immediately (script at end of body — DOM is already ready)
const target = document.querySelector('.my-animated-element');
if (target) {
  animationObserver.observe(target);
} else {
  console.warn('Animation target element not found');
}
```

**Script placement rule:**
- Script in `<head>` with `defer` → Use `DOMContentLoaded`
- Script at end of `<body>` → Run immediately, no wrapper needed

### rootMargin Timing Guide

| Value | Feel | Use Case |
|-------|------|----------|
| `-200px` | Very late | Element well into viewport |
| `-100px` | Late | Ensure element is visible first |
| `0px` | Default | Trigger at viewport edge |
| `50px` | Slightly early | Subtle anticipation |
| `100px` | Early | Animation ready when visible |
| **`150px`** | **Sweet spot** | Just before user focuses on element |
| `200px` | Very early | Aggressive pre-loading |
| `300px+` | Too early | Risk triggering before visible |

**Iterative timing process:** Start at `-100px` (conservative). If user says "too slow" → move to `+300px`. If user says "too fast" → split the difference at `+150px`. Finding the sweet spot is UX work — requires real scrolling feedback, not code inspection.

### Common Pitfalls

**1. DOMContentLoaded wrapper at end of `<body>`** — Event has already fired by the time scripts at end of body run. Drop the wrapper and run immediately.

**2. Strict `textContent === ''` check** — HTML formatting adds whitespace: `"\\n  "` fails `=== ''`. Use `el.textContent.trim() === ''` or a flag-based prevention.

**3. Threshold too high** — Fast scrolling skips past the trigger window. Use `threshold: 0.05–0.1` for animations that must trigger.

**4. No re-trigger prevention** — Use `observer.unobserve(entry.target)` after trigger, or a `triggered` flag. Without it, the animation fires every time the element enters the viewport.

**5. rootMargin confusion** — Negative values trigger LATER (element must be further in). Positive values trigger EARLIER (element triggers before entering).

### Threshold Values

- `0.05–0.1` → Best for animations that must trigger (widest window)
- `0.2–0.3` → Good for lazy loading images
- `0.5+` → Use when you want element well into viewport

### Debugging IntersectionObserver

```javascript
// Step 1: Verify observer is created
console.log('Observer created:', animationObserver);

// Step 2: Check element exists
const el = document.querySelector('.my-element');
console.log('Target element:', el);

// Step 3: Add logging to callback
const observer = new IntersectionObserver((entries) => {
  console.log('Observer fired, entries:', entries.length);
  entries.forEach(entry => {
    console.log({ isIntersecting: entry.isIntersecting, ratio: entry.intersectionRatio, target: entry.target });
  });
});

// Step 4: Test manually in browser console
yourAnimationFunction(document.querySelector('.my-element'));
```

---

## CSS Transitions + Class Toggle

### Sequential Pop-In with Spring Bounce

**Discovered:** February 16, 2026

Use this instead of GSAP stagger when: many small uniform elements (dots, icons, grid items) need a one-time spring-bounce entry. CSS handles the easing; JS just toggles a class.

```css
.nook-journey-dot {
  opacity: 0;
  transform: scale(0);
  /* Spring/bounce easing */
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 0.2s ease;
  will-change: transform, opacity;
}

.nook-journey-dot.visible {
  opacity: 1;
  transform: scale(1);
}
```

```javascript
const dots = document.querySelectorAll('.nook-journey-dot');
dots.forEach((dot, index) => {
  setTimeout(() => dot.classList.add('visible'), index * 70);  // 70ms stagger
});
```

**Chaining onto an existing sequence:** Calculate when the preceding animation ends, then start the stagger from that offset + 100ms buffer:
```javascript
// Blob CSS transition starts at 2500ms, takes 1200ms → finishes at 3700ms
// Dots start at 3800ms (100ms buffer)
dots.forEach((dot, index) => {
  setTimeout(() => dot.classList.add('visible'), 3800 + (index * 70));
});
```

**Spring easing reference:** `cubic-bezier(0.34, 1.56, 0.64, 1)` — satisfying overshoot-and-settle "bounce pop". Timing guidelines: 60–80ms stagger, 0.4–0.6s duration.

### CSS Color "Settle" Effect

Make a word appear in an accent color, then slowly cool to neutral. Set `transition` BEFORE changing `color` — setting them simultaneously risks missing the transition:

```javascript
gsap.to(sentence, { opacity: 1, y: 0, duration: 0.8, delay: 1.4,
  onComplete() {
    setTimeout(() => {
      launched.style.transition = 'color 1.6s ease'; // transition first
      launched.style.color = '#2B2B2B';              // then change
    }, 500); // pause so reader sees the accent state
  }
});
```

### Body Class Mood System

For page-level background/color changes, set CSS custom properties on the body class. One JavaScript line drives everything else via CSS:

```css
body.fl718-mood-dark-raw         { background-color: #171612; --fl718-text: #f5ede0; }
body.fl718-mood-tender-literary  { background-color: #161b22; --fl718-text: #eef2f8; }

.fl718-quote-text {
  color: var(--fl718-text, #f5f0e8);
  transition: color 0.7s ease;
}
```

```javascript
body.className = 'fl718-quotes-page fl718-mood-' + quote.mood;
```

**Also:** Set a CSS `transition` on the body for background color — when JavaScript changes the body class, CSS handles the smooth shift automatically. No GSAP needed.

```css
body.fl718-quotes-page {
  transition: background-color 0.7s ease;
}
```

---

## Typewriter Effects

### Basic Typewriter

```javascript
function typewriterEffect(element, text, speed = 80) {
  let index = 0;
  element.classList.add('typing');

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      const variableSpeed = speed + (Math.random() * 40 - 20);  // Irregular like human typing
      setTimeout(type, variableSpeed);
    } else {
      setTimeout(() => {
        element.classList.remove('typing');
        element.classList.add('typed');
      }, 500);
    }
  }
  type();
}
```

### Blinking Cursor

```css
.fl718-title.typing::after {
  content: '|';
  animation: blink 0.7s infinite;
  margin-left: 2px;
}

.fl718-title.typed::after { display: none; }

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
```

### Variable Speed with Punctuation Pauses

```javascript
async function typewriterEffect(element, fullText) {
  for (let i = 0; i < fullText.length; i++) {
    element.textContent = fullText.substring(0, i + 1);
    const speed = fullText[i] === ',' || fullText[i] === '.'
      ? 200           // Pause on punctuation
      : 50 + Math.random() * 30;  // Variable: 50–80ms
    await new Promise(resolve => setTimeout(resolve, speed));
  }
}
```

### Character-Level Typewriter with Glow (Technological Effect)

**Discovered:** February 18, 2026

Split text into individual character spans, animate each with a color glow:

```javascript
function splitTextIntoChars(textElement) {
  const text = textElement.textContent;
  textElement.textContent = '';
  [...text].forEach(char => {
    const span = document.createElement('span');
    span.className = char === ' ' ? 'char space' : 'char';
    span.textContent = char;
    textElement.appendChild(span);
  });
}

function technoTypewriter(container, speed = 40, glowColor = 'rgba(0, 255, 0, 0.8)') {
  container.querySelectorAll('.char').forEach((char, index) => {
    setTimeout(() => {
      char.style.color = '#00ff00';
      char.style.textShadow = `0 0 10px ${glowColor}`;
      char.style.opacity = '1';
      setTimeout(() => {
        gsap.to(char, { color: 'inherit', textShadow: '0 0 0px rgba(0,255,0,0)', duration: 0.3 });
      }, 100);
    }, index * speed);
  });
}
```

```css
/* CRITICAL: inline, not inline-block */
.char { display: inline; opacity: 0; }
.char.space { white-space: pre; }  /* Preserve space width */
```

### CRITICAL BUG: `display: inline-block` Collapses Whitespace in Character Spans

**Problem:** All spaces disappear — words run together ("Behindthesenumberslivedadifferentstory").

**Root Cause:** `display: inline-block` collapses all whitespace nodes between elements.

❌ `display: inline-block` on `.char`
✅ `display: inline` on `.char` + `white-space: pre` on `.char.space`

**Rule:** Always use `display: inline` for character-level text manipulation.

---

## Scroll Animation Patterns

### Compression Animation (Multi-Dimensional Scroll Effects)

**Discovered:** February 18, 2026

Use `ScrollTrigger.create({ onUpdate })` to simultaneously animate multiple properties based on scroll progress. Better than regular tweens when you need custom math or precise RGB interpolation.

```javascript
ScrollTrigger.create({
  trigger: section,
  start: 'top bottom',
  end: 'bottom top',
  scrub: 1.6,
  onUpdate(self) {
    const p = self.progress;  // 0 to 1

    // Compress container width: 720px → 320px
    container.style.maxWidth = Math.round(720 - p * 400) + 'px';

    // Shift text color cooler: rgb(107,107,107) → rgb(140,142,145)
    const r = Math.round(107 + p * 33);
    const g = Math.round(107 + p * 35);
    const b = Math.round(107 + p * 38);

    // Fade opacity: 1.0 → 0.6
    const alpha = (1 - p * 0.4).toFixed(3);

    document.querySelectorAll('.conclusion-para').forEach(el => {
      el.style.color = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    });
  }
});
```

**RGB color interpolation formula:**
```javascript
const r = Math.round(startR + p * (endR - startR));
// Use Math.round() for all pixel/integer values
// Use .toFixed(3) for opacity/alpha values
```

**Emotional applications:**
- Narrowing width → compression, claustrophobia, constriction
- Shifting colors cooler → emotional distance, detachment
- Reducing opacity → fading away, memory dissolving

### Layered Parallax Depth Effect

Create a convincing z-depth illusion by applying different Y travel amounts per element:

```javascript
const parallaxRates = [-80, -50, -24]; // farther back → closer to viewer

document.querySelectorAll('.nook-photo-outer').forEach((outer, i) => {
  gsap.to(outer, {
    y: parallaxRates[i],
    ease: 'none',
    scrollTrigger: {
      trigger: '.section', start: 'top bottom', end: 'bottom top',
      scrub: 1.8, invalidateOnRefresh: true,
    }
  });
});
```

**Rate ratio (3:2:1) matters more than absolute values. Negative values (elements move up as you scroll down) create the most natural parallax feel.**

---

## Visual Effect Patterns

### Scrapbook "Falling In" Effect

```css
.fl718-artifact {
  opacity: 0;
  transform: translateY(-60px) rotate(5deg);
  will-change: transform, opacity;
}

.fl718-artifact--visible {
  opacity: 1;
  transform: translateY(0) rotate(-2deg);
  transition: opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1),
              transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

```javascript
function animateScrapbook() {
  const artifacts = document.querySelectorAll('.fl718-artifact');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    artifacts.forEach(a => a.classList.add('fl718-artifact--visible'));
    return;
  }
  artifacts.forEach((artifact, index) => {
    setTimeout(() => {
      const rotation = (Math.random() * 6 - 3);
      artifact.style.setProperty('--final-rotation', `${rotation}deg`);
      artifact.classList.add('fl718-artifact--visible');
    }, index * 400);  // 400ms stagger
  });
}
```

**Timing guidelines:** 3–3.5s initial delay (paragraph reading time), 300–400ms stagger between items.

### Hover "Lift Off" Effect

```css
.fl718-artifact {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.4s ease;
}

.fl718-artifact:hover {
  transform: translateY(-12px) rotate(0deg) scale(1.08);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  z-index: 100;
}
```

### Polaroid Development Effect

Mimics real Polaroid instant film chemistry progression.

```css
.fl718-photo__image {
  filter: brightness(0.3) contrast(0.5) saturate(0);
  will-change: filter;
}

.fl718-photo--developing .fl718-photo__image {
  animation: polaroidDevelop 4s ease-out forwards;
}

@keyframes polaroidDevelop {
  0%   { filter: brightness(0.3) contrast(0.5) saturate(0); }
  25%  { filter: brightness(0.6) contrast(0.7) saturate(0.3); }
  50%  { filter: brightness(0.85) contrast(0.9) saturate(0.7); }
  100% { filter: brightness(1) contrast(1) saturate(1); }
}
```

```javascript
const photoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting && !entry.target.classList.contains('fl718-photo--developing')) {
      setTimeout(() => entry.target.classList.add('fl718-photo--developing'), index * 1000);
      photoObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3, rootMargin: '-100px' });
```

### Film Strip with Sprocket Holes

```css
.fl718-film-strip {
  position: relative;
  background: #000;
  padding: 30px 40px;
  border-radius: 2px;
}

/* Sprocket holes via repeating gradient */
.fl718-film-strip::before,
.fl718-film-strip::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  width: 8px;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px, transparent 8px,
    #fff 8px, #fff 16px,
    transparent 16px, transparent 28px
  );
}

.fl718-film-strip::before { left: 5px; }
.fl718-film-strip::after  { right: 5px; }

/* Edge codes in Kodak orange */
.fl718-film-strip__edge-left,
.fl718-film-strip__edge-right {
  position: absolute;
  font-family: 'Courier New', monospace;
  font-size: 8px;
  font-weight: 700;
  color: #ff6600;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  letter-spacing: 1px;
}
```

### Film Perforation Bar Transition

**Discovered:** February 15, 2026 — Use to mark chapter transitions on narrative/photography pages.

```html
<div class="fl718-transition-perforation">
  <div class="fl718-perforation-left">
    <div class="fl718-perf-row"><div class="fl718-perforation-hole"></div><div class="fl718-perforation-hole"></div></div>
    <div class="fl718-perf-row"><div class="fl718-perforation-hole"></div><div class="fl718-perforation-hole"></div></div>
    <div class="fl718-perf-row"><div class="fl718-perforation-hole"></div><div class="fl718-perforation-hole"></div></div>
  </div>
  <div class="fl718-perforation-right">
    <!-- same structure as left -->
  </div>
  <div class="fl718-transition-film-code">Kodak Tri-X 400</div>
</div>
```

```css
.fl718-transition-perforation {
  position: relative; width: 100%; background: #000000;
  height: 60px; display: flex; align-items: center; justify-content: center;
}

.fl718-perforation-hole { width: 7px; height: 7px; background: #ffffff; border-radius: 1px; }

/* IMPORTANT: Use a unique class name here — .fl718-film-edge-code is used elsewhere */
.fl718-transition-film-code {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  font-family: 'Courier New', monospace; font-size: 12px; font-weight: 700;
  color: #ff6600; letter-spacing: 4px; text-transform: uppercase; white-space: nowrap;
}
```

**CRITICAL:** Use unique class names for each section's edge code elements. See "CSS Naming & Conflict Prevention" below.

### Hand-Drawn SVG Selection Marks

```html
<div class="fl718-frame__hand-drawn">
  <svg viewBox="0 0 196 196" xmlns="http://www.w3.org/2000/svg">
    <!-- Intentionally wobbly path -->
    <path d="M 4,10 Q 6,8 12,7 L 95,5 Q 140,4 188,7 Q 192,9 193,15 L 194,90 Q 195,140 192,186 Q 190,191 185,192 L 100,194 Q 50,195 8,193 Q 4,192 3,187 L 2,100 Q 1,50 4,10" />
  </svg>
</div>
```

```css
.fl718-frame__hand-drawn path {
  fill: none;
  stroke: rgba(255, 107, 157, 0.8);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: selectionDraw 0.6s ease-out forwards;
}

@keyframes selectionDraw {
  to { stroke-dashoffset: 0; opacity: 1; }
}
```

### Blur-to-Focus Typography

```css
.fl718-transform-word {
  filter: blur(3px);
  opacity: 0.4;
  color: #999;
  font-weight: 400;
  letter-spacing: 0.05em;
  display: inline-block;
  transition: all 0.8s ease-out;
}
```

```javascript
document.querySelectorAll('.fl718-transform-word').forEach((word, index) => {
  gsap.to(word, {
    filter: 'blur(0px)', opacity: 1, letterSpacing: '-0.02em',
    color: '#1a1a1a', fontWeight: 700,
    scrollTrigger: { trigger: '#transform-section', start: 'top 60%', end: 'bottom 70%', scrub: 1 },
    delay: index * 0.15,
  });
});
```

### Scroll-Based Color Wash Overlay

```html
<section class="fl718-chapter">
  <div class="fl718-chapter__bg-overlay"></div>
  <div class="fl718-chapter__content">Content</div>
</section>
```

```css
.fl718-chapter { position: relative; background: linear-gradient(to bottom, #f0ebe5 0%, #e8a87c 100%); }
.fl718-chapter__bg-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, #d4664a 0%, #e8a87c 100%);
  opacity: 0; z-index: 1; pointer-events: none;
}
.fl718-chapter__content { position: relative; z-index: 10; }
```

```javascript
gsap.to('.fl718-chapter__bg-overlay', {
  opacity: 0.6,
  scrollTrigger: { trigger: '.fl718-chapter', start: 'top bottom', end: 'bottom top', scrub: 1 }
});
```

---

## Counting & Number Animations

### Simple Count-Up with easeInQuad

**Discovered:** February 18, 2026 — Use for spreadsheet cells, statistics, financial figures.

```javascript
function animateCount(element, targetValue, duration = 1200) {
  const startTime = Date.now();
  const interval = setInterval(() => {
    const progress = Math.min((Date.now() - startTime) / duration, 1);
    const eased = progress * progress;  // easeInQuad: starts slow, accelerates
    element.textContent = Math.round(targetValue * eased).toLocaleString();
    if (progress >= 1) {
      clearInterval(interval);
      element.textContent = targetValue.toLocaleString();  // Exact final value
    }
  }, 16);  // ~60fps
}
```

**Number formatting:**
```javascript
value.toLocaleString('en-US');                         // 50,000
value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });  // $50,000.00
```

### Departure Board Rank Ticker

A number counts down from a large starting value to a small target with a "live data locking in" flicker effect.

```javascript
const START = 43000, END = 10, DURATION = 2600;
function easeInCubic(t) { return t * t * t; }

const startTime = Date.now();
const tick = setInterval(() => {
  const progress = Math.min((Date.now() - startTime) / DURATION, 1);
  const eased = easeInCubic(progress);

  // Flicker: large noise early, silenced at 92% for a clean landing
  const noise = progress < 0.92
    ? Math.floor((Math.random() - 0.5) * (1 - eased) * 800)
    : 0;

  tickNum.textContent = Math.max(END, Math.round(START - eased * (START - END) + noise)).toLocaleString();

  if (progress >= 1) {
    clearInterval(tick);
    tickNum.textContent = END.toString();
    tickNum.classList.add('landed');  // CSS handles color change
    badge.classList.add('show');      // "Top 10" label fades in
  }
}, 16);
```

### Easing Functions Reference

```javascript
function easeInQuad(t)    { return t * t; }               // Starts slow, ends fast — debt, growth
function easeOutQuad(t)   { return t * (2 - t); }         // Starts fast, ends slow — countdowns
function easeInOutQuad(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }  // Smooth both ends
function easeInCubic(t)   { return t * t * t; }           // Dramatic — exponential growth
```

### Easing Direction Should Match Physical Behavior

**Discovered:** February 2026

The direction (`in` vs `out`) should reflect what's physically happening. Using the wrong direction makes motion feel mechanical even when timing is correct.

| Physical behavior | Correct ease | Why |
|---|---|---|
| Paper tearing | `ease-in` (slow → fast) | Resistance first, then sudden release |
| Object thrown | `ease-out` (fast → slow) | Initial force decays as it travels |
| Heavy object falling | `ease-in` | Gravity accelerates continuously |
| Door slamming | `ease-in` | Slow swing, hard impact at end |
| Drawer sliding open | `ease-in-out` | Resistance at start AND end |
| Ball bouncing (rise) | `ease-in` | Decelerates against gravity |

```javascript
// ✅ Paper tear — resistance then release
gsap.to(panelTop, { y: '-100%', duration: 0.88, ease: 'power2.in' });

// ❌ Wrong for paper — feels thrown, not torn
gsap.to(panelTop, { y: '-100%', duration: 0.88, ease: 'power2.out' });
```

**Asymmetry adds realism:** Real material doesn't release uniformly. Give sequential elements slightly different durations — top panel at 0.88s, bottom at 1.00s — so they read as fibers snapping at different points, not a mechanical split.

---

## Complex/Cinematic Animations

### Parabolic Flight Path (No MotionPath Plugin)

**Discovered:** February 17, 2026

Animate `x` and `y` as independent tweens with different easing to create a realistic arc:

```javascript
const DELAY = 2.2;
// X: linear (constant horizontal speed, like real flight)
gsap.to(planeWrap, { x: W + 220, duration: 3.1, delay: DELAY, ease: 'none' });

// Y: parabola — two tweens that must sum to the same total duration as X
gsap.to(planeWrap, { y: H * 0.36, duration: 1.55, delay: DELAY,        ease: 'power2.out' }); // rise
gsap.to(planeWrap, { y: H * 0.56, duration: 1.55, delay: DELAY + 1.55, ease: 'power2.in'  }); // fall

// Rotation follows the arc slope (use power1 — gentler than position)
gsap.to(plane, { rotate: -4, duration: 1.55, delay: DELAY,        ease: 'power1.out' }); // nose up
gsap.to(plane, { rotate: 11, duration: 1.55, delay: DELAY + 1.55, ease: 'power1.in'  }); // nose down
```

**Wrapper/child separation:** Wrap the plane in an outer `<div>` to animate `x`/`y` independently from `rotate` — GSAP stores all transforms on one matrix; animating both on the same element causes conflicts.

```html
<div id="nook-plane-wrap">   <!-- x, y (flight path) -->
  <img id="nookPlane" ... /> <!-- rotate (tilt angle) -->
</div>
```

### Canvas Trail Dots

Track a GSAP-animated element in real time and draw a fading dot trail behind it:

```javascript
function drawTrail() {
  const pr = nookPlane.getBoundingClientRect();   // plane in screen coords
  const sr = ch3Intro.getBoundingClientRect();    // section in screen coords

  // Convert to section-local, track near the nose (not dead center)
  const px = pr.left + pr.width * 0.7 - sr.left;
  const py = pr.top + pr.height * 0.4 - sr.top;

  const dist = Math.hypot(px - lastDotX, py - lastDotY);
  if (dist >= DOT_GAP) {
    dots.push({ x: px, y: py, born: Date.now() });
    lastDotX = px; lastDotY = py;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const now = Date.now();
  for (let i = dots.length - 1; i >= 0; i--) {
    const dot = dots[i];
    const age = (now - dot.born) / DOT_LIFE;
    if (age >= 1) { dots.splice(i, 1); continue; }
    const alpha = (1 - age) * 0.5;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 168, 130, ${alpha})`;
    ctx.fill();
  }

  if (trailActive || dots.length > 0) requestAnimationFrame(drawTrail);
}
```

### SVG Grid Sequential Drawing

```javascript
function createAnimatedGrid(container, width, height, spacing = 40) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width); svg.setAttribute('height', height);
  svg.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none';

  const lines = [];
  // Create horizontal lines
  for (let i = 0; i <= Math.ceil(height / spacing); i++) {
    const y = i * spacing;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 0); line.setAttribute('y1', y);
    line.setAttribute('x2', width); line.setAttribute('y2', y);
    line.setAttribute('stroke', 'rgba(0,255,0,0.3)'); line.setAttribute('stroke-width', '1');
    line.setAttribute('stroke-dasharray', width); line.setAttribute('stroke-dashoffset', width);
    svg.appendChild(line); lines.push(line);
  }
  // Vertical lines — same pattern with x/y swapped
  container.appendChild(svg);
  return lines;
}

// Animate sequentially with glow
lines.forEach((line, index) => {
  setTimeout(() => {
    line.style.stroke = 'rgba(0,255,0,0.6)';
    line.style.filter = 'drop-shadow(0 0 3px rgba(0,255,0,0.8))';
    gsap.to(line, {
      attr: { 'stroke-dashoffset': 0 }, duration: 0.18, ease: 'none',
      onComplete: () => {
        gsap.to(line, { filter: 'drop-shadow(0 0 0px rgba(0,255,0,0))', attr: { stroke: 'rgba(0,255,0,0.3)' }, duration: 0.3 });
      }
    });
  }, index * 45);
});
```

### Sequential Network Node/Line Reveal

```javascript
function revealNetwork(container, stagger = 600) {
  const nodes = container.querySelectorAll('.network-node');
  const lines = container.querySelectorAll('.network-line');
  gsap.set([nodes, lines], { opacity: 0 });
  gsap.set(lines, { attr: { 'stroke-dashoffset': (i, t) => {
    const len = t.getTotalLength();
    t.setAttribute('stroke-dasharray', len);
    return len;
  }}});

  let delay = 0;
  nodes.forEach((node, index) => {
    gsap.to(node, { opacity: 1, duration: 0.4, delay, ease: 'power2.out' });
    if (index < lines.length) {
      gsap.to(lines[index], { opacity: 1, attr: { 'stroke-dashoffset': 0 }, duration: 0.5, delay: delay + 0.2, ease: 'none' });
    }
    delay += stagger / 1000;
  });
}
```

### Mini Bar Chart with CSS Height Transitions

```html
<div class="nook-summit-mini-ladder">
  <div class="nook-summit-mini-bar" data-h="28"></div>
  <div class="nook-summit-mini-bar is-you" data-h="100"></div>
</div>
```

```css
.nook-summit-mini-ladder { display: flex; gap: 5px; align-items: flex-end; height: 28px; }
.nook-summit-mini-bar { width: 9px; height: 0; border-radius: 1px; background: var(--nook-tan); flex-shrink: 0; }
```

```javascript
function raiseBars(ladderEl) {
  gsap.to(ladderEl, { opacity: 1, duration: 0.25 });
  ladderEl.querySelectorAll('.nook-summit-mini-bar').forEach((bar, i) => {
    setTimeout(() => {
      bar.style.transition = 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      bar.style.height = bar.dataset.h + '%';
    }, i * 50);
  });
}

function resetBars(ladderEl) {
  ladderEl.querySelectorAll('.nook-summit-mini-bar').forEach(bar => {
    bar.style.transition = 'none';  // MUST disable transition before resetting
    bar.style.height = '0';
  });
}
```

### Multi-Element Synchronized Blink (Game Over Effect)

```css
@keyframes gameOverBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.15; }  /* 0.15, not 0 — elements stay slightly visible */
}

.game-over-blink {
  animation: gameOverBlink 0.4s ease-in-out 4;  /* 4 blinks = 1.6s total */
}
```

```javascript
function triggerGameOverBlink(elements) {
  elements.forEach(el => el.classList.add('game-over-blink'));
  setTimeout(() => elements.forEach(el => el.classList.remove('game-over-blink')), 1600);
}
```

---

## Event-Driven Architecture (Quotes / Carousel Pages)

### Event-Driven vs Scroll-Driven

| | Scroll-Driven (ScrollTrigger) | Event-Driven |
|---|---|---|
| Trigger | Scroll position (continuous) | Gesture detected (discrete) |
| Tool | `gsap.to()` with `scrollTrigger: {}` | `gsap.timeline()` from event handler |
| Reversible | Yes — scrubs forward and back | No — plays to completion |
| Input lock needed | No | Yes |
| Examples | Parallax, fade-on-scroll, pinned sections | Quote transitions, carousels, modals |

### State Machine — Input Locking During Transitions

```javascript
let isTransitioning = false;

function transition() {
  if (isTransitioning) return;  // Hard stop — not even queued
  isTransitioning = true;

  gsap.timeline({
    onComplete: function () { isTransitioning = false; }  // Unlock when fully done
  })
  .to(block, { opacity: 0, y: -6, duration: 0.38, ease: 'power2.in' })
  .call(function () { renderNextQuote(); gsap.set(block, { y: 7 }); })
  .to(block, { opacity: 1, y: 0, duration: 0.54, ease: 'power2.out' });
}
```

### Wheel Event — One Gesture, One Transition

**Use a cooldown boolean, NOT `clearTimeout` debounce.** Debounce waits until scroll stops. Cooldown fires immediately, then ignores for N ms.

```javascript
var wheelCooldown = false;
window.addEventListener('wheel', function () {
  if (wheelCooldown) return;
  wheelCooldown = true;
  setTimeout(function () { wheelCooldown = false; }, 150);
  transition();
}, { passive: true });
```

**`passive: true`:** Tells the browser this listener won't call `preventDefault()`, allowing scroll optimization. Use on all wheel/touch listeners unless you specifically need to prevent default scroll.

### Touch Swipe Detection

```javascript
var touchStartY = 0;
window.addEventListener('touchstart', function (e) {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', function (e) {
  var dy = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(dy) >= 50) transition();  // 50px minimum — filters out taps
}, { passive: true });
```

### Keyboard Navigation

```javascript
window.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ') {
    e.preventDefault();  // Stop browser scroll — must come BEFORE transition()
    transition();
  }
});
```

### Fisher-Yates Shuffle — No-Repeat Random Sequence

```javascript
function buildDeck(excludeIndex) {
  var indices = quotes.map(function(_, i) { return i; });
  // Fisher-Yates shuffle
  for (var i = indices.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = indices[i]; indices[i] = indices[j]; indices[j] = tmp;
  }
  // Prevent immediate repeat
  if (excludeIndex !== undefined && indices[0] === excludeIndex && indices.length > 1) {
    indices.push(indices.shift());
  }
  return indices;
}

var deck = [];
var currentIndex = null;
function nextIndex() {
  if (deck.length === 0) deck = buildDeck(currentIndex);
  return deck.shift();
}
```

### Post-Shuffle Adjacency Separation

**Discovered:** February 2026 (FL718 Quotes Page)

When a shuffled deck contains items with metadata fields (author, animation type, mood), a pure Fisher-Yates shuffle can place items with the same field value consecutively. This post-shuffle pass scans and swaps apart any adjacent items that share a disallowed field match.

```javascript
function separateAdjacent(indices, excludeIndex) {
  var maxPasses = 4;
  for (var pass = 0; pass < maxPasses; pass++) {
    var swapped = false;
    for (var i = 0; i < indices.length - 1; i++) {
      var a = items[indices[i]];
      var b = items[indices[i + 1]];
      if (a.author === b.author || a.category === b.category) {
        // Find nearest non-conflicting index to swap with
        for (var k = i + 2; k < indices.length; k++) {
          var candidate = items[indices[k]];
          var conflictsLeft = (candidate.author === a.author || candidate.category === a.category);
          var conflictsRight = (k < indices.length - 1) ?
            (candidate.author === items[indices[k + 1]].author ||
             candidate.category === items[indices[k + 1]].category) : false;
          var conflictsPrev = (k - 1 > i + 1) ?
            (b.author === items[indices[k - 1]].author ||
             b.category === items[indices[k - 1]].category) : false;
          if (!conflictsLeft && !conflictsRight && !conflictsPrev) {
            var tmp = indices[i + 1]; indices[i + 1] = indices[k]; indices[k] = tmp;
            swapped = true; break;
          }
        }
      }
    }
    // Also check position 0 against the excluded (previous deck's last) index
    if (excludeIndex !== undefined && indices.length > 1) {
      var prev = items[excludeIndex];
      var first = items[indices[0]];
      if (prev.author === first.author || prev.category === first.category) {
        for (var k = 1; k < indices.length; k++) {
          var candidate = items[indices[k]];
          if (candidate.author !== prev.author && candidate.category !== prev.category) {
            var tmp = indices[0]; indices[0] = indices[k]; indices[k] = tmp;
            swapped = true; break;
          }
        }
      }
    }
    if (!swapped) break;
  }
}
```

**How it works:** For each adjacent pair that conflicts, find the nearest element further in the deck that can be swapped in without creating new conflicts with its neighbors on either side. Multiple passes (up to 4) handle cascading conflicts. The `excludeIndex` check ensures separation also holds across deck boundaries (the last item of the previous cycle vs. the first of the new one).

**Safe when:** No single field value accounts for more than ~40% of the total items. For the FL718 quote set (Orwell at 11/102 ≈ 11%), this resolves in 1–2 passes.

### Post-Shuffle Category Coverage Guarantee

**Discovered:** February 2026 (FL718 Quotes Page)

When items belong to multiple categories (e.g., 12 animation types) and the deck is large (100+ items), a pure shuffle can leave some categories absent from the first N items the user sees. This pass ensures every category appears within an early window.

```javascript
function ensureCategoryCoverage(indices, items, categoryKey, windowSize) {
  var allCategories = {};
  for (var i = 0; i < items.length; i++) {
    allCategories[items[i][categoryKey]] = true;
  }
  var covered = {};
  var limit = Math.min(windowSize, indices.length);
  for (var i = 0; i < limit; i++) {
    covered[items[indices[i]][categoryKey]] = true;
  }
  for (var cat in allCategories) {
    if (covered[cat]) continue;
    for (var k = limit; k < indices.length; k++) {
      if (items[indices[k]][categoryKey] === cat) {
        // Swap into a random mid-window position (avoid first few for natural feel)
        var insertAt = Math.floor(limit * 0.25) + Math.floor(Math.random() * (limit * 0.75));
        var tmp = indices[insertAt]; indices[insertAt] = indices[k]; indices[k] = tmp;
        break;
      }
    }
  }
}
```

**Run order matters:** Coverage first, then adjacency separation. The adjacency pass cleans up any same-category neighbors introduced by the coverage swaps.

**Use when:** A carousel, playlist, or content feed has N category types and you want the user to experience all of them within their first ~2N interactions, without forcing a rigid rotation.

### IIFE Pattern for JavaScript Isolation

```javascript
(function () {
  'use strict';
  // All variables are scoped here — nothing leaks to window
  var isTransitioning = false;
  function init() { /* ... */ }
  init();
})();
```

**Different from block scope `{}`** — IIFE creates true function scope, works in older browsers, cleaner for a complete module.

---

## CSS Techniques

### `mix-blend-mode: multiply` — Remove White Image Backgrounds

When you have a PNG/JPG with a white background that should appear seamlessly on a cream/white background, `mix-blend-mode: multiply` makes the white areas invisible without re-exporting as transparent PNG.

```css
.nook-paper-plane {
  mix-blend-mode: multiply;
  /* White areas → invisible; colored/dark areas → preserved */
}
```

**How it works:** White (1.0, 1.0, 1.0) × any color = that color → white becomes transparent. **Limitation:** Only works over light backgrounds. For dark backgrounds, use `mix-blend-mode: screen` (makes black transparent instead).

### `white-space: pre-line` for Mixed Prose and Poetry

```css
.fl718-quote-text {
  white-space: pre-line;
  /* Preserves \n newlines, collapses multiple spaces, wraps at container width */
}
```

In JS data:
```javascript
text: "Normal prose wraps automatically.",           // No \n needed
text: "your life is your life\ndon't let it be clubbed into dank submission.", // \n = line break
```

| Value | Spaces | Newlines | Wraps |
|---|---|---|---|
| `normal` | Collapsed | Ignored | Yes |
| `pre` | Preserved | Preserved | No |
| `pre-wrap` | Preserved | Preserved | Yes |
| **`pre-line`** | **Collapsed** | **Preserved** | **Yes** ← usually right for text data |

### `clamp()` for Fluid Responsive Typography

```css
/* clamp(minimum, preferred, maximum) */
font-size: clamp(2.4rem, 6vw, 5rem);    /* Short display quotes */
font-size: clamp(1.8rem, 4vw, 3.5rem);  /* Standard quotes */
font-size: clamp(1.05rem, 1.9vw, 1.55rem); /* Long quotes */
font-size: clamp(0.52rem, 0.9vw, 0.74rem); /* Attribution */
```

Use `clamp()` for smooth continuous scaling. Use breakpoints for layout changes. They can coexist.

### `100dvh` — Dynamic Viewport Height for Mobile

```css
#fl718-quotes-root {
  height: 100vh;   /* Fallback for older browsers */
  height: 100dvh;  /* Always reflects the current visible viewport */
}
```

`100vh` is unreliable on mobile — it includes browser chrome. `100dvh` updates as the address bar shows/hides. Browser support: all modern browsers (2023+).

### `pointer-events: none` for Overlay Elements

Allows clicks through decorative overlays (Polaroid development, film edge codes, SVG marks):

```css
.fl718-photo__overlay {
  pointer-events: none;  /* Clicks pass through to image beneath */
}
```

### Initial Opacity — CSS Sets It, GSAP Reveals It

To prevent a flash of visible content before JS/GSAP runs:

```css
#fl718-quote-block { opacity: 0; }  /* CSS: invisible from first paint */
```

```javascript
gsap.fromTo(block, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' });
```

**Rule:** If GSAP is responsible for showing an element, CSS should set the initial hidden state.

### `blockquote` and `cite` Browser Resets

```css
blockquote { margin: 0; padding: 0; }  /* Removes 40px side margins */
cite { font-style: normal; }           /* cite is italic by default in all browsers */
```

### CSS `:nth-child()` Breaks When Wrapping Elements

When you wrap elements in a new parent `<div>`, all wrapped children become `:nth-child(1)` of their new parent:

```css
/* ❌ Before wrapping: works. After wrapping: all match nth-child(1) */
.photo-ph:nth-child(2) { background: #c8b89a; }

/* ✅ ID selectors survive any HTML restructuring */
#nook-pc1 { background: #d4c4b0; }
#nook-pc2 { background: #c8b89a; }
```

**Rule:** If you use `:nth-child()` to style specific items and might ever wrap them, use IDs or unique classes per item instead.

### CRITICAL: `clip-path` Percentages Are Relative to the Element, Not the Viewport

**Discovered:** February 2026

`clip-path` polygon percentages are relative to the **element's own bounding box**, not the viewport. This causes silent misalignment when clipping fixed-position panels that are smaller than the viewport.

❌ **Panels that should meet at viewport center don't:**
```css
#fl718-panel-top    { position: fixed; top: -5%;    height: 60%; }
#fl718-panel-bottom { position: fixed; bottom: -5%; height: 60%; }
```
```javascript
// y: 50% = 50% of 60%vh element = 30%vh from element top
// Top panel clip edge lands at 25%vh — not 50%vh
// Bottom panel clip edge lands at 75%vh — 50% gap in the middle
applyTearLine(tearPts);  // tearPts all have y ≈ 50% — silently wrong
```

✅ **Fix: Make elements full-height so percentage coordinates map 1:1 to viewport:**
```css
#fl718-panel-top,
#fl718-panel-bottom {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 100vh; height: 100dvh;
  /* Now y: 50% in clip-path = exactly 50% of viewport. No math required. */
}
```

**Rule:** When `clip-path` percentages need to correspond to specific viewport positions, make the element `100dvh` from `top: 0`. The coordinates become `1:1` with the viewport and the geometry is always correct.

### `filter: drop-shadow` Is Invisible When Element Color Matches Background

**Discovered:** February 2026

A dark `drop-shadow` on a dark element over a dark background has nowhere to contrast — it's visually undetectable. The same logic applies to any shadow color that matches the surface it's cast onto.

❌ **Shadow disappears:**
```css
/* Panel matches page background — dark shadow on dark = invisible */
#fl718-panel { background-color: #1c1c1c; filter: drop-shadow(0px 5px 12px rgba(0,0,0,0.8)); }
```

✅ **Use a light-colored shadow on dark elements:**
```css
/* Warm glow along the panel edge — visible against dark backgrounds */
#fl718-panel-top    { filter: drop-shadow(0px 4px 14px rgba(245, 237, 224, 0.45)); }
#fl718-panel-bottom { filter: drop-shadow(0px -4px 14px rgba(245, 237, 224, 0.45)); }
```

**Also applies to the panel itself:** If an overlay panel needs to read as a visible surface (not just its edge), give it a color that's distinguishably different from the background — even a subtle difference (`#2a2318` vs `#171612`) reads as a separate material.

**Rule:** On dark-background pages, all shadow effects need light shadow colors. Dark shadows only work when cast onto light surfaces.

---

## CSS Variable Aliasing for Section Integration

**Discovered:** February 18, 2026

When integrating a standalone concept section (with its own variable naming) into a production file (different design system), map the concept names to the system names in `:root`. Zero refactoring of section CSS required.

```css
:root {
  /* Main design system */
  --nook-terracotta:    #d4664a;
  --nook-cream-warm:    #FFFEF9;
  --nook-text-charcoal: #2B2B2B;

  /* Aliases: map concept naming → system variables */
  --cream:    var(--nook-cream-warm);
  --terra:    var(--nook-terracotta);
  --charcoal: var(--nook-text-charcoal);
}
```

The concept section's CSS uses `--cream`, `--terra`, etc. unchanged. Variables resolve to system values at runtime.

**Use when:** Integrating standalone sections, preserving the original concept file intact, or managing multiple sections with different naming conventions.

---

## CSS Naming & Conflict Prevention

### Multi-Section Class Name Conflicts

**Discovered:** February 15, 2026

When the same class name is defined twice in a large CSS file, the later definition wins. This causes silent failures — your CSS changes appear to do nothing because another definition further down the file is overwriting them.

**Debugging "my CSS changes don't work":**

1. Verify changes were saved (re-read the file)
2. Search for all instances of the class name — count them
3. Find which definition comes last in the file (that one wins)
4. Check DevTools → Styles panel: crossed-out rules show what's being overridden
5. Hard refresh the browser (see `WordPress-Uncode_Reference.md`)

**Prevention:**
```css
/* ✅ Each section's components get unique class names */
.fl718-hero-edge-code { }        /* Hero only */
.fl718-transition-film-code { }  /* Transition bar only */
.fl718-ch4-film-edge-code { }    /* Chapter 4 only */
```

### Image Loading Issues

**Gray placeholder rectangles:** Check:
1. **URL encoding** — `file://` protocol requires spaces encoded as `%20`. Only for local testing.
2. **Wrong class on `<img>` tag** — if `.fl718-photo__image` was designed as a container div (for Polaroid blur effects), applying it directly to `<img>` applies the blur filter to the image.
3. **Unwanted CSS filters** — check computed styles for `filter: brightness(3.5) contrast(0.05) blur(6px)`.

```css
/* Override Polaroid effects when not needed */
.fl718-photo-grid .fl718-photo__image {
  filter: none !important;
  background: transparent;
}
```

---

## Performance & Mobile Optimization

### Disable Heavy Animations on Mobile

```css
@media (max-width: 768px) {
  .fl718-element { opacity: 1; transform: none; }
  .fl718-transform-word { filter: none !important; }
  .fl718-parallax-element { transform: none !important; }
}
```

### GPU-Accelerated Properties

```css
/* ✅ GPU accelerated — smooth 60fps */
.fl718-smooth {
  transform: translateY(50px);
  opacity: 0;
}

/* ❌ Forces layout recalculation */
.fl718-slow {
  top: 50px;        /* Triggers relayout */
  visibility: hidden; /* Triggers repaint */
}
```

### will-change

```css
/* Only on elements actively animating */
.fl718-animating { will-change: transform, opacity; }

/* Remove after animation completes */
.fl718-animating.complete { will-change: auto; }
```

```javascript
// Set via JS and clean up when done
element.style.willChange = 'transform, opacity';
gsap.to(element, {
  opacity: 1, y: 0, duration: 1,
  onComplete: () => { element.style.willChange = 'auto'; }
});
```

**Warning:** Don't use `will-change` on many elements simultaneously — it's memory intensive.

### Mobile Detection for JS

```javascript
const isMobile = window.innerWidth <= 768;
if (!isMobile) {
  // Full desktop animations
} else {
  gsap.to('.element', { opacity: 1, duration: 0.3 });  // Simple mobile fallback
}
```

**Chrome DevTools mobile emulation is NOT accurate for animation performance.** Always test on actual iOS/Android devices.

### Accessibility — Reduced Motion

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateScrapbook() {
  if (prefersReducedMotion) {
    artifacts.forEach(a => a.classList.add('fl718-artifact--visible'));
    return;
  }
  // Regular staggered animation for users who prefer motion
}
```

---

## Useful Code Snippets

### Sleep/Delay

```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animate() {
  element.classList.add('visible');
  await sleep(1000);
  element.classList.add('complete');
}
```

### Prevent Animation Re-trigger

```javascript
let animationTriggered = false;
function myAnimation() {
  if (animationTriggered) return;
  animationTriggered = true;
  // animation code
}
```

### Random Number in Range

```javascript
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}
const rotation = randomRange(-5, 5);
```

### Debounce (Wait Until Scroll Stops)

```javascript
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    // Scroll ended
  }, 100);
});
```

**Note:** This pattern waits until scroll STOPS. For one-gesture-one-event navigation, use the cooldown boolean pattern instead (documented in Event-Driven Architecture above).

---

## Concept File → Production Integration Workflow

**Discovered:** February 18, 2026

Build experimental sections in standalone HTML files, then integrate into production cleanly.

### Integration Order

1. **Create CSS variable aliases** in `:root` of production file (before copying any CSS)
2. **Copy CSS** — paste entire section CSS block; variables resolve via aliases
3. **Copy HTML** — find the narrative position, add with section comments
4. **Copy JavaScript** — add at end of script block, wrapped in block scope `{}` to prevent variable conflicts

```javascript
// Existing animations...

// ============================================
// CHAPTER 4: THE DESCENT ANIMATIONS
// ============================================
{
  // Paste JavaScript from concept file — block scope prevents variable conflicts
}
```

5. **Hard refresh** and verify: no console errors, colors resolve correctly, animations trigger, no layout breaks in surrounding sections

### CSS Variable Aliasing

See the CSS Variable Aliasing section above.

### Common Integration Issues

**Animations don't trigger:**
```javascript
console.log(document.getElementById('my-section'));  // Is it in the DOM?
// Add debug logging to observer callback
if (entry.isIntersecting) console.log('Triggered:', entry.target);
```

**CSS variables don't resolve:**
```javascript
const el = document.querySelector('.descent-section');
console.log(getComputedStyle(el).background);  // Should show hex values, not var(...)
```
Fix: Verify aliases are in `:root`, not scoped to a class.

**Conflicting animation timings:** Use unique IDs for all animation observers, wrap JavaScript in block scope `{}`, use `unobserve()` after trigger, ensure timing doesn't overlap with adjacent sections.

### Best Practices

✅ Test concept file thoroughly before integrating
✅ Create CSS variable aliases before copying CSS
✅ Copy in order: CSS → HTML → JavaScript
✅ Use block scope `{}` for JavaScript
✅ Add section comments for organization
✅ Hard refresh after each major addition
❌ Don't integrate untested or broken concept code
❌ Don't copy JavaScript before HTML (elements won't exist yet)
❌ Don't trust browser cache (always hard refresh)

---

## Character-Level GSAP Transforms: `inline-block` + `white-space: pre`

**Discovered:** February 2026 (FL718 string-stitch animation)

### The Core Tension

Two different character-splitting patterns exist, and choosing the wrong one is a silent bug.

| Need | Use | Space handling |
|---|---|---|
| Opacity only (telegraph) | `display: inline` | Works automatically — spaces are text flow |
| GSAP `x`/`y` transforms | `display: inline-block` | **Spaces collapse — requires fix** |

GSAP `x` and `y` transforms require `display: inline-block` (or `block`). They silently do nothing on `display: inline` elements.

### The Space Collapse Bug

When splitting text into character spans with `display: inline-block`, the space character inside a span collapses to nothing:

```
"Paths are made" → renders as "Pathsaremade"
```

Root cause: a single space inside an `inline-block` element is subject to `white-space: normal` collapsing. The span has width/height, but the space character inside it renders as zero.

### The Fix

Apply `white-space: pre` to space spans only. This forces the space character to render at its natural font width.

```css
.fl718-char {
  display: inline-block;  /* required for GSAP x/y transforms */
  will-change: transform, opacity;
}
.fl718-space {
  white-space: pre;       /* preserves the space character — prevents collapse */
}
```

```javascript
function splitIntoChars(el) {
  var html = '';
  el.textContent.split('').forEach(function(ch) {
    if (ch === '\n') {
      html += '<br>';
    } else if (ch === ' ') {
      html += '<span class="fl718-char fl718-space"> </span>';
    } else {
      html += '<span class="fl718-char">' + ch + '</span>';
    }
  });
  el.innerHTML = html;
  return el.querySelectorAll('.fl718-char');
}
```

**Do not** use `display: inline` as a workaround — GSAP transforms won't animate on inline elements. The `white-space: pre` on space spans is the correct fix.

### Previous Entry (still valid for opacity-only animations)

The existing note "Always use `display: inline` for character-level text manipulation" applies specifically when you only need opacity changes (telegraph pattern). Once you need positional transforms, switch to `inline-block` + `white-space: pre`.

---

## `gsap.ticker` for Real-Time SVG Path Tracking

**Discovered:** February 2026 (FL718 string-stitch animation)

When SVG elements need to visually connect GSAP-animated DOM nodes (threads connecting characters, lines between objects), the SVG paths must update every frame as positions change.

### The Pattern

Use `gsap.ticker.add(fn)` to register a callback that fires at the animation frame rate (typically 60fps). The callback reads `getBoundingClientRect()` on animated spans and updates SVG path `d` attributes.

```javascript
var activePaths = [];   // SVG <path> elements
var activeChars = [];   // Character spans being animated

function tickerUpdate() {
  for (var i = 0; i < activePaths.length; i++) {
    var r1 = activeChars[i].getBoundingClientRect();
    var r2 = activeChars[i + 1].getBoundingClientRect();
    var x1 = r1.left + r1.width * 0.5;
    var y1 = r1.top  + r1.height * 0.5;
    var x2 = r2.left + r2.width * 0.5;
    var y2 = r2.top  + r2.height * 0.5;
    activePaths[i].setAttribute('d', makePath(x1, y1, x2, y2));
  }
}

// Start tracking
gsap.ticker.add(tickerUpdate);

// Stop tracking when animation ends (always clean up)
gsap.ticker.remove(tickerUpdate);
```

### Why Not `onUpdate` on the Stagger Tween?

A stagger `onUpdate` fires once per element per frame, not once per frame total. For N characters with a stagger, that's N×60 calls per second instead of 60. `gsap.ticker` is a single callback per frame regardless of how many elements are animating — the correct tool for this pattern.

### SVG Setup

The SVG overlay must be fixed-position, full-viewport, with `pointer-events: none` and `overflow: visible`:

```html
<svg id="fl718-thread-svg" style="
  position: fixed; top: 0; left: 0;
  width: 100vw; height: 100dvh;
  pointer-events: none; overflow: visible; z-index: 20;
" aria-hidden="true"></svg>
```

`overflow: visible` is required — paths connecting elements near the edges will extend beyond the SVG bounding box otherwise.

### Getting Thread Color From the Live Document

To match SVG stroke color to CSS custom property text colors:

```javascript
var color = getComputedStyle(quoteEl).color;
// Returns resolved rgb() value — works after mood class is applied to body
path.setAttribute('stroke', color);
```

Call this after `render()` sets the mood class, not before.

---

## SVG Quadratic Bezier Sag Animation (Proxy Tween)

**Discovered:** February 2026 (FL718 string-stitch exit animation)

### Concept

A quadratic bezier path (`M x1 y1 Q cx cy x2 y2`) has a single control point. At rest, place the control point at the midpoint (straight line). To animate sag/droop, animate the control point's Y value downward. This simulates physical slack in a string, thread, or cable.

### Path Construction

```javascript
function makePath(x1, y1, x2, y2, sagAmount) {
  var cx = (x1 + x2) * 0.5;
  var cy = (y1 + y2) * 0.5 + (sagAmount || 0);
  return 'M ' + x1.toFixed(1) + ' ' + y1.toFixed(1) +
         ' Q ' + cx.toFixed(1) + ' ' + cy.toFixed(1) +
         ' '  + x2.toFixed(1) + ' ' + y2.toFixed(1);
}
```

`sagAmount = 0` → straight line. `sagAmount = 80` → 80px downward bow. Negative values create upward bowing.

### Proxy Tween Pattern

GSAP cannot directly animate an SVG path's `d` attribute with bezier logic. Use a plain proxy object and `onUpdate` to rewrite the path on every tick:

```javascript
var sagProxy = { amount: 0 };

gsap.to(sagProxy, {
  amount: 100,
  duration: 1.1,
  ease: 'power2.in',
  onUpdate: function () {
    for (var i = 0; i < activePaths.length; i++) {
      var r1 = activeChars[i].getBoundingClientRect();
      var r2 = activeChars[i + 1].getBoundingClientRect();
      var x1 = r1.left + r1.width * 0.5;
      var y1 = r1.top  + r1.height * 0.5;
      var x2 = r2.left + r2.width * 0.5;
      var y2 = r2.top  + r2.height * 0.5;
      activePaths[i].setAttribute('d', makePath(x1, y1, x2, y2, sagProxy.amount));
    }
  }
});
```

This same proxy pattern is used elsewhere for compound CSS filter strings (see darkroom-develop notes). Any time GSAP needs to drive a value it can't directly interpolate, tween a numeric property on a plain object and rewrite the target in `onUpdate`.

### Why `<path>` Over `<line>`

Use `<path>` from the start even if the initial state is a straight line. This avoids needing to swap element types when the sag animation begins. `<line>` elements cannot express bezier curves. Planning for animation from the start means using the right primitive up front.

---

## CSS `perspective` on Parent for 3D `rotateY` on Inline-Block Text Spans

**Discovered:** February 2026 (FL718 card-shuffle animation)

### Concept

When you split text into word-level `<span>` elements with `display: inline-block` and want to animate `rotateY` with a realistic perspective foreshortening effect, set `perspective` on the **parent** element — not on each span. The parent creates a single shared 3D viewing frustum for all child spans.

```css
.quote-text {
  perspective: 900px;
  perspective-origin: center center;
}

.word-span {
  display: inline-block;
  /* GSAP rotateY now has proper 3D depth */
}
```

### Why This Matters

- `perspective` on the child (same element being transformed) has no effect — the 3D stage must be declared by an ancestor.
- `transform-style: preserve-3d` is NOT needed here since the spans themselves are 2D planes rotating in 3D space, not nested 3D scenes.
- 900px is a useful default for text: close enough to feel dramatic, far enough that far-edge words don't distort excessively.
- `perspective-origin: center center` (the default) gives symmetric foreshortening. Shift it to create a dramatic vanishing point for artistic effect.

### With GSAP

```javascript
// Parent must have perspective: 900px in CSS
gsap.from(wordSpan, {
  rotateY: 42,   // +42 = tilted away to the right (from left edge)
  x: -400,
  opacity: 0,
  duration: 0.55,
  ease: 'back.out(1.5)'
});
```

Even words enter from the left (positive rotateY → tilted right), odd words from the right (negative rotateY → tilted left), simulating a deck of cards being dealt from alternating sides.

---

## Word-Level Text Splitting: Plain Text Nodes vs. Space Spans

**Discovered:** February 2026 (FL718 card-shuffle animation)

### The Distinction

There are two common approaches to splitting text into animatable units. The space handling strategy differs between them and matters.

**Character-level splitting** (animate individual letters):
- Each character becomes a `<span>`.
- Spaces must also become `<span>` elements with `white-space: pre` or `&nbsp;`, otherwise they collapse.
- The `display: inline-block` elements have no natural gap between them.

```javascript
// Char-level: need explicit space spans
var html = text.split('').map(function(ch) {
  return ch === ' '
    ? '<span style="white-space:pre"> </span>'
    : '<span class="char">' + ch + '</span>';
}).join('');
```

**Word-level splitting** (animate whole words):
- Each word becomes a `<span class="word">`.
- Spaces are handled by `.join(' ')` — this creates plain text nodes between spans.
- Plain text nodes render correctly as visual gaps between `display: inline-block` word spans. No `white-space: pre` needed.

```javascript
// Word-level: plain text nodes are fine
var html = text.split(' ')
  .filter(function(w) { return w.length > 0; })
  .map(function(w) { return '<span class="word">' + w + '</span>'; })
  .join(' ');  // The ' ' here becomes a text node — renders as a gap
el.innerHTML = html;
var words = Array.from(el.querySelectorAll('.word'));
```

### Why It Works

Browsers render text nodes between `inline-block` elements as a single collapsed space (the same as normal inline text flow). This is actually the desired behavior for word-level animation — words have natural spacing, and only the `<span>` wrappers are animated.

The trap: if you try to use the char-level space-span approach for word-level splitting, you get double spacing or awkward gaps. Use the right strategy for the granularity you need.

---

## Computed Timing Array / Accelerating Stagger (Machine Warmup Pattern)

**Discovered:** February 2026 (FL718 card-shuffle animation)

### Concept

Standard GSAP staggers (uniform delay between each element) feel mechanical in a boring, clock-like way. For animations that should feel like a physical process — a machine warming up, a printing press hitting speed, cards being dealt faster as a dealer finds rhythm — use a **computed timing array**: pre-calculate each element's absolute launch time, with the gap between successive launches shrinking over the sequence.

This is the opposite of an easing curve on a single tween. It's an easing curve applied to the *spacing between* a series of independent tweens.

### `buildTimestamps()` Pattern

```javascript
function buildTimestamps(n) {
  var result     = [];
  var t          = 0;
  var burstCount = n <= 3 ? 1 : Math.min(4, Math.ceil(n * 0.22));
  var normalCount = n - burstCount;

  for (var i = 0; i < n; i++) {
    var isBurst = (i >= normalCount);
    result.push({ t: Math.round(t), burst: isBurst });

    var gap;
    if (!isBurst) {
      // Linearly interpolate gap from 90ms → 28ms over the normal portion
      var p = normalCount > 1 ? i / (normalCount - 1) : 1;
      gap = 90 - p * 62;
      gap += (Math.random() * 18 - 9);   // ±9ms human jitter
    } else {
      // Burst finale: very tight, simulates the jam releasing
      gap = 14 + (Math.random() * 8 - 4);
    }
    t += Math.max(10, gap);
  }
  return result;
}
```

**Parameters to tune:**
- `90` — starting gap (ms). Larger = slower warmup start.
- `28` — ending gap before burst. Smaller = more dramatic acceleration.
- `0.22` — burst fraction (22% of words get the burst treatment). Tune to taste.
- `14` — burst gap (ms). Keep very tight for the "release" feel.
- `±9` jitter — humanizes mechanical rhythm.

### Usage

Pre-compute once, then fire each element's tween via `setTimeout`. Use an IIFE to capture the correct variable values in the closure:

```javascript
var stamps = buildTimestamps(words.length);

words.forEach(function(word, i) {
  var entry = stamps[i];
  (function(w, entry) {
    setTimeout(function() {
      gsap.to(w, { x: 0, rotateY: 0, opacity: 1, duration: 0.55 });
    }, entry.t);
  })(word, entry);
});
```

### Unlock Timing

Calculate the exact unlock time from the last element's launch plus its animation duration, rather than guessing a fixed total:

```javascript
var lastEntry    = stamps[words.length - 1];
var lastDuration = 0.45;  // seconds
var unlockMs     = lastEntry.t + Math.round(lastDuration * 1000) + 220;  // 220ms buffer
setTimeout(function() { isTransitioning = false; }, unlockMs);
```

### When to Use

- Physical processes: card dealing, printing, typesetting, machine stamping
- "Warming up" reveals where momentum builds over the sequence
- Any entrance where the end should feel more urgent/excited than the start
- Counterpoint: for reveals that should feel deliberate and meditative (like ink bleeding), use uniform or *decelerating* staggers instead

---

## Canvas Text Drawing — Why NOT SVG `<text>` stroke-dashoffset

**Discovered:** February 2026 (FL718 etch-a-sketch animation)

### The Trap

The instinct for a "handwriting" or "drawing text" effect is to use an SVG `<text>` element with `stroke-dashoffset` — the same approach that works perfectly for SVG paths and shapes. **This does not work on `<text>` elements.**

❌ **SVG `<text>` stroke-dashoffset is unreliable:**
```javascript
// Attempt to animate text drawing via stroke-dashoffset
var len = textEl.getTotalLength();  // ❌ SVG <text> has no getTotalLength()
```

SVG `<text>` elements do not implement `getTotalLength()`. Browser support for `stroke-dashoffset` on text is inconsistent and font-dependent. The approach breaks silently or looks wrong across browsers.

✅ **Use canvas `ctx.fillText()` character by character instead:**

```javascript
function runDrawLoop(seq, idx, cb) {
  if (idx >= seq.length) { cb(); return; }
  var entry = seq[idx];
  ctx.font      = entry.size + 'px "YourFont", monospace';
  ctx.fillStyle = entry.color;
  ctx.fillText(entry.ch, entry.x, entry.y);
  setTimeout(function () { runDrawLoop(seq, idx + 1, cb); }, charDelay(entry.ch));
}
```

This gives identical visual results with full timing control, works in all browsers, and is dramatically simpler to reason about.

### When `stroke-dashoffset` IS valid

SVG `stroke-dashoffset` works correctly on SVG `<path>`, `<line>`, `<polyline>`, `<circle>`, `<rect>` — any element that supports `getTotalLength()`. It's the right tool for drawing paths, borders, and geometric shapes. Just not text glyphs.

---

## `document.fonts.ready` Before Canvas Text Operations

**Discovered:** February 2026 (FL718 etch-a-sketch animation)

### The Silent Bug

Canvas `ctx.measureText()` returns character widths based on whatever font is **currently loaded**. If a custom font (e.g. Google Fonts) hasn't loaded yet, the measurement uses the fallback system font — typically a proportional sans-serif. Every subsequent `fillText()` call then draws at wrong positions. The drawing looks broken (letters overlap or have wrong spacing) but there's no error.

❌ **Measuring before font loads — silent wrong output:**
```javascript
// DM Mono not loaded yet — ctx.measureText uses fallback font
var w = ctx.measureText('W').width;  // Wrong width
ctx.fillText('W', x, y);             // Correct position based on wrong width
// Characters will overlap or have wrong spacing
```

✅ **Wait for fonts before any canvas text operations:**
```javascript
// Lock input BEFORE the async wait
isTransitioning = true;

document.fonts.ready.then(function () {
  // DM Mono is guaranteed loaded now
  setupCanvas();                     // Correct dimensions
  var seq = buildCharSequence(q);    // Correct measureText results
  runDrawLoop(seq, 0, function () {
    isTransitioning = false;
  });
});
```

**Critical detail:** Set `isTransitioning = true` BEFORE `document.fonts.ready.then()`. The font load happens asynchronously — if a user scrolls before it resolves, that scroll would trigger a `transition()` call on a canvas with wrong measurements. Lock first, unlock in the callback.

`document.fonts.ready` resolves immediately if all fonts are already loaded (cache hit). The overhead is zero on repeat visits.

---

## DPR-Aware Canvas Setup

**Discovered:** February 2026 (FL718 etch-a-sketch animation)

On Retina/high-DPI screens, a canvas sized to CSS pixel dimensions renders blurry. The fix is to size the canvas in physical pixels and scale the context down — but doing this wrong causes accumulated transforms across multiple `setupCanvas()` calls.

### The Pattern

```javascript
function setupCanvas() {
  var dpr = Math.min(window.devicePixelRatio || 1, 2);  // Cap at 2x — 3x wastes memory
  var sw  = screenEl.clientWidth;
  var sh  = screenEl.clientHeight;

  // Physical pixel dimensions
  canvas.width  = Math.round(sw * dpr);
  canvas.height = Math.round(sh * dpr);

  // CSS display size stays at CSS pixels
  canvas.style.width  = sw + 'px';
  canvas.style.height = sh + 'px';

  // CRITICAL: Reset transform before scaling — prevents accumulation
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  // Now draw in CSS pixel coordinates — everything renders at DPR quality
  ctx.fillStyle = SCREEN_COLOR;
  ctx.fillRect(0, 0, sw, sh);
}
```

### The Accumulation Bug

If you call `ctx.scale(dpr, dpr)` without first calling `ctx.setTransform(1,0,0,1,0,0)`, each call multiplies the existing transform:

- Call 1: `ctx.scale(2, 2)` → scale is 2×
- Call 2: `ctx.scale(2, 2)` → scale is 4× — everything drawn at 4× size
- Call 3: scale is 8× — canvas goes blank (drawing off-screen)

The `setTransform(1,0,0,1,0,0)` identity reset makes `setupCanvas()` idempotent — safe to call any number of times.

**Why cap at 2×:** 3× DPR (some Android phones) means 9× as many pixels as a 1× screen. Canvas memory usage is proportional. The visual improvement from 2× → 3× is barely perceptible for text; the memory cost is significant.

---

## Canvas Word-Wrap with `ctx.measureText()`

**Discovered:** February 2026 (FL718 etch-a-sketch animation)

When drawing multi-line text on canvas, the canvas API has no built-in wrapping. Implement it with `ctx.measureText()` and check each word against `maxWidth`.

```javascript
function computeLines(text, maxWidth, fontSize) {
  ctx.font = fontSize + 'px "YourFont", monospace';
  var lines = [];

  // Respect \n as a hard line break (split text into paragraphs first)
  text.split('\n').forEach(function (para) {
    if (para.trim() === '') {
      lines.push('');  // Blank line = spacing gap
      return;
    }
    var words = para.split(' ');
    var line  = '';
    words.forEach(function (word) {
      var test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;   // Start new line with this word
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
  });

  return lines;  // Array of line strings
}
```

**Important:** Set `ctx.font` before calling `ctx.measureText()`. Measurements use the currently active font. Call this function after `document.fonts.ready` has resolved, or measurements use fallback font metrics.

**Then draw each line:**
```javascript
var y = padY + fontSize;  // y = text baseline (not top of character)
lines.forEach(function (line) {
  if (line === '') { y += Math.round(lineH * 0.5); return; }  // Gap for blank lines
  ctx.fillText(line, padX, y);
  y += lineH;  // lineH = fontSize * 1.95 gives comfortable canvas line spacing
});
```

---

## Dynamic Font Sizing on Canvas

**Discovered:** February 2026 (FL718 etch-a-sketch animation)

When drawing text in a canvas region of fixed dimensions (like a toy screen), find the largest font size where all lines still fit within the available height.

```javascript
/* Find largest fontSize (px) where text fits within maxH. */
function computeFontSize(text, padX, maxH) {
  var maxW = sw - padX * 2;
  for (var size = 18; size >= 10; size--) {
    var lines = computeLines(text, maxW, size);
    var lineH = size * 1.95;
    if (lines.length * lineH <= maxH) return size;
  }
  return 10;  // Minimum fallback
}
```

**Usage:** Call this before building the character sequence. It determines the font size for the entire drawing pass:

```javascript
var fontSize = computeFontSize(q.text, padX, sh * 0.68);
// 0.68 = leave 32% of screen height for attribution below
```

**Line height multiplier:** `fontSize * 1.95` works well for monospace fonts on canvas. Standard CSS line-height of 1.5–1.6 feels tight at canvas pixel sizes; 1.9–2.0 gives breathing room. Adjust per typeface.

---

## Off-Center Indicator Dot for CSS Rotation Visibility

**Discovered:** February 2026 (FL718 etch-a-sketch knobs)

When a CSS `border-radius: 50%` circle rotates, the rotation is visually invisible — the circle looks the same at 0°, 90°, or 180°. To make rotation legible to users (knobs, dials, spinners, loading indicators), add an asymmetric feature positioned off-center using `::before`.

### The Pattern

```css
.knob {
  border-radius: 50%;
  background: radial-gradient(circle at 38% 30%, #f0f0e8, #787872);
  /* GSAP will rotate this element */
}

/* Off-center indicator dot — orbits as the knob rotates */
.knob::before {
  content: '';
  position: absolute;
  top: 12%; left: 50%;
  width: 13%; aspect-ratio: 1;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(circle at 38% 32%, #b0b0a8, #484844);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.55);
}
```

The `::before` dot is centered horizontally but positioned near the top (12% from top = 12 o'clock). When GSAP rotates `.knob`, the pseudo-element rotates with it — the dot visibly orbits the center, making even slow rotation immediately readable.

**Why `::before` and not a real DOM element:** GSAP cannot animate pseudo-elements directly, but pseudo-elements rotate with their parent. Since the knob rotation is driven by GSAP on the parent (`.knob`), the `::before` indicator follows for free.

This is the CSS equivalent of a volume knob's notch or a watch bezel marker — asymmetric placement is what converts rotation into motion the eye can track.

---

## Escalating Shake GSAP Timeline (Manual Position Cursor)

**Discovered:** February 2026 (FL718 etch-a-sketch exit animation)

For physics-based multi-stage sequences (shake with growing amplitude, bounce with diminishing returns, jitter that resolves), build a GSAP timeline using a manual position variable instead of chaining. This makes amplitude/duration data declarative and easy to tune.

```javascript
function etchExit(cb) {
  var tl  = gsap.timeline();
  var pos = 0;  // Manual time cursor in seconds

  var shakeData = [
    { amp: 4,  dur: 0.062 },
    { amp: 7,  dur: 0.068 },
    { amp: 10, dur: 0.072 },
    { amp: 14, dur: 0.078 },
    { amp: 18, dur: 0.082 },
    { amp: 22, dur: 0.086 }
  ];

  shakeData.forEach(function (s, i) {
    var dir = (i % 2 === 0) ? 1 : -1;  // Alternate left-right

    tl.to(frameEl, { x: s.amp * dir, duration: s.dur, ease: 'sine.inOut' }, pos);
    pos += s.dur;

    tl.to(frameEl, { x: 0, duration: s.dur * 0.65, ease: 'sine.out' }, pos);
    pos += s.dur * 0.65;
  });

  // .call() at absolute position — fires near peak of last shake
  tl.call(clearCanvas, [], pos - 0.10);

  // Independent animation overlapping the shake
  tl.to([knobLeft, knobRight], {
    rotation: '+=48', duration: pos * 0.9, ease: 'power1.in'
  }, 0.08);  // Start slightly after shake begins

  // Exit animation starts just after shake ends
  tl.to(frameEl, { y: '-112vh', duration: 0.46, ease: 'power2.in' }, pos + 0.04);

  tl.call(function () { cb(); });
}
```

**Why the manual cursor:** GSAP's default `tl.to(el, props)` appends to the END of the timeline. When each shake cycle is a pair of tweens (impact + recovery), you need precise control over where each starts. The `pos` variable is the running total of elapsed time, passed as the third argument (the absolute position parameter) to each `.to()` call.

**The `.call()` at `pos - 0.10`:** Triggers an action (canvas wipe) 100ms before the last oscillation ends — at the moment of maximum amplitude. This makes the "clear" feel like it happens at the violent peak, not after.

**Tuning:** The entire shake sequence is a data array. Change 6 numbers to change the feel. `amp` values control intensity; `dur` controls how fast each cycle goes. Keeping `dur * 0.65` for recovery (shorter than impact) mimics real shake physics — objects snap away fast, return slower.

---

## Stopping a `setTimeout` Chain Mid-Execution

**Discovered:** February 2026 (FL718 etch-a-sketch drawing loop)

A recursive `setTimeout` chain (character-by-character drawing, sequential reveals) cannot be stopped by normal means once started. If the user triggers a transition during the drawing, the chain will keep firing and drawing over the cleared canvas.

### The Pattern

Use a `drawingActive` flag and a stored timer handle. The flag is checked at the top of each recursive call; the handle allows cancelling the most recently scheduled step.

```javascript
var drawingActive = false;
var drawTimer     = null;

function runDrawLoop(seq, idx, cb) {
  if (!drawingActive) return;  // Flag check — stops chain mid-execution
  if (idx >= seq.length) { cb(); return; }

  var entry = seq[idx];
  ctx.fillText(entry.ch, entry.x, entry.y);

  drawTimer = setTimeout(function () {
    runDrawLoop(seq, idx + 1, cb);
  }, charDelay(entry.ch));
}

// To stop the loop from outside (e.g. during exit):
function stopDrawing() {
  drawingActive = false;
  if (drawTimer) { clearTimeout(drawTimer); drawTimer = null; }
}
```

**Why both a flag AND a timer handle:** `clearTimeout` only cancels the one currently-scheduled step. If the loop is between steps (executing synchronously), `clearTimeout` is too late. The `!drawingActive` check at the top of the function handles that case — the next iteration sees the flag is false and stops cleanly. Together they cover all timing windows.

**Reset for next entrance:** `drawingActive = true` must be set before calling `runDrawLoop` on the next quote. Set it in the entrance function, not in the stop function.

---

## SVG Path Measurement — `getPointAtLength()`

`getTotalLength()` is widely documented. Its companion `getPointAtLength(fraction)` is less obvious but essential for label placement and timing computation.

**Use case 1 — Place a label at a specific point along a path:**
```javascript
var pathLen  = path.getTotalLength();
var labelPt  = path.getPointAtLength(pathLen * 0.20);  // 20% along the arc
labelEl.setAttribute('x', labelPt.x + 6);
labelEl.setAttribute('y', labelPt.y - 5);
```

**Use case 2 — Compute what fraction of the arc corresponds to a word group's position:**
```javascript
// For nearly-horizontal paths, horizontal proportion ≈ arc-length fraction
var tGroup = Math.max(0.12, Math.min(0.84, (groupCx - startX) / (endX - startX)));
// tGroup * BEARING_DUR = delay offset at which the line's leading edge reaches the group
```

The approximation holds when the path is predominantly horizontal. For highly curved or diagonal paths, use binary search over `getPointAtLength` to find the exact arc-length fraction where the path is closest to the target point.

**Both methods require the element to be in the DOM.** Call them after `parentSvg.appendChild(path)`, not before.

---

## GSAP — `svgOrigin` for SVG Element Transforms

For HTML elements, GSAP uses `transformOrigin: 'cx cy'`. For SVG elements, use `svgOrigin` instead — it takes values in the SVG coordinate system, not CSS percentages.

```javascript
// ❌ Wrong for SVG — percentages don't map correctly inside SVG viewport
gsap.set(roseGroup, { transformOrigin: '50% 50%' });

// ✅ Correct — pass the SVG coordinates of the desired pivot point
gsap.set(roseGroup, { svgOrigin: '240 450' });  // x=240, y=450 in SVG units
gsap.to(roseGroup, { rotation: 0, scale: 1, duration: 0.88, ease: 'power3.out' });
```

Typical use: spinning/scaling a compass rose or other SVG group around its own center point. The coordinates are the `cx, cy` of the element's center in the SVG coordinate space (i.e. the values you passed when building it, not viewport pixels).

---

## GSAP — `gsap.fromTo()` vs `gsap.to()` + `onStart` for Initial State

**The trap:** Setting the initial transform inside `onStart` doesn't work because GSAP records start values at tween creation time — before `onStart` fires.

```javascript
// ❌ Broken — GSAP already snapshotted y:0 as the start value before onStart runs
gsap.to(span, {
  opacity: 1, y: 0, duration: 0.48,
  onStart: function() { gsap.set(span, { y: 5 }); }  // Too late
});

// ✅ Correct — fromTo() declares start and end explicitly at creation time
gsap.fromTo(span,
  { opacity: 0, y: 5 },
  { opacity: 1, y: 0, duration: 0.48, ease: 'power1.out' }
);
```

**Rule:** Use `gsap.fromTo()` any time you need to declare both the start state and the end state. Use `gsap.set()` + `gsap.to()` only when the element is already in the correct start state in the DOM before the tween is created.

---

## GSAP — CSS Transform Conflicts

If a CSS rule applies a `transform` to an element, and GSAP also animates a transform property on the same element, they will conflict. GSAP doesn't inherit CSS transform values as its animation start point — it overwrites them.

```css
/* ❌ This will conflict if GSAP later animates y on .fl718-nm-line */
.fl718-nm-line {
  transform: translateY(4px);
}
```

**Fix:** Remove the CSS transform entirely. Let GSAP own the axis:
```javascript
gsap.fromTo(span, { y: 4 }, { y: 0, duration: 0.48 });
```

**Broader rule:** Never mix CSS `transform` and GSAP `transform` on the same element. Pick one owner. If GSAP is animating it, the CSS transform property should be unset.

This also applies to GSAP ScrollTrigger scrubs — if a scrub and an entrance animation both target `y` on the same element, the scrub will clobber the entrance animation on every tick. Solution: nest the element and split transforms across parent/child.

---

## Double `requestAnimationFrame` Before DOM Measurement

When measuring element positions immediately after a DOM change (class swap, innerHTML update, opacity toggle that triggers reflow), a single `requestAnimationFrame` is not always enough. The browser may not have completed layout by the time the first rAF fires.

```javascript
// ❌ May measure stale layout — browser hasn't necessarily reflowed yet
requestAnimationFrame(function() {
  var rect = el.getBoundingClientRect();
  // ...
});

// ✅ Two rAFs guarantee layout is settled before measuring
requestAnimationFrame(function() {
  requestAnimationFrame(function() {
    var rect = el.getBoundingClientRect();
    // safe to measure now
  });
});
```

**Why two:** The first rAF fires before the browser's next paint. The second rAF fires after the browser has processed layout for that paint cycle. By the second rAF, `getBoundingClientRect()` reflects the current DOM state accurately.

Used when: measuring word group positions after `render(quote)` sets new `innerHTML` and mood/font classes; measuring element positions after GSAP `set()` calls that affect layout.

---

## SVG `<image>` — Embedding Raster Images Under SVG Layers

An SVG `<image>` element lets you place a PNG/JPEG as a layer inside an SVG, with the rest of the SVG drawing on top. Useful for rich illustrated backgrounds under procedural animation layers.

```javascript
// Create via SVG namespace (same as all other SVG elements)
function svgEl(tag, attrs) {
  var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.keys(attrs).forEach(function(k) { el.setAttribute(k, attrs[k]); });
  return el;
}

var img = svgEl('image', {
  href: 'background-map.png',
  x: '0', y: '0',
  width: W, height: H,
  preserveAspectRatio: 'xMidYMid slice',
  opacity: '0.10'
});
svg.appendChild(img);
```

**`preserveAspectRatio` values:**
- `xMidYMid slice` — fills the SVG viewport, crops to fit (like CSS `object-fit: cover`)
- `xMidYMid meet` — fits within the SVG viewport, letterboxes if needed (like `contain`)
- `none` — stretches to fill exactly

**Z-order:** SVG uses paint order, not z-index. Elements appended first are drawn first (behind). Append the `<image>` before all other groups so it sits at the bottom of the layer stack.

**Opacity:** Set on the element directly (`opacity: '0.10'`) or wrap in a `<g>` and fade the group via GSAP for entrance animation.

**File paths:** Same-folder relative paths (`'filename.png'`) work in both `file://` protocol and served HTML. No URL encoding needed as long as the filename has no spaces.

---

### CRITICAL BUG: GSAP `clearProps` on a Parent Does NOT Clear Inline Styles on Children

**The problem:**

GSAP sets inline `style` attributes directly on the elements it animates. `gsap.set(element, { clearProps: 'opacity' })` removes the inline `opacity` from *that element only*. It does **not** cascade to child elements.

If an exit animation sets `opacity: 0` on child elements (e.g., attribution name/source spans inside a footer), and the reset function only runs `clearProps` on the parent container, the children keep their inline `opacity: 0` across the transition. The next entrance animation sees the parent at full opacity but the children are invisible.

**Why this is hard to catch:**

- The parent element looks correct in DevTools (no inline opacity)
- Some entrance animations explicitly manage child opacity (set to 0, then animate to 1) — those work fine and mask the bug
- Other entrances don't touch children at all — those inherit the stale inline style
- With random animation dispatch, the bug appears intermittently: only when a "poisoning" exit is followed by a "non-managing" entrance

**The pattern that breaks:**

```javascript
// EXIT animation A — hides children directly
gsap.to([childA, childB], { opacity: 0, duration: 0.2 });
gsap.to(parentBlock, { opacity: 0, onComplete: cb });

// RENDER (between exit and entrance)
function render() {
  gsap.set(parentBlock, { clearProps: 'opacity' });  // ← only clears parent
  // childA and childB still have inline opacity: 0 from the exit!
}

// ENTRANCE animation B — sets parent visible, doesn't touch children
gsap.set(parentBlock, { opacity: 1 });
// childA and childB are invisible — stale inline style from animation A
```

**The fix — always clear every element you might animate:**

```javascript
function render() {
  // Clear ALL elements that ANY animation might set inline styles on
  gsap.set([parent, childA, childB, ornamentA, ornamentB], {
    clearProps: 'opacity,filter'
  });
}
```

**Rule of thumb for dispatch/router animation systems:**

When multiple animations share the same DOM and a router dispatches different exit/entrance functions per transition, the render/swap function between exit and entrance must act as a **full state reset**. Every element that *any* animation *ever* touches with GSAP needs its inline styles cleared in that reset. If you add a new animation that animates a new element, add that element to the reset list.

**Audit checklist for finding this bug:**

1. List every element that any exit function sets inline styles on (via `gsap.to`, `gsap.set`, or `gsap.fromTo`)
2. List every element that `clearProps` runs on in the render/reset function
3. Any element in list 1 but not in list 2 is a potential stale-style bug
4. For each, check whether all entrance functions explicitly reset that element — if even one entrance doesn't, the bug exists

**Discovered:** FL718 Quotes prototype, February 2026. Three exit animations (`exitStringStitch`, `exitCardShuffle`, `telegraphExit`) set `nameEl`/`sourceEl` inline opacity to 0, but `renderQuote()` only cleared the parent `footerEl`. Result: attribution text invisible after ~30% of quote transitions.
