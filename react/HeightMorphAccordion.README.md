# Height Morph Accordion (React)

An accessible unknown-height accordion using the same grid-row morph as the vanilla form. Use it for editorial details, FAQs, and settings where content should stay in normal flow.

## Markup

```tsx
<HeightMorphAccordion items={[{ title: "One", content: <p>Panel content.</p> }]} />
```

## Tunables

Props are `items` and `multiple` (default `false`). CSS consumes `--motion-fast` and `--ease-out-soft`.

## Reduced motion

Token durations become zero and collapsed panels remain `hidden`; arrow-key header navigation stays active.

## Notes

Items need a title and React node. The component supplies unique ids, `aria-expanded`, and `aria-controls`.

