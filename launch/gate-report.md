# Motion Kit launch gate report

Date: 2026-08-10 (America/Los_Angeles)

## Automated/package gate

Command: `npm run verify`

Result: PASS.

- Build: 39 ESM modules, 39 declarations, 38 CSS Modules.
- Typecheck, parity, syntax, package, consumer, and docs checks: PASS.

## Repair pass in this working tree

- Vanilla and React particle trails now remove expired/non-finite particles before `arc()` and guard the computed radius.
- The gallery hero copy now has an explicit zero-minimum grid width and bounded children at mobile widths; body overflow is not hidden or clamped.
- Gallery text formerly below 12px is now at least 12px, the two inline demo links have 44px minimum targets, and skip-link/read-progress plus affected demo copy use readable colors.
- The runtime gate imports the vanilla trail, dispatches deterministic pointer input, advances 45 animation frames, and records 117 finite, non-negative radii.
- Layered card/deck/flip visuals remain intentional contained effects; no global overlap suppression was added. The host re-audit must distinguish those from any actual unreadable overprint.

## Host browser evidence

Real local HTTP page: `http://127.0.0.1:4173/gallery/index.html`.

- 39 live `article.demo` nodes rendered.
- Initial page load had no console warnings or errors.
- Later interaction exposed a real runtime error in `particle-cursor-trail.js:52`: `IndexSizeError` from `arc` receiving a negative radius.
- Native detail dialog opened with `open=true` and moved focus into the dialog.
- Edge drawer opened with root class `edd-root is-open`, visible drawer, `aria-modal=true`, and focus on Close.

## Measurable visual/accessibility evidence

`uilint` at desktop 1280×800 returned HTTP 200 and found carousel overflow, 29 capped overlap detections, low contrast including 3.5:1 skip-link text and 3.4:1 reading-progress copy, very low-contrast demo text, sub-44px targets, and text below 12px. This is historical evidence; the repair pass has not been re-measured by a host browser in this sandbox.

`uilint` at mobile dark 390×844 returned HTTP 200 and found real 27px horizontal overflow from `.hero-copy`, 29 capped overlap detections, sub-44px targets, and text below 12px. This is historical evidence; the repair pass has not been re-measured by a host browser in this sandbox.

## Media evidence

Completed captures are the actual host files in `media/`: `desktop-hero.png`, `interaction-grid.png`, `interaction-dialog.png`, `interaction-drawer.png`, and `mobile-dark.png`.

`media/CONTACT-SHEET.png` is a labeled composite of those captures. `media/demo.mp4` is a silent, frame-sequenced montage with restrained fades; it is not a live screen recording and does not claim to show motion between the captured states.

## Verdict

Automated/package readiness: **PASS**.

Public promotion: **HOLD** pending clean host re-audit and media recapture. Do not use the existing media as evidence that the fixes are resolved.

## Required host recapture list

If the host gate passes, recapture exactly these five stills at the existing capture framing: `media/desktop-hero.png`, `media/interaction-grid.png`, `media/interaction-dialog.png`, `media/interaction-drawer.png`, and `media/mobile-dark.png`. Then rebuild the derived `media/CONTACT-SHEET.png` and `media/demo.mp4`; the MP4 must remain a silent, frame-sequenced montage, not a live capture. No media was regenerated in this sandbox.
