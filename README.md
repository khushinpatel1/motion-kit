# motion-kit

39 focused motion effects: 38 paired in dependency-free vanilla CSS+JS and
plain React with CSS Modules, plus one vanilla-only composite. Everything
shares one duration/easing system so a page reads as one motion language
instead of a dozen things animating on their own clock.

The gallery is the fastest way in: open `gallery/index.html` directly in a
browser (no build step or server) to see every effect, its reduced-motion
behavior, and the source file to copy.

## Install

Install the compiled package from npm when released:

```sh
npm install motion-kit react
```

Until the npm release is tagged, install the same package surface from GitHub:

```sh
npm install github:khushinpatel1/motion-kit
```

The React entrypoint is compiled modern ESM with declaration files. React is a
peer dependency; the package has no vanilla runtime dependency. Your app's
bundler must support CSS Modules because each component imports its shipped
`.module.css` file. The package does not require your app to compile the
library's TypeScript source.

```tsx
import { MagneticActionButton } from "motion-kit";
import { FloatingImageGallery } from "motion-kit/react/FloatingImageGallery";
import "motion-kit/tokens.css";

<MagneticActionButton>Save changes</MagneticActionButton>;
<FloatingImageGallery columns={5} items={items} />;
```

The package root and `motion-kit/react` export the typed barrel. Every
component is also available as a typed subpath such as
`motion-kit/react/FloatingImageGallery`.

## Vanilla

Vanilla assets stay zero-build and dependency-free. Import or copy the
relevant CSS and optional JS module, then include the shared tokens:

```js
import "motion-kit/tokens.css";
import "motion-kit/vanilla/floating-card.css";
import { mountMagneticActionButton } from "motion-kit/vanilla/magnetic-action-button.js";
```

`motion-kit/manifest.json` is the catalogue contract. `motion-kit/gallery`
resolves to the standalone gallery, which also remains usable directly from a
checkout.

## What's here

- **`dist/react/`** — compiled ESM JavaScript, declaration files, CSS Modules,
  and per-component usage notes emitted by `npm run build`.
- **`react/`** — readable TypeScript/CSS Modules source for contributors; edit
  this tree, then rebuild.
- **`vanilla/`** — dependency-free CSS(+JS) effects and their README files.
- **`tokens.css` / `tokens.md`** — the shared duration and easing vocabulary.
- **`gallery/`** — every effect live in one no-tooling page.
- **`manifest.json`** — category, file paths, performance notes, and reduced
  motion status for every effect.

Run `npm run verify` before opening a pull request. It builds and typechecks all
38 React components, checks source/package/gallery parity and syntax, dry-runs
the packed artifact, and installs that tarball into a temporary consumer to
prove root and component-subpath imports with declarations and CSS Modules.

## Contributing

Keep the two forms in parity, use the tokens rather than introducing private
timing, and preserve the reduced-motion behavior documented by each effect.

## License

MIT. See [`LICENSE`](LICENSE).
