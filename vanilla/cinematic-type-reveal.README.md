# Cinematic Type Reveal (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="cinematic-type-reveal.css">
<div id="headline"><div class="ctr-line">Build quietly.</div><div class="ctr-line">Ship clearly.</div></div>
<script type="module">import { mountCinematicTypeReveal } from "./cinematic-type-reveal.js"; mountCinematicTypeReveal(document.querySelector("#headline"));</script>
```

## What's tunable

There are no effect-specific custom properties. JS caps the per-line delay at
four `--motion-instant` steps; the transition uses `--motion-base` and
`--ease-out-expressive` from `tokens.css`.

## Notes

It uses `IntersectionObserver` once per line and changes text nodes by wrapping
their text in spans. It is the wrong choice when content must be visible before
observation or when motion adds no meaning. Reduced motion shows every line
immediately; do not rely on the reveal to communicate content or hierarchy.
