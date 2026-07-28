# Height Morph Accordion (vanilla)

An accessible accordion that morphs unknown-height content with a `0fr` to `1fr` grid row. Reach for it when the panel content should remain in normal document flow and you need single-open or multi-open behavior without measuring in JavaScript.

## Markup

```html
<div class="hma-accordion">
  <section class="hma-item">
    <button class="hma-trigger" aria-expanded="false" aria-controls="panel-one">One</button>
    <div class="hma-panel" id="panel-one"><div class="hma-panel-inner">Panel content.</div></div>
  </section>
</div>
<script type="module">import { mountHeightMorphAccordion } from "./height-morph-accordion.js"; mountHeightMorphAccordion(document.querySelector(".hma-accordion"), { multiple: false });</script>
```

## Tunables

`multiple` defaults to `false` and allows several panels open when `true`. CSS uses `--motion-fast` and `--ease-out-soft` from `tokens.css`.

## Reduced motion

The shared fast duration becomes zero. JavaScript also sets collapsed panels to `hidden` immediately, so their content cannot receive focus.

## Notes

Each trigger must be a real button and each `aria-controls` value must match a unique panel id. Arrow Up and Arrow Down move between headers.

