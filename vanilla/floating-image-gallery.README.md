# Floating Image Gallery (vanilla)

A grid of image cards with uniform cells and generous gutters. One hovered
cell grows 25% and rises clearly above its neighbours; click or Enter opens the
image full screen. Built for a 5-wide × 4-tall (20-image) display, but works
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

The gallery needs a dark-ish background to read well. It does not ship a
background of its own; drop it into whatever page shell you're using.

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

- Every cell is a real `<button>` with an accessible name. Arrow keys use
  roving tabindex to navigate the grid; the modal moves focus to its close
  button and returns it to the opening cell on `Escape`, close, or backdrop
  click.
- **Reduced motion** removes the scale/lift transition while preserving the
  grid and focus behaviour.
