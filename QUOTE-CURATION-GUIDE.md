# Quote Curation Guide
**Project:** FL718 Quotes Page
**Purpose:** Assignment logic for new quotes. Read this before adding quotes to `quotes.js`.
**Last updated:** February 2026

---

## How to Add New Quotes

When Séamus has new quotes to add from the Google Doc:

1. Paste the raw quotes (text + attribution + source if known)
2. Claude reads this file and assigns all fields
3. Output is ready-to-paste quote objects for `quotes.js`

The fields that need assignment: `mood`, `animation`, `font`, `layout`, `length`.
`length` is usually auto-detected by the engine (long > 80 words, short < 12 words) — only add it explicitly when needed.

---

## Field: `mood`

Five moods. Each sets the body background color via CSS class. Assign based on emotional register, not just topic.

| Mood | Character | Typical sources |
|---|---|---|
| `dark-raw` | Violence, addiction, rage, destruction, night, desire as wound | Bukowski, Crane, NIN, dark McCarthy |
| `tender-literary` | Love, longing, beauty, connection, gentleness, grief without bitterness | Saint-Exupéry, Deftones (slow songs), Tartt (soft passages), Whyte |
| `defiant-political` | Resistance, power systems, rebellion, ideology, propaganda, call to arms | Orwell, RATM, Dead Prez, Immortal Technique, Tagore |
| `contemplative-ancient` | Philosophy, time, wisdom, impermanence, nature, the cosmos | Zen masters, Kafka, Seneca, Lao Tzu, Thoreau, Dogen |
| `wild-electric` | Chaos, magic, possibility, ecstasy, the universe as trick | McKenna, TV on the Radio, Chaplin (defiant life speech), Dostoyevsky (miracle passages) |

**Gray areas:** A quote can be dark but not raw (→ `contemplative-ancient`). A quote can be political but also wise (→ `defiant-political` wins if it has an edge; `contemplative-ancient` if it's reflective). When unsure, lean toward what the *reader* will feel, not just what the quote is about.

---

## Field: `font`

Five font classes. Assign by the voice/register of the source, not the words alone.

| Class | Voice | Use for |
|---|---|---|
| `fl718-font-brutal` | Printed, declarative, no-nonsense | Manifestos, power statements, defiant-political prose, rap lyrics with punch (RATM, Immortal Technique, Aesop Rock power lines) |
| `fl718-font-literary` | Flowing, humanist, slightly worn | Literary prose, poetry, anything that sounds like it was written by hand or with care (Bukowski poetry, Tartt, Hesse, Whyte, Deftones lyrics) |
| `fl718-font-archival` | Old, institutional, weight of time | Classical sources, philosophy, anything that has the feel of a book printed before 1960 (Homer, Orwell prose, Kafka, Zen masters, Camus, McCarthy) |
| `fl718-font-system` | Digital, typed, slightly cold | Rap lyrics that feel like they were written on a screen or have a typed/stencil quality (Aesop Rock, Dead Prez, NIN lyrics) |
| `fl718-font-expressive` | Loose, energetic, display-weight | Wild-electric sources with energy and presence (McKenna, Beastie Boys, Chaplin, Murray) |

**Rule of thumb:** If you're unsure between `brutal` and `literary`, ask whether the quote is making a *declaration* (brutal) or *expressing* something (literary). If unsure between `archival` and `literary`, archival is for dead authors with gravity; literary is for authors whose voice still feels alive and personal.

---

## Field: `layout`

| Value | When to use |
|---|---|
| `display` | Very short (≤ ~10 words), single punchy statement, meant to fill the screen. No attribution visible until hover. |
| `center` | Short poem or lyric (2–5 lines) with intentional line breaks. The line breaks are part of the meaning. Max-width 65ch. |
| `left` | Everything else. Prose, multi-stanza lyrics, anything longer than 5 lines or > ~30 words. |

**Note:** A short quote that is prose (not broken into lines) still goes `display`, not `center`. `center` is specifically for poetry/lyrics where the line structure matters.

---

## Field: `animation`

### Current animation pool

Animations are rated by aesthetic quality and suitability. Higher-rated animations appear more frequently across the quote set. When adding new quotes, aim to match distribution proportionally — don't assign all new quotes to the same animation.

**Target frequency per animation (as of Feb 2026, 87 quotes):**

| Animation | Rating | Count | Long OK? | NOT for long? |
|---|---|---|---|---|
| `pond-ripple` | 10 | 11 | ✅ | — |
| `string-stitch` | 10 | 10 | ✅ | — |
| `etch-a-sketch` | 10 | 10 | — | ✅ |
| `smoke-dissolve` | 9 | 9 | — | ✅ |
| `marquee-bulb` | 9 | 9 | — | ✅ |
| `data-dissolve` | 9 | 6 | — | ✅ |
| `darkroom-develop` | 8 | 7 | ✅ | — |
| `paint-drip` | 8 | 7 | — | ✅ |
| `navigation-map` | 9 | 6 | ✅ | — |
| `card-shuffle` | 8 | 6 | — | ✅ |
| `letterpress` | 7 | 4 | ✅ | — |
| `ikea-assembly` | 7 | 2 | — | ✅ |

**Long quote rule:** If a quote is tagged `length: "long"` or exceeds ~80 words, it must use one of: `pond-ripple`, `string-stitch`, `navigation-map`, `darkroom-develop`, `letterpress`. All others are too fast or too fragmented for long content.

### Animation character — what each one *feels* like and what quotes it matches

**`pond-ripple` (10)**
Water disturbed, then settling. Meditative, patient. Best for: contemplative quotes about time, nature, memory, impermanence. Tender-literary and contemplative-ancient moods. Quotes that feel like they sink in slowly. Works at any length.

**`string-stitch` (10)**
Thread being pulled through. Slow construction, layers building. Best for: long literary passages, introspective quotes about continuity or connection, anything that accumulates meaning as you read. Tender-literary, dark-raw (literary), wild-electric (long-form). Works at any length.

**`etch-a-sketch` (10)**
Being drawn, then wiped. Best for: ideas that feel constructed or deconstructed — defiant-political statements, philosophy that challenges assumptions, anything with an argumentative or declarative quality. Short/standard only.

**`data-dissolve` (9) — exit only**
Text dissolves like corrupted data, disappearing. Best for: quotes about erasure, propaganda, the destruction of truth, memory loss, disappearing systems. Orwellian content. Must always pair with `entrance: "smoke-dissolve"`. Short/standard only.

**`marquee-bulb` (9)**
Announcement board, theater marquee. Best for: short proclamatory statements, aphorisms that feel like they're being announced, quotes with electric energy or humor. Wild-electric and defiant-political. Short only (the visual doesn't scale to long content).

