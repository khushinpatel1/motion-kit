# Cinematic Type Reveal (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { CinematicTypeReveal } from "motion-kit/react/CinematicTypeReveal";
<CinematicTypeReveal lines={["Build quietly.", "Ship clearly."]} />;
```

## What's tunable

Pass `lines: string[]`; the delay is capped at four `--motion-instant` steps.
The module consumes `--motion-base` and `--ease-out-expressive`; there are no
other effect-specific custom properties.

## Notes

It observes lines once and initially hides their text, so it is the wrong choice
for critical copy that must be present before intersection. Keep the text
meaningful without the reveal. Reduced motion shows the final state immediately.
