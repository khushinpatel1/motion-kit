# Parallax Media Band (React)

Parallax Media Band renders an oversized image or video that moves more slowly than its full-bleed frame. Reach for it as a restrained atmospheric section break with content layered above.

## Markup

```tsx
import "motion-kit/tokens.css";
import { ParallaxMediaBand } from "motion-kit/react/ParallaxMediaBand";
<ParallaxMediaBand src="/landscape.jpg" alt="A quiet landscape" depth={0.35}>
  <h2>A slower horizon</h2>
</ParallaxMediaBand>;
```

## Tunables

Props are `src` (required), `alt` (default empty), `depth` (default `0.35`, clamped from `0` to `1`), `mediaType` (default `"image"`, or `"video"`), and `children`. JS writes `--depth`, `--progress`, and `--shift`; the band defaults to `min-height: 420px`.

## Reduced motion

The scroll listener is skipped, the computed shift is zero, and the media is centred and static.

## Notes

Overscan follows the formula `H + D × H`, with `(D × H) / 2` inset at each end, where `H` is band height and `D` is depth. `will-change` is enabled only while the band is in view. Videos autoplay muted and loop; provide useful alt text for images.
