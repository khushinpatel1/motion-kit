# FloatingImageGallery (React)

Same behavior as the vanilla version: cards float at rest, grow 25% and take
center stage on hover, flip to reveal a caption, and open full screen on click.
This is a straight React port of `vanilla/floating-image-gallery.css` and
`vanilla/floating-image-gallery.js`; its CSS Modules names are scoped versions
of the same structure.

## Use it

```tsx
import "motion-kit/tokens.css";
import { FloatingImageGallery } from "motion-kit/react/FloatingImageGallery";

<FloatingImageGallery
  columns={5}
  items={[{ title: "Vault roots", description: "A study", src: "/img/vault-roots.png", alt: "Vault roots" }]}
/>;
```

## What's tunable

Props are `items` (required, non-empty), each with `title`, `src`, optional
`description`/`alt`, and `columns` (default `5`). CSS custom properties are
`--fig-columns` (set by `columns`), `--fig-gap` (default `64px`),
`--fig-hover-scale` (default `1.25`, sensible range `1–1.4`), and
`--fig-hover-lift` (default `-56px`, roughly `-24px` to `-80px`). Timing comes
from `--motion-ambient`, `--motion-slow`, `--motion-base`, and shared easing
tokens. The `--fig-idle-*` values are generated internally per item.

## Notes

This is a high-cost, layered effect: 3D transforms, blur/glow, lazy images,
`:has()` sibling dimming, and a fullscreen modal. It is the wrong choice for a
dense thumbnail list or a page that needs instant scanning. The cards and modal
use real buttons and image alts, but you still need meaningful `alt` text and
descriptions; focus trapping is not implemented. Reduced motion stops the idle
animation and collapses tokenized transitions.
