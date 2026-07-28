# Char Rise Reveal (vanilla)

Use this when a heading should reveal character by character as it enters the viewport. It is deliberately smaller in scale than a line-level cinematic reveal and is best for short display text.

## Markup

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="char-rise-reveal.css">
<h2 class="crr-root">A quieter kind of motion</h2>
<script type="module">
  import { mountCharRiseReveal } from "./char-rise-reveal.js";
  mountCharRiseReveal(document.querySelector(".crr-root"), { staggerStep: 1, threshold: 0.2 });
</script>
```

## Tunables

`staggerStep` defaults to `1` and is multiplied by `--motion-instant` per character. `threshold` defaults to `0.2` and is passed to IntersectionObserver. JS writes `--crr-index`; CSS `--crr-color` defaults to `#fff`.

## Reduced motion

The observer still observes the root, but CSS makes every character fully opaque, untransformed, and unstaggered so content is never hidden.

## Notes

The original string is the container's `aria-label` and split spans are `aria-hidden`. IntersectionObserver is used once and each root is unobserved after entering.
