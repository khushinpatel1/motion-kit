# FloatingImageGallery (React)

```tsx
import { FloatingImageGallery } from "motion-kit/react/FloatingImageGallery";
// tokens.css must be imported once, globally, somewhere in the app
import "motion-kit/tokens.css";

<FloatingImageGallery
  columns={5}
  items={[
    { title: "Vault roots", description: "...", src: "/img/vault-roots.png" },
    // ...
  ]}
/>
```

Same behavior as the vanilla version: cards float at rest, grow 25% and take
center stage on hover (siblings dim via `:has()`, degrades gracefully where
unsupported), flip to reveal a caption, and open full screen on click.

Needs a dark-ish background — bring your own page shell, this component
doesn't ship one. Tunables (`--fig-gap`, `--fig-hover-scale`,
`--fig-hover-lift`) are documented in
`vanilla/floating-image-gallery.README.md` — same custom properties, same
defaults, this is a straight port.
