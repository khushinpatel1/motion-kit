# Noise / Grain Overlay (React)

## Use it

```tsx
import { NoiseGrainOverlay } from "motion-kit/react/NoiseGrainOverlay";
<NoiseGrainOverlay><p>Surface content</p></NoiseGrainOverlay>;
```

## What's tunable

The only prop is `children`; there are no custom properties. Override module
opacity (default `0.14`) and `mix-blend-mode` (`screen`) if needed.

## Notes

Static SVG turbulence can add paint cost across large surfaces; it is the wrong
choice for text-heavy or low-power interfaces. The overlay is pointer-transparent
and decorative, and is marked `aria-hidden`; preserve content contrast. Reduced
motion changes nothing.
