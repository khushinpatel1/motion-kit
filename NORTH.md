# NORTH — motion-kit

Status: published 2026-07-27 — `khushinpatel1/motion-kit`, public, MIT.

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

## Provenance and licence

MIT, `LICENSE` at the root, copyright Khushin Patel. The kit is claimable
because there is nothing in it to claim from anyone else: **no dependencies, no
vendored files, no third-party licence headers, and no copied source.** What it
implements are common techniques — a shimmer sweep, a magnetic button, a tilt
card, a scroll reveal — and a technique is not copyrightable; the CSS and JS
expressing them here were written for this repo.

The one file with an outside ancestor is `floating-image-gallery`, adjusted
from a reference KP supplied on 2026-07-26 (hover grows the card 25% and takes
centre stage, wider gaps, higher lift, click opens full screen; built for a 5×4
display). Its own header and `manifest.json` both record that. **That reference
was never identified, so its licence is unknown** — if it turns out to have
been someone's published component, this effect is the one to re-derive or
attribute, and the other eighteen are unaffected.

## Published 2026-07-27 — and what had to be fixed first

The 2026-07-26 note said the kit was built. Everything was present and nothing
was publishable: all eighteen codex-built effects were **minified single-line
CSS**, the React components were three or four lines each, and the per-effect
READMEs were headings with a sentence under them. For a library whose entire
premise is "copy the files you want into your project," minified source is a
contradiction — 199 lines of React across nineteen components is the tell.

Before publishing: the whole tree went through prettier, every effect source
file got a header stating the markup it expects, the `tokens.css` variables it
consumes and its `prefers-reduced-motion` behaviour, and every README was
rewritten against the actual file — real custom properties and props by name,
with the honest caveat. Roughly 200 lines became roughly 1,700. Verified in a
browser afterwards: all nineteen effects mount from `gallery/index.html` with
**no console errors**.

The lesson is general and belongs here: **"built" is a claim about the artefact,
not the file count.** Open the files before writing the word done.
