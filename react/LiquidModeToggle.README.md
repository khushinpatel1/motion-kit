# Liquid Mode Toggle (React)

## Use it

```tsx
import "motion-kit/tokens.css";
import { LiquidModeToggle } from "motion-kit/react/LiquidModeToggle";
<LiquidModeToggle defaultPressed={false} onChange={(pressed) => console.log(pressed)} />;
```

## What's tunable

Props are `defaultPressed?: boolean` and `onChange?: (pressed: boolean) => void`.
There are no effect-specific custom properties; the module uses `--motion-fast`,
`--ease-out-soft`, and `--ease-out-expressive`.

## Notes

It is a stateful button but does not persist the mode or expose a custom visible
label. It is the wrong choice if a native checkbox or labelled settings control
would be clearer. The button remains keyboard-operable and reduced motion only
collapses the visual transitions.
