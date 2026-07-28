# Velocity Skew Type (React)

Use this on a large heading to turn scroll velocity into a capped, subtle skew and optional variable-font weight shift.

## Markup

```tsx
import "motion-kit/tokens.css";
import { VelocitySkewType } from "motion-kit/react/VelocitySkewType";
<VelocitySkewType maxSkew={6}>Motion with a point of view</VelocitySkewType>;
```

## Tunables

`maxSkew` defaults to `6` degrees; `baseWeight` defaults to `600`; `velocityWeight` defaults to `120`. JS writes `--vst-skew` and `--vst-weight`; CSS `--vst-color` defaults to `#fff`.

## Reduced motion

The heading is static and unskewed, with no scroll listener or rAF loop.

## Notes

The rAF loop idles out below its velocity threshold and restarts on the next scroll event. Variable-font weight is a progressive enhancement.