**`smoke-dissolve` (9)**
Material dissolving into air. Atmospheric, dissipating, haunted. Best for: dark-raw quotes about loss or fading, contemplative quotes about impermanence, anything that should feel like it evaporates. Short/standard only.

**`navigation-map` (9)**
Tracing a path. Journey, direction, orientation in space or time. Best for: quotes about finding your way, philosophical passages that move through ideas like a journey, wild-electric long-form. Works at any length.

**`darkroom-develop` (8)**
Slow emergence from grey. Chemical, patient, cinematic. Best for: dark literary prose that should be savored, quotes where the meaning emerges slowly, dark-raw mood with literary quality. Works at any length.

**`paint-drip` (8)**
Visceral, wet, creative energy. Best for: wild-electric quotes, quotes about making things or feeling things intensely, anything with physical or sensory quality. Short/standard only.

**`card-shuffle` (8)**
Quick, game-like, stochastic. Best for: defiant or punchy quotes with rhythm, anything that benefits from a slightly irreverent or quick-draw presentation. Short/standard only.

**`letterpress` (7)**
Printed word, heavy ink, deliberate. Best for: manifestos, declarations, political speech, anything that should feel like it was set in type for a reason. Defiant-political. Works at any length.

**`ikea-assembly` (7)**
Methodical, instructional. Best for: short aphorisms that read like instructions or steps, wisdom that has a how-to quality. Short only (ideally single-line display quotes). Lower frequency than higher-rated animations but should still appear regularly — not a rarity.

### Special pairing: `data-dissolve`

Any quote assigned `data-dissolve` must also carry:
```javascript
entrance: "smoke-dissolve",
```
This is because data-dissolve is exit-only. The engine uses the `entrance` field to override the default entrance animation. Without this field, the entrance will fall back to whatever default the engine uses.

---

## Field: `length`

Usually omit and let the engine auto-detect:
- Auto-detected as `long` if word count > 80
- Auto-detected as `short` if word count < 12
- Everything else is `standard`

Only set explicitly when a quote is borderline and you want to override (e.g., a 75-word quote that should be treated as long because of how it reads, or a 13-word quote that should be `short` for display layout purposes).

---

## Adding New Animations

When a new animation is built and approved, add a row to the animation pool table above and add a description block in the "Animation character" section. Include:

- **Name** (kebab-case, matches the string used in `quotes.js`)
- **Rating** (1–10, your ranking vs. existing animations)
- **Long OK?** (does it work for 80+ word quotes?)
- **Character** — what it feels like, what quote types it matches
- **Count target** — how many quotes in the set should use it (proportional to rating)

Then do a redistribution pass on quotes.js if the new animation's rating is high enough to warrant pulling quotes from lower-rated animations.

---

## Adding New Font Classes

When a new font is added to the CSS:

1. Add the CSS class definition to the stylesheet (prefix `fl718-font-`)
2. Add a row to the font table above with: class name, voice description, use cases
3. Do a review pass on existing quotes to see if any are better served by the new font

Font classes are applied to `#fl718-quote-block` and cascade to all child elements. No other changes needed in the engine.

---

## Quick reference — mood × font defaults

When stuck, these pairings are safe defaults (not rules):

| Mood | Default font |
|---|---|
| `dark-raw` | `fl718-font-literary` (prose) or `fl718-font-brutal` (short/hard) |
| `tender-literary` | `fl718-font-literary` |
| `defiant-political` | `fl718-font-brutal` (declarations) or `fl718-font-archival` (classical) |
| `contemplative-ancient` | `fl718-font-archival` |
| `wild-electric` | `fl718-font-expressive` (energetic) or `fl718-font-literary` (dreamy) |

---

## Quick reference — mood × animation tendencies

Not rules — just tendencies observed across the 87-quote set:

| Mood | Often paired with |
|---|---|
| `dark-raw` | `darkroom-develop`, `smoke-dissolve`, `string-stitch`, `pond-ripple` |
| `tender-literary` | `pond-ripple`, `string-stitch`, `smoke-dissolve` |
| `defiant-political` | `etch-a-sketch`, `data-dissolve`, `card-shuffle`, `letterpress` |
| `contemplative-ancient` | `pond-ripple`, `navigation-map`, `etch-a-sketch`, `ikea-assembly` |
| `wild-electric` | `marquee-bulb`, `paint-drip`, `navigation-map`, `card-shuffle` |

---

*FL718 Quote Curation Guide — February 2026 — Flaneur 718*
