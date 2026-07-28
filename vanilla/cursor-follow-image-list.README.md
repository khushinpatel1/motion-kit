# Cursor Follow Image List (vanilla)

A hover-only list that reveals one preview image, eases it toward the pointer, and adds a restrained velocity tilt while rows cross-fade between images. Use it for projects or articles where imagery is supplementary and the text list must stand on its own.

## Markup

```html
<div class="cfil-list"><a class="cfil-row" data-image="project.jpg" href="/project">Project one</a><span class="cfil-preview" aria-hidden="true"><img alt=""></span></div>
<script type="module">import { mountCursorFollowImageList } from "./cursor-follow-image-list.js"; mountCursorFollowImageList(document.querySelector(".cfil-list"), { lag: 0.14, rotationCap: 8 });</script>
```

## Tunables

`lag` defaults to `0.14` and controls follow response. `rotationCap` defaults to `8` degrees. JS writes `--cfil-x`, `--cfil-y`, and `--cfil-rotation`; CSS consumes `--motion-fast` and `--ease-out-soft`.

## Reduced motion

The preview is hidden entirely and no pointer listeners or requestAnimationFrame loop are attached. The result is a plain list.

## Notes

The effect is gated by `(hover: hover)` and a pointer-capable input. It runs one rAF loop only while a row is hovered. Keep the image decorative and preserve meaningful row text and links.

