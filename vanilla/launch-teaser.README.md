# Launch Teaser (vanilla)

A composite: full-bleed [aurora glass](aurora-glass.README.md) background,
finished with a [noise grain overlay](noise-grain-overlay.README.md), holding
a two-line [cinematic type reveal](cinematic-type-reveal.README.md) headline
and an optional [dimensional tilt card](dimensional-tilt-card.README.md)
secondary panel. Built for a one-screen product/launch hero. None of the four
underlying effect files are modified — this composite only adds layout,
sequencing, and tunables on top of them.

## Use it

```html
<link rel="stylesheet" href="tokens.css" />
<link rel="stylesheet" href="aurora-glass.css" />
<link rel="stylesheet" href="noise-grain-overlay.css" />
<link rel="stylesheet" href="cinematic-type-reveal.css" />
<link rel="stylesheet" href="dimensional-tilt-card.css" />
<link rel="stylesheet" href="launch-teaser.css" />

<div class="lt-teaser ag-shell">
  <span class="ngo-overlay" aria-hidden="true"></span>
  <div class="lt-content">
    <div class="lt-mark"><img src="mark.svg" alt="" /></div>
    <div class="lt-headline">
      <div class="ctr-line">Headline line one</div>
      <div class="ctr-line">Supporting line two</div>
    </div>
    <div class="dt-card lt-card">
      <div class="dt-inner"><!-- screenshot, UI preview, or product mark --></div>
    </div>
  </div>
</div>

<script type="module">
  import { mountLaunchTeaser } from "./launch-teaser.js";
  mountLaunchTeaser(document.querySelector(".lt-teaser"));
</script>
```

The mark, headline lines, and card content are slots — drop in your own
markup. There is no default copy, color, or logo baked in.

## What's tunable

Custom properties layered on top of the underlying effects' own tokens:

- `--lt-max-width` (default `640px`) — content column width.
- `--lt-gap` (default `clamp(20px, 4vw, 40px)`) — vertical rhythm between mark,
  headline, and card.
- `--lt-headline-size` (default `clamp(28px, 5vw, 56px)`) — first headline
  line's font size; the second `.ctr-line` is styled at 0.45x that size as a
  subline.
- `--lt-headline-color` / `--lt-subline-color` — headline and subline text
  color.
- `--lt-mark-size` (default `56px`) — width/height of `.lt-mark`.
- `--lt-card-width` (default `min(360px, 100%)`) — width of the optional card.
- `--lt-card-bg` — overrides the card's background gradient without touching
  `dimensional-tilt-card.css`; unset keeps that file's own default.
- `--lt-bg-gradient` — overrides the aurora blobs' gradient without touching
  `aurora-glass.css`; unset keeps that file's own default.
- `--lt-grain-opacity` (default `0.14`) — passed through to `.ngo-overlay`.

`mountLaunchTeaser(root, { maxTilt })` accepts the same `maxTilt` option
`mountDimensionalTiltCard` does (default `6`, roughly `4–12` is sensible) and
forwards it once the card mounts.

## Notes

The card panel is optional — omit `.dt-card.lt-card` entirely for a
background-and-headline-only teaser. JS sequencing waits for the shell's own
opacity transition to end before mounting the type reveal and tilt card, so a
consumer who sets `transition: none` on `.lt-teaser` (or has reduced motion
enabled) gets both mounted immediately instead of never firing. Because this
composite stacks aurora-glass's continuous blob animation, a grain overlay,
and (optionally) a pointer-driven 3D tilt, it is comparatively heavy — treat it
as a single hero moment, not a repeatable card pattern, and prefer it off
low-power devices or dense layouts. Keep headline and card content legible
independent of the ambient motion; reduced motion stops the blobs and flattens
the tilt but leaves text and layout intact.
