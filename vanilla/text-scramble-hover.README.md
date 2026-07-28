# Text Scramble Hover (vanilla)

Use this on a short heading when a restrained, attention-drawing glyph scramble should resolve back to the real text on hover or keyboard focus.

## Markup

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="text-scramble-hover.css">
<h2 class="tsh-root">Read the signal</h2>
<script type="module">
  import { mountTextScrambleHover } from "./text-scramble-hover.js";
  mountTextScrambleHover(document.querySelector(".tsh-root"), { glyphs: "ABC123" });
</script>
```

## Tunables

`glyphs` defaults to `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?` and supplies the temporary characters. The CSS property `--tsh-color` defaults to `#fff`.

## Reduced motion

The mount leaves the original text intact, attaches no listeners, and the CSS hides the visual layer so the heading renders normally.

## Notes

Use short text. The hidden label preserves the accessible name; the animated layer is `aria-hidden`. One requestAnimationFrame loop runs only during a scramble.
