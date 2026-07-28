# Underline Draw Link (vanilla)

Use this for an inline link whose underline should draw directionally from left to right on hover or keyboard focus, then retract toward the right when it rests.

## Markup

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="underline-draw-link.css">
<a class="udl-link" href="/journal">Read the journal</a>
```

## Tunables

`--udl-color` defaults to `var(--link-underline-color, currentColor)`. `--udl-thickness` defaults to `2px`. Timing uses `--motion-fast` and `--ease-out-soft`.

## Reduced motion

Durations collapse to `0ms` through `tokens.css`, so the underline simply appears and disappears. There is no bespoke reduced-motion path.

## Notes

This is CSS-only and works with keyboard focus as well as hover. Keep the real anchor text and href intact.
