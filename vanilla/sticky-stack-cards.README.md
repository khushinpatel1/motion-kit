# Sticky Stack Cards (vanilla)

Sticky Stack Cards turns a vertical sequence into a quiet deck: each card pins at the same offset and compresses as the next card covers it. Reach for it for a small sequence of related editorial panels, not an unbounded feed.

## Markup

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="sticky-stack-cards.css">
<div class="ssc-stack" style="--ssc-scale-floor: .92; --ssc-pin-offset: 24px">
  <article class="ssc-card">First card</article>
  <article class="ssc-card">Second card</article>
</div>
```

## Tunables

`--ssc-scale-floor` defaults to `0.92` and is the smallest scale reached by a pinned card. `--ssc-pin-offset` defaults to `24px` and sets the sticky top offset. The compression uses the shared `--motion-slow` token as its scroll-linked animation clock.

## Reduced motion

Cards still stack and pin, but the scale animation is removed and every card stays at full size.

## Notes

Scaling uses `animation-timeline: view()` where supported; browsers without scroll-driven animation support retain the sticky stack without compression. Avoid placing an ancestor with `overflow` or a constrained height around the stack.
