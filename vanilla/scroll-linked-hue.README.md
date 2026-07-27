# Scroll-Linked Hue / Opacity Background (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="scroll-linked-hue.css">
<section class="shb-background"><h2>Scroll the page</h2><p>The field follows document progress.</p></section>
<script type="module">import { mountScrollLinkedHue } from "./scroll-linked-hue.js"; mountScrollLinkedHue(document.querySelector(".shb-background"));</script>
```

## What's tunable

`--hue` defaults to `220` degrees and `--alpha` to `0.18` (the script ranges
them to about `330` and `0.34` at the bottom). Timing uses `--motion-fast` and
`--ease-out-soft`; keep alpha low enough for readable content.

## Notes

The passive scroll listener is rAF-throttled but still runs during page scroll;
it is the wrong choice when background color must remain stable or on a page
with heavy scroll work. Keep contrast valid across the full range. Reduced motion
fixes hue `220` and alpha `.18` and attaches no listener.
