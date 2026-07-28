# Cursor Follow Image List (React)

A hover-only project or article list with one lagging, velocity-tilted preview that swaps as rows change. The list remains useful without imagery on touch or reduced-motion devices.

## Markup

```tsx
<CursorFollowImageList items={[{ label: "Project one", image: "/project.jpg", href: "/project" }]} />
```

## Tunables

Props are `items`, `lag` (default `0.14`), and `rotationCap` (default `8` degrees). JS writes `--cfil-x`, `--cfil-y`, and `--cfil-rotation`; CSS consumes `--motion-fast` and `--ease-out-soft`.

## Reduced motion

The preview is not shown and no rAF loop runs; rows remain ordinary links.

## Notes

The loop runs only while a row is active and the media query permits hover. Preview images are decorative; labels and links carry the meaning.

