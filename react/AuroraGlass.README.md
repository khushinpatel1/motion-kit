# Aurora Glass Ambient Background (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { AuroraGlass } from "motion-kit/react/AuroraGlass";
<AuroraGlass title="Account overview"><p>Foreground content.</p></AuroraGlass>;
```

## What's tunable

There are no component props beyond `title` and `children`, and no effect-specific
custom properties. Override module styles in a wrapper or fork the module;
timing uses `--motion-ambient` and `--ease-linear` from global `tokens.css`.

## Notes

Two continuous blurred blobs and `backdrop-filter` can cost paint time; it is the
wrong choice for large or low-power surfaces. Keep content readable without the
glow. Reduced motion stops the blob animations.
