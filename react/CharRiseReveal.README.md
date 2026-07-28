# Char Rise Reveal (React)

Use this for a short heading whose individual characters rise into place when the heading enters the viewport.

## Markup

```tsx
import "motion-kit/tokens.css";
import { CharRiseReveal } from "motion-kit/react/CharRiseReveal";
<CharRiseReveal staggerStep={1} threshold={0.2}>A quieter kind of motion</CharRiseReveal>;
```

## Tunables

`staggerStep` defaults to `1` token step; `threshold` defaults to `0.2`. JS writes `--crr-index` for each character. CSS `--crr-color` defaults to `#fff`.

## Reduced motion

The observer is still attached, but all characters are immediately opaque and untransformed with no stagger.

## Notes

The heading keeps the original string in `aria-label`; its split visual spans are `aria-hidden`. The observer disconnects after unmount.
