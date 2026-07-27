# Particle Cursor Trail (React)

## Use it

```tsx
import { ParticleCursorTrail } from "motion-kit/react/ParticleCursorTrail";
<ParticleCursorTrail color="#a7f3d0" />;
```

## What's tunable

The only prop is `color`; the implementation caps the particle list at `80` and
there are no CSS custom properties. The vanilla port exposes `maxParticles`,
but this React component does not.

## Notes

This is the heaviest effect: a full-screen canvas, global pointer/resize
listeners, and a continuous rAF loop. It is the wrong choice for task-focused
interfaces. It is decorative and cleans itself up on unmount; reduced motion
does not create the canvas loop.
