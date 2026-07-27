# Magnetic Action Button (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { MagneticActionButton } from "motion-kit/react/MagneticActionButton";
<MagneticActionButton radius={120} strength={0.28}>Continue</MagneticActionButton>;
```

## What's tunable

Props are `children`, `radius` in CSS pixels (`60–180` is sensible), and
`strength` as a fraction (`0.1–0.35` keeps it subtle). The module uses internal
`--mx`/`--my`, `--motion-fast`, and `--ease-out-soft`.

## Notes

It moves the whole real button with pointer input, so it is the wrong choice near
packed controls or on touch-only interfaces. The component cleans up listeners;
keep label and focus indication clear. Reduced motion changes transition timing
but does not disable pointer attraction.
