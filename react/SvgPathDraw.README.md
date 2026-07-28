# SVG Path Draw (React)

SVG Path Draw progressively draws one or more inline paths as the SVG travels through the viewport and reverses when scrolling back. Reach for it for diagrams, signatures, and restrained editorial linework.

## Markup

```tsx
import "motion-kit/tokens.css";
import { SvgPathDraw } from "motion-kit/react/SvgPathDraw";
<SvgPathDraw paths={["M10 80 C50 10 90 10 190 80"]} viewBox="0 0 200 100" />;
```

## Tunables

Props are `paths`, required SVG `d` strings; `viewBox` (default `"0 0 200 100"`); `stagger` (default `0.08`); `stroke` (default `currentColor`); and `strokeWidth` (default `2`). JS writes `--progress`, `--length`, `--start`, and `--span`; timing uses `--motion-fast` and `--ease-linear`.

## Reduced motion

Paths are measured and fully drawn at mount. No scroll listener is attached.

## Notes

The component renders the SVG as `aria-hidden`. Wrap it with a text equivalent or change the component’s accessibility treatment when the drawing carries meaning.
