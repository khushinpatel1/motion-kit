# Flip Dialog Expand (vanilla)

A card that expands into a native modal dialog by measuring the source and destination rectangles, inverting the dialog onto the card, and playing to its final geometry. Use it for detail views that have a strong visual relationship to an originating card.

## Markup

```html
<div class="fde-root"><button class="fde-card">Open detail</button><dialog class="fde-dialog"><div class="fde-dialog-inner"><button class="fde-dialog-close">Close</button>Detail content.</div></dialog></div>
<script type="module">import { mountFlipDialogExpand } from "./flip-dialog-expand.js"; mountFlipDialogExpand(document.querySelector(".fde-root"));</script>
```

## Tunables

No JavaScript options. JS writes `--fde-x`, `--fde-y`, `--fde-scale-x`, and `--fde-scale-y`; CSS consumes `--motion-base` and `--ease-out-expressive`.

## Reduced motion

The implementation skips all FLIP reads, inversion, and playback. The native dialog opens and closes plainly.

## Notes

This requires native `<dialog>` and `showModal()`. Escape is intercepted so closing returns focus to the originating card.

