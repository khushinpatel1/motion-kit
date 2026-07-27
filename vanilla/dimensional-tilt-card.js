/* Dimensional Tilt Card — dependency-free vanilla form.
   Structure expected: <article class="dt-card"><div class="dt-inner">...</div></article>; pass { maxTilt } to cap rotation.
   Consumes tokens.css variables --motion-fast and --motion-base through the stylesheet; JS writes --rx, --ry, --sx, and --sy.
   Under prefers-reduced-motion, pointer listeners are not attached and the CSS card stays flat. */

export function mountDimensionalTiltCard(root, { maxTilt = 8 } = {}) {
  if (!root) return { destroy() {} };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const move = (event) => {
    const r = root.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width;
    const y = (event.clientY - r.top) / r.height;
    root.style.setProperty("--rx", `${(0.5 - y) * maxTilt}deg`);
    root.style.setProperty("--ry", `${(x - 0.5) * maxTilt}deg`);
    root.style.setProperty("--sx", `${x * 100}%`);
    root.style.setProperty("--sy", `${y * 100}%`);
  };
  const reset = () => {
    root.style.setProperty("--rx", "0deg");
    root.style.setProperty("--ry", "0deg");
  };
  if (!reduced && window.matchMedia("(hover: hover)").matches) {
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", reset);
  }
  return {
    destroy() {
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", reset);
    },
  };
}
