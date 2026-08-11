# Motion Kit launch package

## Position

One motion language for calm, readable interfaces—39 dependency-free effects in vanilla CSS/JS and typed React forms.

## Audience

Frontend developers, product designers, and small teams who need considered interaction polish without adopting a motion framework.

## Differentiators

- One shared duration/easing token system across the catalogue.
- Vanilla assets are copyable and have no runtime dependency.
- React components ship as typed ESM with CSS Modules.
- Every effect documents and implements a reduced-motion path.
- A standalone gallery makes the catalogue inspectable before installation.

## Message hierarchy

1. Motion can clarify hierarchy and state.
2. Motion Kit gives teams a coherent starting vocabulary.
3. The same ideas are available in vanilla and React.
4. The kit stays small in concepts: no animation-library dependency and no production service.

## Launch headlines

1. A calmer motion language for the web.
2. 39 interface effects. One shared rhythm.
3. Motion polish without another runtime.

## Descriptions

Short: Motion Kit is a dependency-free catalogue of 39 ambient and interactive effects for vanilla CSS/JS and React.

Medium: Motion Kit gives frontend teams a coherent set of 39 motion primitives—from reveals and magnetic actions to dialogs, drawers, data movement, and scroll cues. Use the standalone gallery to inspect the behavior, then copy the vanilla files or install the typed React surface. Shared tokens keep timing consistent, and every effect includes a reduced-motion path.

## Honest caveats

This is a focused primitive kit, not a replacement for a full animation system. It does not provide timeline choreography, physics, gesture orchestration, or 3D rendering. The package gate passes, but public promotion is currently on HOLD: host evidence found a `particle-cursor-trail.js:52` negative-radius runtime error, 27px mobile overflow from `.hero-copy`, and verified contrast, target-size, overlap, and text-size defects. No production performance or adoption claim is made here.

## Launch-gate repair status

The working tree now removes expired particles before drawing, guards both vanilla and React particle radii, constrains the mobile hero copy at its grid-item width source, raises the affected gallery text to 12px or larger, restores 44px targets for the two inline demo links, and strengthens the skip-link, reading-progress, accordion, and floating-gallery text colors. A deterministic runtime check advances the vanilla particle trail through 45 frames of decay; `npm run verify` includes it.

Public promotion remains **HOLD**. These are source fixes, not host clearance: the foreman must run the desktop and 390×844 dark host browser gate, exercise the cursor, dialog, and drawer, and confirm the measured overflow, contrast, target-size, text-size, console, and intentional-overlap findings before promotion.

## Recommended GitHub description

39 dependency-free motion effects for vanilla CSS/JS and typed React, unified by one timing system and reduced-motion paths.

## Exact topics

`animation`, `css`, `javascript`, `react`, `typescript`, `web-animation`, `ui`, `frontend`, `accessibility`, `motion-design`

## Draft release notes

### Motion Kit 0.1.0

- Added a 39-effect catalogue with standalone gallery examples.
- Added dependency-free vanilla CSS/JS forms.
- Added typed React components with CSS Modules.
- Added shared duration and easing tokens.
- Added reduced-motion behavior and per-effect usage notes.
- Added package verification for root and React subpath consumers.

Known limitation: the prior host browser gate is historical evidence and must be re-audited after these fixes. The media is real but frame-sequenced, not a live screen recording.

## Three-week public marketing plan

| Week | Channel and cadence | Post concept | CTA | Success metric |
| --- | --- | --- | --- | --- |
| 1 | GitHub release + 2 short posts on Bluesky/X | Show the gallery taxonomy and the shared timing tokens | Inspect the gallery and star the repo | Gallery visits, stars, saves |
| 1 | One README-oriented community post | Explain why a small vanilla primitive can be more useful than a large motion dependency | Try one effect in a blank page | Click-throughs, copy/install attempts |
| 2 | Three posts, one every other day | Three before/after interaction examples: reveal, magnetic action, focused dialog | Compare the source and behavior | Engagement rate, link clicks |
| 2 | One frontend community discussion | Share the reduced-motion contract and ask for implementation feedback | Open an issue with a use case | Qualified replies, issues opened |
| 3 | Two posts + one maintainer note | Vanilla/React parity and how the token system keeps a page coherent | Pick a primitive and test it in a project | Forks, package installs, repeat visits |
| 3 | One recap post | What the kit is intentionally not: no timeline engine, no physics, no claims | Tell us what primitive is missing | Feedback quality, contributor interest |

Cadence is intentionally small: useful demonstrations first, direct calls to inspect or try the artefact, and no production or adoption claims.

## Media checklist

Existing host captures: `media/desktop-hero.png`, `media/interaction-grid.png`, `media/interaction-dialog.png`, `media/interaction-drawer.png`, and `media/mobile-dark.png`. If the host re-audit passes, recapture exactly those five stills, then rebuild `media/CONTACT-SHEET.png` and `media/demo.mp4` from the new stills. Promotion remains HOLD pending that evidence; see `media/README.md` for crop guidance.
