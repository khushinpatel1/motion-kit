# Shimmer Text (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { ShimmerText } from "motion-kit/react/ShimmerText";
<ShimmerText>New collection</ShimmerText>;
```

## What's tunable

The only prop is `children`; there are no effect-specific custom properties.
Override gradient stops/background size and use `--motion-ambient` plus
`--ease-linear` for timing.

## Notes

The gradient is decorative and can reduce readability, so it is the wrong choice
for body copy or important instructions. It renders real text but still needs
contrast checking. Reduced motion stops the sweep and leaves static styling.
