# Edge Detail Drawer (React)

A focus-trapped detail drawer that slides from either edge over a scrim while preserving the page and scroll position behind it.

## Markup

```tsx
<EdgeDetailDrawer side="right"><p>Detail content.</p></EdgeDetailDrawer>
```

## Tunables

Props are `children`, `label` (default `Open details`), and `side` (default `right`, or `left`). CSS consumes `--motion-base` and `--ease-out-expressive`.

## Reduced motion

The drawer appears without sliding; modal focus and scroll behavior are unchanged.

## Notes

Escape closes, the scrim closes, Tab wraps in both directions, and focus returns to the trigger.

