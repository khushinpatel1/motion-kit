# Scroll-Linked Hue / Opacity Background (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { ScrollLinkedHue } from "motion-kit/react/ScrollLinkedHue";
<ScrollLinkedHue><h2>Scroll the page</h2><p>The field follows progress.</p></ScrollLinkedHue>;
```

## What's tunable

The only prop is `children`. JS writes `--hue` from `220` to about `330` and
`--alpha` from `.14` to `.34`; the initial module values are `--hue: 220` and
`--alpha: .18`. Timing uses `--motion-fast` and `--ease-out-soft`.

## Notes

The passive scroll listener is rAF-throttled but still runs during scrolling; it
is the wrong choice when a stable background or lower scroll work is preferred.
Keep contrast valid throughout the range. Reduced motion fixes the initial hue
and alpha and attaches no scroll listener.
