# Clip Mask Reveal (React)

Clip Mask Reveal wipes supplied content into view as it enters the viewport. Reach for it when an image, card, or type block should arrive directionally rather than simply fade.

## Markup

```tsx
import "motion-kit/tokens.css";
import { ClipMaskReveal } from "motion-kit/react/ClipMaskReveal";
<ClipMaskReveal direction="up"><article>Revealed content</article></ClipMaskReveal>;
```

## Tunables

Props are `children`, `direction` (default `"up"`; `up`, `down`, `left`, or `right`), and `threshold` (default `0.15`). CSS `--shift` defaults to `24px`; timing uses `--motion-base` and `--ease-out-expressive`.

## Reduced motion

The component skips observer animation work and adds its visible state immediately. CSS also removes clip, transform, opacity, and transition motion.

## Notes

The observer disconnects after the first intersection. Keep meaningful text and controls in the content rather than relying on the reveal itself.
