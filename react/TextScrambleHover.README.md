# Text Scramble Hover (React)

Use this for a short heading that scrambles briefly on hover or focus and then resolves left to right.

## Markup

```tsx
import "motion-kit/tokens.css";
import { TextScrambleHover } from "motion-kit/react/TextScrambleHover";
<h2><TextScrambleHover glyphs="ABC123">Read the signal</TextScrambleHover></h2>;
```

## Tunables

`children` is the accessible text. `glyphs` defaults to `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?`. CSS `--tsh-color` defaults to `#fff`.

## Reduced motion

The full label renders normally, the visual layer is hidden, and no listeners are attached.

## Notes

The visual text is `aria-hidden`; keep the children short. One rAF loop exists only while scrambling.
