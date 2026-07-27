# Tokens

One paragraph per token — what it's for, when to reach for it.

## Durations

- **`--motion-instant` (120ms)** — hover feedback, button press. Anything that
  should feel like it happened *with* the pointer, not after it.
- **`--motion-fast` (250ms)** — toggles, small state changes: a checkbox, a
  tab switch, a chip filling in.
- **`--motion-base` (450ms)** — entrances and reveals: a card arriving, a
  modal opening, a section fading up into view.
- **`--motion-slow` (900ms)** — one full cycle of an ambient loop: a card
  flip, a tilt settling back to rest.
- **`--motion-ambient` (3000ms)** — the minimum cycle length for idle
  breathing/floating loops. Deliberately long and deliberately a floor, not a
  fixed value — stagger multiple ambient effects off this so they don't
  visibly sync up (e.g. `calc(var(--motion-ambient) * 1.15)` on the second
  instance).

## Easings

- **`--ease-out-expressive`** — `cubic-bezier(.16,1,.3,1)`. Entrances and
  reveals: fast out of the gate, soft landing. Anything arriving on screen.
- **`--ease-out-soft`** — `cubic-bezier(.2,.8,.2,1)`. Hover, tilt, magnetic
  pull. Gentler than expressive — for things that track the pointer rather
  than announce themselves.
- **`--ease-linear`** — constant-rate loops: rotation, marquee scroll. Any
  easing here reads as a stutter once the loop repeats.

## Reduced motion

`tokens.css` zeroes every duration under `prefers-reduced-motion: reduce`.
That's sufficient for effects that are pure CSS transitions/animations — they
collapse to their end state instantly. It is **not** sufficient for anything
structural (a particle system, a canvas loop, a JS `requestAnimationFrame`
tick) — those must check the media query directly in JS and skip spawning
work, not just rely on a zeroed CSS variable. Each effect's README says which
case it is.
