# Marquee / Logo Strip (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="marquee-logo-strip.css">
<div class="ml-viewport"><div class="ml-track"><div class="ml-group"><span>One</span><span>Two</span></div><div class="ml-group"><span>One</span><span>Two</span></div></div></div>
```

## What's tunable

There are no effect-specific custom properties. Change `.ml-group`'s `gap` and
`padding-right` (both default to `42px`), and the shared `--motion-ambient`
(about `3000ms` or longer) and `--ease-linear` tokens.

## Notes

This is a continuous animation and requires duplicated groups for the loop; it
is the wrong choice for critical instructions, long labels, or a page already
full of motion. Logos still need meaningful accessible text. Reduced motion
stops the track, leaving the duplicated content in place.
