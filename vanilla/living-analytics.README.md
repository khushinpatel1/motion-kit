# Living Analytics Bars + Counter (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="living-analytics.css">
<div id="analytics"><strong class="la-count">0</strong><div class="la-chart"><span class="la-bar" style="--target:.4"></span><span class="la-bar" style="--target:.8"></span></div></div>
<script type="module">import { mountLivingAnalytics } from "./living-analytics.js"; mountLivingAnalytics(document.querySelector("#analytics"), { value: 8420 });</script>
```

## What's tunable

Pass `value` for the final counter. Set each bar's `--target` between `0` and
`1`; JS supplies the staggered `--la-delay`. Timing uses `--motion-base`,
`--motion-instant`, and `--ease-out-expressive` from `tokens.css`.

## Notes

IntersectionObserver starts one counter rAF and transitions the bars once. It is
the wrong choice when exact data must be available before scrolling into view or
when a decorative chart could be mistaken for live reporting. Provide a text
equivalent and meaningful labels. Reduced motion jumps to final values.
