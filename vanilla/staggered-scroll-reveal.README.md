# Staggered Scroll Reveal (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="staggered-scroll-reveal.css">
<div id="features"><article class="ssr-item" data-stagger-item>First</article><article class="ssr-item" data-stagger-item>Second</article></div>
<script type="module">import { mountStaggeredScrollReveal } from "./staggered-scroll-reveal.js"; mountStaggeredScrollReveal(document.querySelector("#features"));</script>
```

## What's tunable

JS writes `--ssr-delay` as `calc(--motion-instant * min(index, 5))`; the cap is
five steps. The CSS owns a `22px` vertical offset. Timing uses `--motion-base`,
`--motion-instant`, and `--ease-out-expressive`; there are no other custom props.

## Notes

Each item is observed once and remains in the DOM, but content starts hidden;
it is the wrong choice for critical content that must be immediately visible or
for very long lists. Do not make the reveal the only way to discover text.
Reduced motion marks every item visible with no transition.
