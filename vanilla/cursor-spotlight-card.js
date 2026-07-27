/* Cursor Spotlight Card — dependency-free vanilla form.
   Structure expected: one element with class .cs-card; its contents may be any accessible card content.
   Consumes tokens.css variables --motion-fast and --ease-out-soft through the stylesheet; JS writes --x and --y.
   Under prefers-reduced-motion, CSS transition timing resolves to zero; this JS still tracks hover-capable pointers. */

export function mountCursorSpotlightCard(root) {
  if (!root) return { destroy() {} };
  const onMove = (event) => {
    const rect = root.getBoundingClientRect();
    root.style.setProperty("--x", `${event.clientX - rect.left}px`);
    root.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };
  if (window.matchMedia("(hover: hover)").matches)
    root.addEventListener("pointermove", onMove);
  return {
    destroy() {
      root.removeEventListener("pointermove", onMove);
    },
  };
}
