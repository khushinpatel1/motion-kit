/* Liquid Mode Toggle — dependency-free vanilla form.
   Structure expected: a real <button class="lm-toggle" aria-pressed="false">; pass { onChange } for state updates.
   Consumes tokens.css variables --motion-fast and --ease-out-* through the stylesheet.
   Under prefers-reduced-motion, only the visual transition changes; button semantics and onChange remain. */

export function mountLiquidModeToggle(root, { onChange } = {}) {
  if (!root) return { destroy() {} };
  const click = () => {
    const pressed = root.getAttribute("aria-pressed") === "true";
    root.setAttribute("aria-pressed", String(!pressed));
    onChange?.(!pressed);
  };
  root.addEventListener("click", click);
  return {
    destroy() {
      root.removeEventListener("click", click);
    },
  };
}
