# Card Fan Deck (vanilla)

A neat stack that fans into an indexed arc on hover or keyboard focus, then lifts the individual hovered or focused card above its neighbors. Use for a small visual collection where the pile is a compact resting state.

## Markup

```html
<div class="cfd-deck" style="--deck-count: 3"><article class="cfd-card" style="--i: 0" tabindex="0">One</article><article class="cfd-card" style="--i: 1" tabindex="0">Two</article><article class="cfd-card" style="--i: 2" tabindex="0">Three</article></div>
```

## Tunables

`--deck-count` defaults to `5`; `--fan-angle` defaults to `28deg`; `--fan-spread` defaults to `92px`; and `--fan-lift` defaults to `18px`. Each card requires its zero-based `--i` index. Timing uses `--motion-base`, `--motion-fast`, and `--ease-out-expressive`.

## Reduced motion

The deck still switches between pile and fan, but token durations are zero so it snaps rather than animates. The focused card still lifts.

## Notes

Use a small number of cards and ensure each card has a visible focus treatment in the surrounding design. The effect is pure CSS and has no touch-only hover dependency.

