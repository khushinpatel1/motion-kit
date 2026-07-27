# Particle Cursor Trail (vanilla)

## Use it

```html
<link rel="stylesheet" href="particle-cursor-trail.css">
<script type="module">import { mountParticleCursorTrail } from "./particle-cursor-trail.js"; const trail = mountParticleCursorTrail({ color: "#a7f3d0", maxParticles: 80 });</script>
```

## What's tunable

Pass `color` (any canvas fill color) and `maxParticles`; `30–120` is a sensible
range for the latter. There are no CSS custom properties and no token dependency.

## Notes

This is the heaviest effect: a full-screen canvas, pointer listener, resize work,
and a continuous `requestAnimationFrame` loop. It is the wrong choice for dense
or task-focused interfaces. It is decorative and pointer-transparent; retain a
cleanup handle and never use it to communicate status. Reduced motion leaves no
running loop or pointer listeners.
