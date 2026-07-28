# Reading Progress Rail (vanilla)

Reading Progress Rail is a fixed document or article progress indicator with an optional percentage pill. Reach for it on long-form pages where orientation matters and a small, persistent signal is more useful than a large progress widget.

## Markup

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="reading-progress-rail.css">
<div class="rpr-rail" data-edge="top" role="progressbar" aria-label="Reading progress">
  <span class="rpr-fill"></span><span class="rpr-label"></span>
</div>
<script type="module">
  import { mountReadingProgressRail } from "./reading-progress-rail.js";
  mountReadingProgressRail(document.querySelector(".rpr-rail"), { showPercentage: true });
</script>
```

## Tunables

`edge` defaults to `"top"`; use `"side"` for a left rail. `target` defaults to the document and accepts an element or selector for a scrollable article. `showPercentage` defaults to `false`. `--rpr-thickness`, `--rpr-track`, and `--rpr-fill` default to `4px`, `rgba(255,255,255,0.14)`, and `#a78bfa`.

## Reduced motion

The rail continues tracking scroll because it is an indicator, not decoration. Its fill transition resolves to zero through the shared motion token.

## Notes

This implementation deliberately exposes the rail as `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and synchronized `aria-valuenow`. Hide it from assistive technology only if you remove that role and make it purely decorative.
