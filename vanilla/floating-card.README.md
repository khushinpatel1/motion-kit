# Floating Card (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="floating-card.css">
<article class="fc-card"><strong>Floating card</strong><span>Ambient surface</span></article>
```

## What's tunable

There are no effect-specific custom properties. Override the card surface and
the shared `--motion-ambient` (use about `3000ms` or longer for an ambient loop),
`--motion-fast`, `--ease-out-soft`, and `--ease-out-expressive` tokens.

## Notes

The idle loop is continuous and the shadow is visually heavy, so it is the wrong
choice for dense card grids or content that should feel still. The hover/focus
state pauses the loop; reduced motion disables it. Keep focusable content inside
the card and do not use floating as the only state signal.
