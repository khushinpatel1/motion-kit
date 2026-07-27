# Dimensional Tilt Card (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { DimensionalTiltCard } from "motion-kit/react/DimensionalTiltCard";
<DimensionalTiltCard title="Depth follows pointer" maxTilt={8} />;
```

## What's tunable

Props are `title` and `maxTilt` in degrees; `0` is flat and roughly `4–12` is a
sensible range. JS writes `--rx`/`--ry`; timing uses `--motion-fast`,
`--motion-base`, and shared easing tokens.

## Notes

Pointer listeners, 3D transforms, and a highlight sweep make it the wrong choice
for many cards, touch-only surfaces, or motion-sensitive interfaces. Keep meaning
in text and controls. Reduced motion skips the listener, flattens the card, and
removes the sweep.
