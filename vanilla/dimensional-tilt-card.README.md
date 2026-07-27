# Dimensional Tilt Card (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="dimensional-tilt-card.css">
<article class="dt-card"><div class="dt-inner"><strong>Dimensional tilt</strong><span>Depth follows pointer position</span></div></article>
<script type="module">import { mountDimensionalTiltCard } from "./dimensional-tilt-card.js"; mountDimensionalTiltCard(document.querySelector(".dt-card"), { maxTilt: 8 });</script>
```

## What's tunable

Pass `maxTilt` in degrees; `0` is flat and roughly `4–12` is a sensible range.
The implementation writes `--rx`, `--ry`, `--sx`, and `--sy`; do not treat those
as user-facing controls. Timing uses `--motion-fast`, `--motion-base`, and the
shared easing tokens.

## Notes

It attaches pointer listeners and uses 3D transforms plus a highlight sweep,
so it is the wrong choice for many cards, touch-only surfaces, or motion-sensitive
interfaces. Keep the card's meaning in normal text and controls. Reduced motion
skips listeners, flattens the card, and removes the sweep.
