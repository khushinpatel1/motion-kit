# Floating Card (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { FloatingCard } from "motion-kit/react/FloatingCard";
<FloatingCard title="Floating card"><span>Ambient surface</span></FloatingCard>;
```

## What's tunable

Props are `title?: string` and `children?: ReactNode`; there are no effect-specific
custom properties. The module consumes `--motion-ambient`, `--motion-fast`, and
shared easing tokens.

## Notes

The continuous idle loop and heavy shadow are the wrong choice for dense grids or
content that should feel still. It remains an article with normal content and
pauses on hover; reduced motion stops the idle animation.
