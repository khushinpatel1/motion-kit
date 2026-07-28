# Anchored Tooltip (vanilla)

An intentionally non-interactive tooltip that waits, positions beside its trigger, and flips to the opposite side when the preferred placement does not fit. Reach for short supplemental labels, not essential instructions or interactive content.

## Markup

```html
<span class="at-tooltip-root"><button class="at-trigger">Info</button><span class="at-tooltip" role="tooltip">Helpful context</span></span>
<script type="module">import { mountAnchoredTooltip } from "./anchored-tooltip.js"; mountAnchoredTooltip(document.querySelector(".at-tooltip-root"), { delay: 250, side: "top" });</script>
```

## Tunables

`delay` defaults to `250` milliseconds. `side` defaults to `top` and accepts `top`, `bottom`, `left`, or `right`. JS writes `--at-x`, `--at-y`, and `--at-origin`; CSS consumes `--motion-fast` and `--ease-out-soft`.

## Reduced motion

The delay remains, but the tooltip appears and disappears without a lift and shared duration is zero.

## Notes

The tooltip must not contain links, buttons, or other interactive controls. Hover behavior is enabled only when `(hover: hover)` matches; keyboard focus always works.

