# Cursor Spotlight Card (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="cursor-spotlight-card.css">
<article class="cs-card"><strong>Cursor spotlight</strong><span>Move a pointer across the surface</span></article>
<script type="module">import { mountCursorSpotlightCard } from "./cursor-spotlight-card.js"; mountCursorSpotlightCard(document.querySelector(".cs-card"));</script>
```

## What's tunable

`--x` and `--y` are the pointer-written custom properties; initialize them as
percentages or positions such as `50%`. There are no other effect-specific
custom properties. Override the gradient colors and `--motion-fast`/
`--ease-out-soft` timing if needed.

## Notes

This adds one `pointermove` listener on hover-capable devices and is decorative;
it is the wrong choice for dense lists or touch-first interfaces. Keep card
content readable without the spotlight and expose any action as a real control.
Reduced motion removes transition time, but pointer tracking remains enabled.
