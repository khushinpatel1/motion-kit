# Typewriter Caret (React)

Use this for a typewritten entrance line with a static block caret after completion, optionally cycling through strings.

## Markup

```tsx
import "motion-kit/tokens.css";
import { TypewriterCaret } from "motion-kit/react/TypewriterCaret";
<TypewriterCaret strings={["Make room", "Make better work"]} />;
```

## Tunables

`children` defaults to `Make room for better work`; `strings` replaces it when supplied; `deleteBetween` and `loop` default to `true`. Per-character delay derives from `--motion-instant`. CSS `--twc-color` defaults to `#fff`.

## Reduced motion

The first string is complete immediately and the caret is present without blinking.

## Notes

The full strings are immediately available in a visually hidden node while the visual node is `aria-hidden`. Timers stop on unmount.
