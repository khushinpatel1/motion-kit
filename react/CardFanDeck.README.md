# Card Fan Deck (React)

A small indexed card stack that fans on hover or focus and lifts the active card above its neighbors. Use for compact visual collections with keyboard-accessible cards.

## Markup

```tsx
<CardFanDeck cards={[<span>One</span>, <span>Two</span>, <span>Three</span>]} />
```

## Tunables

Props are `cards`, `fanAngle` (default `28deg`), `spread` (default `92px`), and `lift` (default `18px`). CSS sets each card’s `--i` and consumes `--motion-base`, `--motion-fast`, and `--ease-out-expressive`.

## Reduced motion

The deck snaps between pile and fan because shared durations become zero; focus still lifts the active card.

## Notes

Cards receive `tabIndex=0`; keep the collection small and provide visible, meaningful card content.

