# Morphing Mobile Nav Pill (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="morphing-mobile-nav.css">
<nav class="mn-nav" aria-label="Sections"><span class="mn-indicator"></span><button class="mn-tab is-active" type="button">Home</button><button class="mn-tab" type="button">Library</button><button class="mn-tab" type="button">Settings</button></nav>
<script type="module">import { mountMorphingMobileNav } from "./morphing-mobile-nav.js"; mountMorphingMobileNav(document.querySelector(".mn-nav"));</script>
```

## What's tunable

There are no effect-specific custom properties. `.mn-tab` padding (default
`11px 16px`) determines measured indicator width; adjust it and the shared
`--motion-fast`/`--ease-out-expressive` tokens.

## Notes

The mount function measures buttons and replaces them with clones on destroy;
it does not manage the content shown for each section. It is the wrong choice
when tabs need a full tabpanel implementation. Use real buttons and an explicit
active state; reduced motion makes indicator movement immediate.
