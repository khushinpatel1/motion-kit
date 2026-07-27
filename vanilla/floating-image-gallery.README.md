# Floating Image Gallery (vanilla)

A grid of image cards that float at rest, grow 25% and take center stage on
hover (siblings dim), flip to reveal a caption, and open full screen on
click. Built for a 5-wide × 4-tall (20-image) art/design display, but works
with any item count or column count.

## Use it

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="floating-image-gallery.css">
<div id="gallery"></div>
<script type="module">
  import { mountFloatingImageGallery } from "./floating-image-gallery.js";
  mountFloatingImageGallery(document.getElementById("gallery"), {
    columns: 5,
    items: [
      { title: "Vault roots", description: "...", src: "/img/vault-roots.png", alt: "..." },
      // ...
    ],
  });
</script>
```

The gallery needs a dark-ish background to read well — the glow and shadow
layers are tuned for that. It does not ship a background of its own; drop it
into whatever page shell you're using.

## What's tunable

Set these as inline CSS custom properties on the container before mounting,
or override in your own stylesheet after `floating-image-gallery.css`:

- `--fig-columns` — grid width (`mountFloatingImageGallery`'s `columns` option
  sets this for you).
- `--fig-gap` — space between cards. Default `64px`; deliberately generous so
  the field reads as floating rather than tiled.
- `--fig-hover-scale` — default `1.25` (grows 25%).
- `--fig-hover-lift` — default `-56px` (how high the card rises on hover).

## Notes

- **Center-stage dimming uses `:has()`.** Supported in current Safari,
  Chrome, Firefox. Where it's unsupported the dim just doesn't happen — the
  grow and lift still work, so it degrades gracefully rather than breaking.
- **Idle float amplitude/phase is staggered per card** (deterministic from
  index, not random) so a full grid doesn't visibly breathe in sync.
- **Reduced motion**: `tokens.css` zeroes transition durations globally. The
  one thing that needs an explicit stop is the idle float — it's a continuous
  `animation`, not a one-off transition, so `floating-image-gallery.css` sets
  `animation: none` under `prefers-reduced-motion: reduce` directly.
- Every card is a real `<button>`; the modal moves focus to its close button
  on open and closes on `Escape` or backdrop click.
