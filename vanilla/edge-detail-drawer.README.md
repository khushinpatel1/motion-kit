# Edge Detail Drawer (vanilla)

A right- or left-edge detail panel over a scrim that locks body scroll and restores the exact prior scroll position. Reach for contextual detail that should preserve the page underneath without allowing focus to leak behind it.

## Markup

```html
<div class="edd-root"><button class="edd-trigger">Open details</button><button class="edd-scrim" aria-label="Close details"></button><div class="edd-drawer" role="dialog" aria-modal="true" tabindex="-1"><button>Close</button>Detail content.</div></div>
<script type="module">import { mountEdgeDetailDrawer } from "./edge-detail-drawer.js"; mountEdgeDetailDrawer(document.querySelector(".edd-root"), { side: "right" });</script>
```

## Tunables

`side` defaults to `right` and accepts `left`. CSS uses `--motion-base` and `--ease-out-expressive`.

## Reduced motion

The drawer and scrim appear without sliding. Scroll lock, scroll restoration, Escape, scrim close, focus trap, and focus return still apply.

## Notes

The drawer needs a close control and a focusable target. Tab and Shift+Tab wrap within it; the scrim is a real button so it has an accessible name.

