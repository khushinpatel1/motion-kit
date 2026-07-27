# Command Palette Bloom (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="command-palette-bloom.css">
<button id="search" type="button">Search</button>
<div id="palette" class="cp-backdrop" aria-hidden="true"><div class="cp-panel" role="dialog" aria-modal="true"><input class="cp-input" placeholder="Type a command…"><div class="cp-list"><div class="cp-item">Open settings</div></div></div></div>
<script type="module">import { mountCommandPaletteBloom } from "./command-palette-bloom.js"; mountCommandPaletteBloom(document.querySelector("#palette"), { trigger: document.querySelector("#search") });</script>
```

## What's tunable

There are no effect-specific custom properties. Override `.cp-panel` width (the
default is `min(560px, calc(100vw - 32px))`), spacing, colors, and blur. Timing
comes from `--motion-base`, `--ease-out-soft`, and `--ease-out-expressive`.

## Notes

The palette adds a document Escape listener and does not implement focus
trapping or command filtering. It is the wrong choice if you need a complete
accessible dialog without supplying those pieces. Use a real input, dialog
label, and actionable keyboard-operable rows; reduced motion only removes the
visual transition.
