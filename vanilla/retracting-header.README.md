# Retracting Header (vanilla)

Retracting Header keeps navigation available while reclaiming vertical space during downward reading, then returns immediately when the reader scrolls up. Once the threshold is crossed it also gains an opaque surface and hairline border.

## Markup

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="retracting-header.css">
<header class="rh-header"><nav aria-label="Primary">...</nav></header>
<script type="module">
  import { mountRetractingHeader } from "./retracting-header.js";
  mountRetractingHeader(document.querySelector(".rh-header"), { threshold: 24, minDelta: 4 });
</script>
```

## Tunables

`threshold` defaults to `24px` and controls the solid background/border state. `minDelta` defaults to `4px` and guards against scroll jitter. `--rh-surface` and `--rh-border` default to a deep translucent surface and `rgba(255,255,255,0.18)`.

## Reduced motion

The header never retracts. Scroll still toggles the scrolled surface and border state.

## Notes

Keep the header’s navigation in normal semantic markup. The header is sticky, so its containing layout must not be an ancestor that prevents sticky positioning.
