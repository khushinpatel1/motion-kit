# Particle Cursor Trail (React)

## Use it

Use <ParticleCursorTrail color="#a7f3d0" />.

Import the component and tokens.css globally in the consuming app.

## What's tunable

Pass particle color; implementation bounds the trail.

## Notes

Heaviest effect: canvas plus rAF. Cleanup cancels the frame; reduced motion never starts it.

