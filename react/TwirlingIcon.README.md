# Twirling Icon (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { TwirlingIcon } from "motion-kit/react/TwirlingIcon";
<TwirlingIcon label="Sparkle" />;
```

## What's tunable

The only prop is `label`; there are no effect-specific custom properties.
Override module size/color and use `--motion-slow`, `--motion-fast`,
`--ease-linear`, and `--ease-out-soft` for timing.

## Notes

The icon spins continuously and speeds up on hover, so it is the wrong choice
for repeated icons or a calm utility interface. The component supplies an
accessible label and hides its SVG from assistive technology; do not use rotation
as the only status signal. Reduced motion stops spinning.
