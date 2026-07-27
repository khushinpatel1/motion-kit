# Twirling Icon (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="twirling-icon.css">
<span class="ti-icon" role="img" aria-label="Sparkle"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 1 1.8 8.2L22 12l-8.2 1.8L12 22l-1.8-8.2L2 12l8.2-2.8L12 1Z" /></svg></span>
```

## What's tunable

There are no effect-specific custom properties. Override the `56px` container,
`27px` SVG, color, and shared `--motion-slow`, `--motion-fast`, `--ease-linear`,
and `--ease-out-soft` tokens.

## Notes

The icon spins continuously and speeds up on hover/focus, so it is the wrong
choice for repeated icons or a calm utility interface. Give it a meaningful
accessible label and do not use rotation as the only signal. Reduced motion
stops the animation while the icon remains visible.
