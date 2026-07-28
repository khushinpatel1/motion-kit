# Typewriter Caret (vanilla)

Use this for a short entrance line that should type into a block caret and optionally move through several strings by deleting before the next one.

## Markup

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="typewriter-caret.css">
<p class="twc">Make room for better work</p>
<script type="module">
  import { mountTypewriterCaret } from "./typewriter-caret.js";
  mountTypewriterCaret(document.querySelector(".twc"), { strings: ["Make room", "Make better work"] });
</script>
```

## Tunables

`strings` defaults to the root's original text as one string. `deleteBetween` defaults to `true`; `loop` defaults to `true`. Each character uses the `--motion-instant` token. CSS `--twc-color` defaults to `#fff`.

## Reduced motion

The first complete string renders instantly. The caret remains present and does not blink.

## Notes

The complete text is in a visually hidden, non-live node for assistive technology; the animated node is `aria-hidden`. This is timer-driven, not an rAF loop.
