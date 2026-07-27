# motion-kit

Nineteen ambient/interactive motion effects, each in two dependency-free
forms — vanilla CSS+JS and plain React (CSS Modules, no Tailwind) — built on
one shared duration/easing token system so a page using several of them reads
as one motion language instead of a dozen things animating on their own
clock.

Open `gallery/index.html` directly in a browser (no build step, no server) to
see all 19 live, organized by category, each with a "view source" link.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="vanilla/floating-image-gallery.css">
<div id="gallery"></div>
<script type="module">
  import { mountFloatingImageGallery } from "./vanilla/floating-image-gallery.js";
  mountFloatingImageGallery(document.getElementById("gallery"), {
    columns: 5,
    items: [{ title: "...", description: "...", src: "...", alt: "..." }],
  });
</script>
```

Or in React:

```tsx
import { FloatingImageGallery } from "motion-kit/react/FloatingImageGallery";
import "motion-kit/tokens.css";

<FloatingImageGallery columns={5} items={items} />
```

## What's here

- **`tokens.css` / `tokens.md`** — the shared vocabulary. Every effect
  references these durations and easings; none hardcodes its own.
- **`vanilla/`** — one `.css` (+ `.js` where the effect needs pointer/scroll
  logic) and one `.README.md` per effect. No dependencies, no build step.
- **`react/`** — one `.tsx` + `.module.css` + `.README.md` per effect. CSS
  Modules, typed props, no animation library.
- **`gallery/index.html`** — every effect live, organized by category
  (ambient, reactive, interaction, entrance, expressive, data, data-adjacent,
  scroll, atmosphere, gallery).
- **`manifest.json`** — one entry per effect: category, file paths, perf
  notes, reduced-motion status.

See `NORTH.md` for the fuller picture (laws, structure, current state).
