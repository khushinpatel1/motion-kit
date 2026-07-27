# Aurora Glass Ambient Background (vanilla)

## Use it

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="aurora-glass.css">
<section class="ag-shell"><h2>Account overview</h2><p>Foreground content.</p></section>
```

## What's tunable

There are no effect-specific custom properties. Override the shell's padding,
colors, opacity, blur, or blob geometry in your own stylesheet. The animation
uses shared `--motion-ambient` (about 3s or longer) and `--ease-linear` tokens.

## Notes

This is a continuous two-blob animation and `backdrop-filter` can be expensive,
especially over large surfaces. It is the wrong choice for a full-page effect
on low-power devices or when a solid panel will do. Reduced motion stops the
blobs; keep foreground text and contrast accessible independently of the glow.
