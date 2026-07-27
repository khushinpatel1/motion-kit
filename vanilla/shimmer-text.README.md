# Shimmer Text (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="shimmer-text.css">
<h1 class="st-text">New collection</h1>
```

## What's tunable

There are no effect-specific custom properties. Override the gradient stops and
`background-size` (default `250% 100%`), and use `--motion-ambient` plus
`--ease-linear` for timing.

## Notes

The animated gradient is decorative and can reduce readability; it is the wrong
choice for body copy, long labels, or important instructions. The text remains
real text, but verify contrast at every gradient position. Reduced motion stops
the sweep and leaves the static gradient.
