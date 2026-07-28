# Underline Draw Link (React)

Use this for an inline anchor whose underline wipes in from the left on hover or focus and retracts to the right on leave.

## Markup

```tsx
import "motion-kit/tokens.css";
import { UnderlineDrawLink } from "motion-kit/react/UnderlineDrawLink";
<UnderlineDrawLink href="/journal" underlineColor="#a5b4fc">Read the journal</UnderlineDrawLink>;
```

## Tunables

`underlineColor` optionally sets `--udl-color`, which defaults to `var(--link-underline-color, currentColor)`. `thickness` optionally sets `--udl-thickness`, which defaults to `2px`. Timing uses `--motion-fast` and `--ease-out-soft`.

## Reduced motion

Durations collapse to `0ms` through `tokens.css`, so the underline simply appears and disappears. There is no bespoke reduced-motion path.

## Notes

The component renders a real anchor and preserves keyboard focus visibility. No JavaScript is needed.
