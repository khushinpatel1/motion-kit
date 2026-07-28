# Word Morph Cycle (vanilla)

Reach for this single-line treatment when one changing word should add editorial emphasis without shifting the surrounding sentence. The shell measures each word and animates its width as the active word changes.

## Markup

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="word-morph-cycle.css">
<span class="wmc"><span class="wmc-shell">build</span></span>
<script type="module">
  import { mountWordMorphCycle } from "./word-morph-cycle.js";
  mountWordMorphCycle(document.querySelector(".wmc"), { words: ["build", "ship", "tend"], interval: 3000 });
</script>
```

## Tunables

`words` defaults to `["build", "ship", "tend"]`. `interval` defaults to `--motion-ambient` between changes; pass milliseconds to override it. CSS `--wmc-color` defaults to `#fff` and JS writes `--wmc-width`.

## Reduced motion

The cycle does not start and the first word renders and stays. CSS also removes transforms, blur, and width transitions.

## Notes

Keep words short and use one line. The implementation uses one timeout, not a permanent animation loop; width measurement should be repeated if the font or container changes.
