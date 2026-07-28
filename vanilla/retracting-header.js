/* Retracting Header — dependency-free vanilla form.
   Structure expected: one .rh-header element; pass { threshold, minDelta } in pixels to control scroll state.
   Consumes tokens.css variables --motion-fast and --ease-out-soft through the stylesheet; JS writes data-retracted and data-scrolled.
   Under prefers-reduced-motion, no retracting state is written and the header stays pinned, while threshold styling still updates. */

export function mountRetractingHeader(
  root,
  { threshold = 24, minDelta = 4 } = {},
) {
  if (!root) return { destroy() {} };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let previous = scrollY;
  const update = () => {
    const current = Math.max(0, scrollY);
    root.dataset.scrolled = String(current > threshold);
    if (!reduced && Math.abs(current - previous) >= minDelta) {
      root.dataset.retracted = String(
        current > previous && current > threshold,
      );
      previous = current;
    }
  };
  root.dataset.retracted = "false";
  addEventListener("scroll", update, { passive: true });
  update();
  return {
    destroy() {
      removeEventListener("scroll", update);
    },
  };
}
