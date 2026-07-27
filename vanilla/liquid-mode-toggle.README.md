# Liquid Mode Toggle (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="liquid-mode-toggle.css">
<button class="lm-toggle" type="button" aria-pressed="false" aria-label="Toggle mode"></button>
<script type="module">import { mountLiquidModeToggle } from "./liquid-mode-toggle.js"; mountLiquidModeToggle(document.querySelector(".lm-toggle"), { onChange: pressed => document.body.dataset.mode = pressed ? "light" : "dark" });</script>
```

## What's tunable

There are no effect-specific custom properties. Override the 70×40px control,
its colors, organic radii, and the shared `--motion-fast`, `--ease-out-soft`, and
`--ease-out-expressive` tokens.

## Notes

The mount function toggles `aria-pressed` but does not provide a visible label or
mode persistence. It is the wrong choice if a native checkbox or a labelled
settings control is clearer. Keep the real button and its state accessible;
reduced motion collapses only the visual transition.
