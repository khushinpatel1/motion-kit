# Velocity Skew Type (vanilla)

Use this on a large heading when scroll energy should register as a restrained typographic lean that eases back to rest. It also nudges a variable font's `wght` axis when available.

## Markup

```html
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="velocity-skew-type.css">
<h1 class="vst-root">Motion with a point of view</h1>
<script type="module">
  import { mountVelocitySkewType } from "./velocity-skew-type.js";
  mountVelocitySkewType(document.querySelector(".vst-root"), { maxSkew: 6 });
</script>
```

## Tunables

`maxSkew` defaults to `6` degrees and hard-caps the lean. `baseWeight` defaults to `600`; `velocityWeight` defaults to `120` and controls the variable-font weight response. JS writes `--vst-skew` and `--vst-weight`. CSS `--vst-color` defaults to `#fff`.

## Reduced motion

No scroll listener or rAF is attached. The heading remains static, unskewed, and uses normal font variation settings.

## Notes

The rAF loop starts on scroll and stops once velocity is below its rest threshold. The weight axis is ignored by fonts that do not support it; keep the cap subtle.
