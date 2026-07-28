# Gooey Radial Menu (vanilla)

A floating action button that fans ordered actions around a radius while an SVG blur/color-matrix filter visually merges the open group. Use it for a small set of secondary actions, not primary navigation.

## Markup

```html
<div class="grm-menu"><div class="grm-items"><button class="grm-item">A</button><button class="grm-item">B</button></div><button class="grm-trigger" aria-expanded="false">+</button><svg aria-hidden="true" width="0" height="0"><filter id="grm-goo-filter"><feGaussianBlur stdDeviation="8" result="blur"></feGaussianBlur><feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"></feColorMatrix></filter></svg></div>
<script type="module">import { mountGooeyRadialMenu } from "./gooey-radial-menu.js"; mountGooeyRadialMenu(document.querySelector(".grm-menu"), { radius: 104, arc: 120 });</script>
```

## Tunables

`radius` defaults to `104` pixels, `arc` to `120` degrees, and `itemCount` defaults to the number of `.grm-item` elements. JS writes `--grm-x`, `--grm-y`, and `--grm-index`; CSS consumes `--motion-base`, `--motion-fast`, and `--motion-instant`.

## Reduced motion

Items are assigned final radial positions with no travel or stagger. Escape still closes and returns focus to the trigger.

## Notes

Items must be real buttons or links. The filter is decoration and may be omitted; it is applied only while open because SVG filters can be expensive to composite. Never put the only usable label in a decorative effect.

