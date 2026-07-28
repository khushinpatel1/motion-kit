# Parallax Media Band (vanilla)

Parallax Media Band crops an oversized image or video while its subject moves more slowly than the frame. Reach for it as a restrained full-bleed section break where the media can carry atmosphere without competing with the content layered above it.

## Markup

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="parallax-media-band.css">
<section class="pmb-band">
  <img class="pmb-media" src="landscape.jpg" alt="A quiet landscape">
  <div class="pmb-content"><h2>A slower horizon</h2></div>
</section>
<script type="module">
  import { mountParallaxMediaBand } from "./parallax-media-band.js";
  mountParallaxMediaBand(document.querySelector(".pmb-band"), { depth: 0.35 });
</script>
```

## Tunables

`depth` defaults to `0.35` and is clamped from `0` (static) to `1` (full page-speed differential). `--pmb-depth` stores that value, `--pmb-progress` is the viewport travel value, and `--pmb-shift` is the computed pixel travel. The band’s `min-height` defaults to `420px`; `.pmb-content` defaults to `64px 28px` padding.

## Reduced motion

The listener is not attached, `--pmb-shift` is set to zero, and the media is centred and static. No gap can appear because no overscan is needed in this state.

## Notes

Overscan is calculated, not guessed: if the band height is `H` and depth is `D`, the media translates through `D × H`, so it is rendered at `H + D × H` and inset by `(D × H) / 2` on both ends. `will-change: transform` is applied only while the band is in view. Supply useful alt text unless the media is decorative.
