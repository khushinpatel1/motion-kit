# FloatingImageGallery (React)

Same behavior as the vanilla version: uniform grid cells use generous gutters,
one hovered cell grows 25% and rises above its neighbours, and click or Enter
opens the image full screen. Arrow keys navigate with roving tabindex. This is
a straight React port of `vanilla/floating-image-gallery.css` and
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
from `--motion-base` and shared easing tokens. Reduced motion removes the
scale/lift transition while preserving keyboard navigation and focus return.

## Notes

This is a layered effect with 3D transforms, lazy images, and a fullscreen
modal. It is the wrong choice for a dense thumbnail list or a page that needs
instant scanning. The cards and modal use real buttons, image alts, focus
trapping, and focus return; meaningful `alt` text and descriptions are still
recommended.
