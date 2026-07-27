# Staggered Scroll Reveal (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { StaggeredScrollReveal } from "motion-kit/react/StaggeredScrollReveal";
<StaggeredScrollReveal items={["First", "Second", "Third"]} />;
```

## What's tunable

Pass `items: string[]`; DOM order sets delay, capped at five `--motion-instant`
steps. The module uses `--motion-base`, `--motion-instant`, and
`--ease-out-expressive`; its delay variable is generated internally.

## Notes

Items start hidden and are observed once, so it is the wrong choice for critical
content that must be visible before intersection or for very long lists. Keep
meaning in the text itself. Reduced motion marks all items visible immediately.
