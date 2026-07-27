# Living Analytics Bars + Counter (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { LivingAnalytics } from "motion-kit/react/LivingAnalytics";
<LivingAnalytics value={8420} targets={[0.4, 0.8]} />;
```

## What's tunable

`value` is the final counter and `targets` is an array of normalized bar values;
keep each target between `0` and `1`. The module uses `--motion-base`,
`--motion-instant`, and `--ease-out-expressive`; its `--target`/`--delay` values
are generated internally.

## Notes

IntersectionObserver starts one counter rAF and bar transitions once. It is the
wrong choice when data must be visible before scrolling into view or when a
decorative chart could be mistaken for live reporting. Provide labels or a text
equivalent. Reduced motion jumps to final count and bar values.
