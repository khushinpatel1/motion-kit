# Sticky Stack Cards (React)

Sticky Stack Cards renders a vertical deck where cards pin and compress as later cards cover them. Reach for a short, related sequence of panels rather than a large collection.

## Markup

```tsx
import "motion-kit/tokens.css";
import { StickyStackCards } from "motion-kit/react/StickyStackCards";
<StickyStackCards cards={[<div>First</div>, <div>Second</div>]} scaleFloor={0.92} pinOffset="24px" />;
```

## Tunables

Props are `cards`, required React nodes; `scaleFloor` (default `0.92`); and `pinOffset` (default `"24px"`). They write `--scale-floor` and `--pin-offset`; the scroll-linked animation uses `--motion-slow`.

## Reduced motion

Cards still pin and stack, but compression is removed and cards remain full size.

## Notes

Compression uses `animation-timeline: view()` where supported. Older browsers retain the sticky layout without scaling. Avoid overflow-constrained ancestors.
