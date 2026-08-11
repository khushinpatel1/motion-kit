# Host browser proof

Motion Kit has no npm script that serves the gallery. Start the host server from
the repository root, then run the proof harness in a second terminal.

```sh
cd /Users/khushinpatel/Dev/motion-kit
python3 -m http.server 4173
```

The exact proof URL is:

```text
http://127.0.0.1:4173/gallery/index.html
```

Playwright is not a dependency of this repository. On the host, install it
transiently without editing `package.json` or `package-lock.json`, then install
its Chromium browser:

```sh
cd /Users/khushinpatel/Dev/motion-kit
npm install --no-save --no-package-lock playwright
npx playwright install chromium
mkdir -p launch/host-proof
node scripts/host-proof.mjs http://127.0.0.1:4173/gallery/index.html launch/host-proof
```

PASS is a JSON object on stdout with `"ok": true`; every check has
`"status": "PASS"`, both desktop and mobile-dark states have no console errors
or failed requests, and the output directory contains initial, cursor, dialog,
and drawer state screenshots for each viewport. Any missing selector is reported as `SKIP`, and
SKIP makes the overall `ok` verdict false.

The harness covers the real gallery controls: `#spotlight.cs-card` on
`pointermove`, `#dialog-demo .fde-card` / `.fde-dialog-close` / `.fde-dialog`
on click and Escape, and `#drawer-demo .edd-trigger` / `.edd-scrim` /
`.edd-drawer` on click and Escape. It verifies focus trapping and focus return
for both overlays.
