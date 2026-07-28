# Retracting Header (React)

Retracting Header hides a sticky header while reading downward and returns it immediately on upward scroll. After a threshold it gains a solid surface and hairline border.

## Markup

```tsx
import "motion-kit/tokens.css";
import { RetractingHeader } from "motion-kit/react/RetractingHeader";
<RetractingHeader threshold={24} minDelta={4}><nav aria-label="Primary">...</nav></RetractingHeader>;
```

## Tunables

Props are `children`, `threshold` (default `24px`), and `minDelta` (default `4px`). CSS `--surface` and `--border` provide the default scrolled colors; timing uses `--motion-fast` and `--ease-out-soft`.

## Reduced motion

The header never retracts, but it still changes its scrolled background and border state.

## Notes

Keep navigation semantic and keyboard accessible. Sticky positioning can be defeated by an ancestor with unsuitable overflow or a constrained height.
