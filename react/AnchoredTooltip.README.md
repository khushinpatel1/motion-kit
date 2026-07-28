# Anchored Tooltip (React)

A delayed, viewport-aware tooltip that opens on pointer hover or keyboard focus and flips its preferred side when necessary. Keep its content brief and non-interactive.

## Markup

```tsx
<AnchoredTooltip content="Helpful context" side="top"><span>Info</span></AnchoredTooltip>
```

## Tunables

Props are `content`, `children`, `delay` (default `250`), and `side` (default `top`). JS writes `--at-x`, `--at-y`, and `--at-origin`; CSS uses `--motion-fast` and `--ease-out-soft`.

## Reduced motion

The configured delay still applies. The tooltip has no lift and zero visual duration.

## Notes

The component renders a button trigger and a `role="tooltip"`; do not put interactive content inside the tooltip.

