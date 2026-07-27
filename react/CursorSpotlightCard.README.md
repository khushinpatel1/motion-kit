# Cursor Spotlight Card (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { CursorSpotlightCard } from "motion-kit/react/CursorSpotlightCard";
<CursorSpotlightCard title="Cursor spotlight" />;
```

## What's tunable

The only prop is `title`. The module uses JS-written `--x` and `--y` (pointer
positions), plus `--motion-fast` and `--ease-out-soft`; there are no other
effect-specific custom properties.

## Notes

It adds pointer tracking on hover-capable devices and is decorative; it is the
wrong choice for dense lists or touch-first surfaces. Keep all meaning in normal
content and expose actions as real controls. Reduced motion removes transition
time, but pointer tracking remains enabled.
