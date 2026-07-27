# Command Palette Bloom (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { CommandPaletteBloom } from "motion-kit/react/CommandPaletteBloom";
<CommandPaletteBloom triggerLabel="Search" items={["Open settings", "View profile"]} />;
```

## What's tunable

Props are `triggerLabel` and `items: string[]`; the module has no effect-specific
custom properties. Override its panel width (default `min(560px, calc(100vw - 32px))`)
and use `--motion-base`, `--ease-out-soft`, and `--ease-out-expressive` globally.

## Notes

It focuses the input and closes on Escape/backdrop click, but does not provide
focus trapping, filtering, or actionable command semantics. It is the wrong
choice as a complete dialog system without those additions. Keep a real trigger,
label the dialog/input, and preserve keyboard access; reduced motion removes
visual transition time.
