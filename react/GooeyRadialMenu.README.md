# Gooey Radial Menu (React)

A small floating action menu whose ordered items fan around a radius and optionally merge visually through an SVG goo filter. Use for secondary actions that remain valid as ordinary buttons or links.

## Markup

```tsx
<GooeyRadialMenu items={[<button type="button">A</button>, <button type="button">B</button>]} />
```

## Tunables

Props are `items`, `radius` (default `104`), `arc` (default `120`), and `label` (default `Open actions`). CSS consumes `--motion-base`, `--motion-fast`, and `--motion-instant`; positions are written as `--grm-x`, `--grm-y`, and `--grm-index`.

## Reduced motion

The radial positions are final immediately, with no travel or stagger. Keyboard order and Escape close remain.

## Notes

The SVG filter is decoration and can be removed if unsupported or too expensive. Supply real buttons or links as items.

