# Noise / Grain Overlay (vanilla)

## Use it

```html
<link rel="stylesheet" href="noise-grain-overlay.css">
<div style="position:relative"><span class="ngo-overlay" aria-hidden="true"></span><p>Surface content</p></div>
```

## What's tunable

There are no custom properties. Override `.ngo-overlay` opacity (default
`0.14`, typically `0.04–0.2`) and `mix-blend-mode` (`screen` by default).

## Notes

The inline SVG turbulence is static but can add paint cost across large surfaces;
it is the wrong choice for text-heavy pages, low-power devices, or when a flat
surface is enough. It is pointer-transparent and decorative, so keep it
`aria-hidden` and preserve text contrast. Reduced motion changes nothing.
