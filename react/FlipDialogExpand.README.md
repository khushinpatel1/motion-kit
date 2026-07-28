# Flip Dialog Expand (React)

A native modal dialog that grows from its originating card using the same FLIP geometry as the vanilla effect. Use it when a card and its detail surface should feel like one object.

## Markup

```tsx
<FlipDialogExpand title="Open detail"><p>Detail content.</p></FlipDialogExpand>
```

## Tunables

Props are `title` and `children`. CSS consumes `--motion-base` and `--ease-out-expressive`; the component writes the four `--fde-*` FLIP properties while opening.

## Reduced motion

FLIP measurement and transform playback are skipped; the native dialog appears plainly.

## Notes

Requires native `<dialog>`. The browser supplies top-layer, backdrop, and modal semantics; the component returns focus to the card.

