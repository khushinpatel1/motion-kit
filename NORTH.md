# NORTH — motion-kit

Status: published 2026-07-27 — `khushinpatel1/motion-kit`, public, MIT.

## What it is

A focused library of ambient/interactive motion effects that every new studio
project can start from instead of hand-rolling hover states and scroll reveals.
The catalogue has 39 effects: 38 paired vanilla CSS+JS and plain-React forms,
plus one vanilla-only composite. The paired effects use no vanilla runtime
dependency and React CSS Modules (no Tailwind), all built on one shared
duration/easing token system (`tokens.css`) so a page using several effects
reads as one motion language instead of a dozen things animating on their own
clock.

It is now an installable package: `npm run build` emits modern ESM, declarations,
and every React CSS Module under `dist/react/`. The package root and documented
React subpaths resolve to those built artifacts; vanilla modules, tokens, the
manifest, and the standalone gallery retain their direct exports. The gallery
still opens directly in a browser with no tooling.

Web only. `garden-native` and `kapers` are Swift/SwiftUI; native motion
(Rive, `PhaseAnimator`) is a separate effort with a different toolchain and
explicitly out of scope here.

Classification: **PUBLIC** (tooling the studio isn't selling — see the
revenue test in `~/Dev/CLAUDE.md` § Routing).

## Run it

Open `gallery/index.html` directly in a browser — no server needed. To use
an effect in a project: install the package and import the root or a documented
React subpath, or copy the relevant `vanilla/*.css`(+`.js`) files plus
`tokens.css`. `npm run verify` builds and typechecks the React surface, checks
manifest paths and package contents, proves a packed consumer import, checks
JavaScript syntax, and checks doc health.

The live launch work order and host evidence are in `launch/gate-report.md`.

## Test it

`npm run verify` covers the build and the package. The BEHAVIOUR of the
overlays is covered by `scripts/host-proof.mjs` — see
[`scripts/host-proof.README.md`](scripts/host-proof.README.md) for the exact
commands. It drives a real browser at desktop and 390×844 dark and asserts what
the components promise: the cursor tracks the pointer, and the dialog and
drawer each trap focus, close on Escape, on their close control and on their
scrim, and return focus to the element that opened them. It cannot run inside a
crew sandbox — macOS denies Chromium the Mach bootstrap port — so it is
host-only work for the foreman. 18 of 18 must pass before a launch.

Beyond that: `gallery/index.html` must open standalone with every effect
running and no console errors, and `manifest.json` must list every effect
actually on disk with working paths. Re-check both after adding or editing an
effect.

## Structure

```
package.json             package metadata, compiled exports, peer dependency, verify gate
dist/react/              generated ESM, declarations, CSS Modules, component notes
react/index.ts            source barrel for all 38 React components
tsconfig.json             strict TypeScript build contract
tokens.css / tokens.md    shared duration + easing vocabulary, one paragraph per token
vanilla/                 dependency-free CSS(+JS) per effect, one .README.md each
react/                   CSS Modules + typed .tsx per effect, one .README.md each
gallery/index.html       every effect live in one page, organized by category
manifest.json            one entry per effect: name, category, paths, perf notes
```

## Laws

1. Every duration and easing curve comes from `tokens.css`. No effect
   hardcodes its own `ms`/`s` value or a bespoke `cubic-bezier` — that's what
   turned the two source demo galleries into noise instead of a system.
2. Paired effects have two forms: vanilla (source of truth, built first) and
   React (a straight port, not a reinterpretation). A composite may be
   vanilla-only when the manifest says so and its README explains why.
3. No animation library dependency (no GSAP, no Framer Motion, no Lenis).
   This kit is the dependency-free baseline every project gets by default —
   reach for a real library separately when a project needs scroll-sequenced
   or 3D work beyond what this kit covers.
4. Every effect handles `prefers-reduced-motion`. Pure CSS transitions
   collapse for free once `tokens.css` zeroes every duration; anything
   structural (a `requestAnimationFrame` loop, a continuous CSS `animation`,
   an `IntersectionObserver`-driven counter) needs an explicit check that
   skips the animated behavior rather than just relying on 0ms.
5. Only KP promotes to production — moot here (no deploy target), kept for
   consistency with every other repo's NORTH.

## Provenance and licence

MIT, `LICENSE` at the root, copyright Khushin Patel. The kit is claimable
because there is nothing in it to claim from anyone else: **no dependencies, no
vendored files, no third-party licence headers, and no copied source.** What it
implements are common techniques — a shimmer sweep, a magnetic button, a tilt
card, a scroll reveal — and a technique is not copyrightable; the CSS and JS
expressing them here were written for this repo.

**The 2026-07-28 expansion (19 → 38) has a provenance question worth stating
plainly, because it was nearly a mistake.** KP asked for "all the free motion
components and tools" from `annnimate.com` to be added to the kit. That site is
a **€29/month subscription library**: two components are free, the rest are
paid, and its licence forbids repackaging its components into a competing
library — which is exactly what this repo is. Copying anything from it would
have broken their terms *and* voided the claim below.

So nothing was copied. The nineteen new effects were written from written
descriptions of what each technique *does* — a scramble settle, a clip-path
wipe, a FLIP dialog, a goo filter — against this repo's own tokens and header
conventions. That is the same footing as the original nineteen: **a technique
is not copyrightable, and an implementation of one written from scratch owes
nobody attribution.** No file was fetched from that site, no source was
vendored, and no third-party licence header exists anywhere in the tree.

The general rule this establishes: **"free to look at" is not "free to take."**
A public gallery demonstrating a paid component is marketing, not a licence
grant. Read the terms before treating a reference as a source.

The one file with an outside ancestor is `floating-image-gallery`, adjusted
from a reference KP supplied on 2026-07-26 (hover grows the card 25% and takes
centre stage, wider gaps, higher lift, click opens full screen; built for a 5×4
display). Its own header and `manifest.json` both record that. **That reference
was never identified, so its licence is unknown** — if it turns out to have
been someone's published component, this effect is the one to re-derive or
attribute, and the other eighteen are unaffected.

## Two lessons this repo paid for

**"Built" is a claim about the artefact, not the file count.** The kit was
called done while every effect was minified single-line CSS and each React
component was three lines. Open the files before writing the word done.
(The 2026-07-27 repair is in git history.)

**A component that ships an overlay ships a focus contract.** The dialog went
out relying on `showModal()` alone with no Tab boundary, and the drawer closed
without returning focus — both invisible to a build gate and both found only by
driving a real browser. Anything modal must trap Tab and Shift+Tab, keep focus
off the page behind it, and return focus to its trigger on *every* close path.
