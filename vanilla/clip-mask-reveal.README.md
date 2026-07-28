# Clip Mask Reveal (vanilla)

Clip Mask Reveal wipes an image, card, or block into view when it enters the viewport. Reach for it when the content should feel like it arrives from a clear direction rather than simply fading in.

## Markup

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="clip-mask-reveal.css">
<article class="cmr-reveal" data-direction="up">A revealed card</article>
<script type="module">
  import { mountClipMaskReveal } from "./clip-mask-reveal.js";
  mountClipMaskReveal(document.querySelector(".cmr-reveal"), { direction: "up" });
</script>
```

## Tunables

`data-direction` or `direction` defaults to `"up"` and accepts `up`, `down`, `left`, or `right`. `threshold` defaults to `0.15` and controls the IntersectionObserver trigger. `--cmr-shift` defaults to `24px` and controls the content’s arrival distance.

## Reduced motion

The observer still fires conceptually at mount, but the element is made fully visible immediately with no transform, clip, opacity, or transition.

## Notes

The observer disconnects after the first intersection. Keep meaningful text and controls in the revealed element; clipping is visual treatment, not content hiding.
