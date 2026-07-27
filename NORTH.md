# NORTH — motion-kit

Status: active build, 2026-07-26.

## What it is

A dependency-free library of ambient/interactive motion effects that every
new studio project starts from instead of hand-rolling hover states and
scroll reveals from scratch. Each effect ships in two forms — a vanilla
CSS+JS version with no dependency, and a plain-React version using CSS
Modules (no Tailwind) — built on one shared duration/easing token system
(`tokens.css`) so a page using several effects reads as one motion language
instead of a dozen things animating on their own clock.

It is a source library, not a package: consumers copy the files they want
into their own project. There is no build step, no `npm install`, no
`package.json` — `gallery/index.html` opens directly in a browser with no
tooling.

Web only. `garden-native` and `kapers` are Swift/SwiftUI; native motion
(Rive, `PhaseAnimator`) is a separate effort with a different toolchain and
explicitly out of scope here.

Classification: **PUBLIC** (tooling the studio isn't selling — see the
revenue test in `~/Dev/CLAUDE.md` § Routing).

## Run it

Open `gallery/index.html` directly in a browser — no server needed. To use
an effect in a project: copy the relevant `vanilla/*.css`(+`.js`) or
`react/*.tsx`+`.module.css` files, plus `tokens.css`, and read the effect's
own `.README.md` for usage and tunables.

## Test it

No automated test suite — this is static source, not an app. Verification is
manual: `gallery/index.html` must open standalone with every effect running
and no console errors, and `manifest.json` must list every effect actually on
disk with working paths. Re-check both after adding or editing an effect.

## Structure

```
tokens.css / tokens.md   shared duration + easing vocabulary, one paragraph per token
vanilla/                 dependency-free CSS(+JS) per effect, one .README.md each
react/                   CSS Modules + typed .tsx per effect, one .README.md each
gallery/index.html       every effect live in one page, organized by category
manifest.json            one entry per effect: name, category, paths, perf notes
```

## Laws

1. Every duration and easing curve comes from `tokens.css`. No effect
   hardcodes its own `ms`/`s` value or a bespoke `cubic-bezier` — that's what
   turned the two source demo galleries into noise instead of a system.
2. Two forms per effect, always: vanilla (source of truth, built first) and
   React (a straight port, not a reinterpretation).
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

## Current work

Initial build in progress, 2026-07-26: `tokens.css` and the `floating-image-
gallery` effect (adjusted from a KP-supplied reference — hover grows the
card 25% and takes center stage, more gap between cards, higher hover lift,
click opens full screen; built for a 5×4/20-item design-image display) are
done. The other 18 effects from the original build plan
(`~/Dev/docs/motion-kit-plan.md`, now folded in here) are being built via
`codex exec`. Once `manifest.json` has all 19 entries and `gallery/
index.html` verifies clean in a browser, wire the pointer into
`~/Dev/_template/NORTH.md` and close out the work order.
