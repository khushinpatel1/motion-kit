# Pulse Ring (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="pulse-ring.css">
<span class="pr-indicator" aria-hidden="true"></span><span>Live</span>
```

## What's tunable

There are no effect-specific custom properties. Override the dot/ring color and
the `22px` dot size, or use shared `--motion-slow` and `--ease-out-soft` tokens.

## Notes

Two continuous pseudo-element animations are cheap at small size but become
visual noise in a list; it is the wrong choice when status is not genuinely
active. Pair it with visible status text and keep the indicator decorative.
Reduced motion leaves a static, faint ring.
