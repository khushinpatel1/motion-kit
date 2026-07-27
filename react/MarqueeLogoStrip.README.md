# Marquee / Logo Strip (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { MarqueeLogoStrip } from "motion-kit/react/MarqueeLogoStrip";
<MarqueeLogoStrip items={["One", "Two", "Three"]} />;
```

## What's tunable

The only prop is `items?: string[]`; the module has no effect-specific custom
properties. Change group `gap`/`padding-right` (default `42px`) and shared
`--motion-ambient`/`--ease-linear` tokens in your stylesheet.

## Notes

It continuously animates duplicated groups, so it is the wrong choice for
critical instructions or motion-heavy pages. Provide meaningful text for each
logo and do not make movement the only way to discover it. Reduced motion stops
the track, leaving both groups visible.
