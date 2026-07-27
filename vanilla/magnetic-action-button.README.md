# Magnetic Action Button (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="magnetic-action-button.css">
<button class="ma-button" type="button">Continue</button>
<script type="module">import { mountMagneticActionButton } from "./magnetic-action-button.js"; mountMagneticActionButton(document.querySelector(".ma-button"));</script>
```

## What's tunable

Pass `radius` in CSS pixels; `60–180` is a sensible range. Pass `strength` as a
fraction; `0.1–0.35` keeps the pull subtle. JS writes `--mx` and `--my`; timing
uses `--motion-fast` and `--ease-out-soft`.

## Notes

It adds pointer listeners on hover-capable devices and transforms the whole
button, so it is the wrong choice near tightly packed controls or for touch-only
interfaces. It remains a real button and resets on leave; keep the label and
focus indication clear. Reduced motion removes the transition time but does not
disable pointer attraction.
