# Morphing Mobile Nav Pill (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { MorphingMobileNav } from "motion-kit/react/MorphingMobileNav";
<MorphingMobileNav tabs={["Home", "Library", "Settings"]} />;
```

## What's tunable

Pass `tabs?: string[]`; the active button's measured width controls the internal
indicator. There are no effect-specific custom properties; the module uses
`--motion-fast` and `--ease-out-expressive`.

## Notes

It manages selected index locally but does not render tabpanel content or expose
a controlled active value. It is the wrong choice when navigation state must be
owned by a router or parent. It uses real buttons and an aria-labelled nav;
reduced motion makes indicator movement immediate.
