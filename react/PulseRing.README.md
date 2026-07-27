# Pulse Ring (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { PulseRing } from "motion-kit/react/PulseRing";
<PulseRing label="Live" />;
```

## What's tunable

The only prop is `label`; there are no effect-specific custom properties. Override
the module's dot/ring color and size, or use `--motion-slow` and `--ease-out-soft`.

## Notes

Two continuous pseudo-element animations are best kept to a small number of
genuine status indicators; it is the wrong choice when status is not active or
when motion would distract. The label supplies the meaning and the dot is
aria-hidden. Reduced motion removes the ring animation.
