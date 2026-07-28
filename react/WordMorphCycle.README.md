# Word Morph Cycle (React)

Use this for a single changing word in an editorial line; its measured shell animates width so adjacent text stays settled.

## Markup

```tsx
import "motion-kit/tokens.css";
import { WordMorphCycle } from "motion-kit/react/WordMorphCycle";
<p>We <WordMorphCycle words={["build", "ship", "tend"]} /> carefully.</p>;
```

## Tunables

`words` defaults to `["build", "ship", "tend"]`; `interval` defaults to the `--motion-ambient` token. CSS `--wmc-color` defaults to `#fff`; JS writes `--wmc-width`.

## Reduced motion

Only the first word renders and remains; no timer starts and CSS removes blur, transforms, and width transitions.

## Notes

Use short single-line words. The effect uses a timeout and DOM measurement, not a continuous loop.
