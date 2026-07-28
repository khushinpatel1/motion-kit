# SVG Path Draw (vanilla)

SVG Path Draw progressively draws inline SVG paths according to how far the SVG has travelled through the viewport. Reach for it for diagrams, signatures, or editorial linework that should respond to scrolling and reverse naturally when the reader scrolls back.

## Markup

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="svg-path-draw.css">
<svg class="spd-svg" viewBox="0 0 200 100" aria-hidden="true">
  <path data-draw d="M10 80 C50 10 90 10 190 80" stroke="currentColor" stroke-width="2" />
</svg>
<script type="module">
  import { mountSvgPathDraw } from "./svg-path-draw.js";
  mountSvgPathDraw(document.querySelector(".spd-svg"), { stagger: 0.08 });
</script>
```

## Tunables

`stagger` defaults to `0.08` and delays each subsequent path by that fraction of viewport progress. `--spd-progress` is the root progress value; JS writes `--spd-length`, `--spd-start`, and `--spd-span` per path. Timing uses `--motion-fast` and `--ease-linear`.

## Reduced motion

Paths are measured and `--spd-progress` is set to `1` at mount. No scroll listener is attached, so every path is fully drawn immediately.

## Notes

The module uses `getTotalLength()` at mount and on resize. Give the SVG a meaningful accessible name when it conveys information; the example marks it decorative.
