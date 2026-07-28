# Reading Progress Rail (React)

Reading Progress Rail is a fixed document or named-article indicator with an optional numeric readout. Reach for it on long-form pages where persistent orientation is useful.

## Markup

```tsx
import "motion-kit/tokens.css";
import { ReadingProgressRail } from "motion-kit/react/ReadingProgressRail";
<ReadingProgressRail edge="top" showPercentage targetId="article" />;
```

## Tunables

Props are `edge` (default `"top"`, or `"side"`), `showPercentage` (default `false`), and `targetId` (default document scrolling). CSS `--thickness`, `--track`, and `--fill` default to `4px`, `rgba(255,255,255,0.14)`, and `#a78bfa`; JS writes `--progress`.

## Reduced motion

Scroll tracking remains active because the rail is an indicator. The fill transition resolves to zero through the shared token.

## Notes

The component intentionally exposes `role="progressbar"`, a label, and synchronized numeric ARIA values. The target element must be scrollable if `targetId` is supplied.
