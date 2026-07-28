/* SVG Path Draw — dependency-free vanilla form.
   Structure expected: an inline <svg class="spd-svg"> containing one or more <path data-draw> elements; pass { stagger } as a viewport-progress fraction.
   Consumes tokens.css variables --motion-fast and --ease-linear through the stylesheet; JS writes --spd-progress, --spd-length, --spd-start, and --spd-span.
   Under prefers-reduced-motion, paths are measured and set fully drawn at mount, with no scroll listener. */

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function mountSvgPathDraw(root, { stagger = 0.08 } = {}) {
  if (!root) return { destroy() {} };
  const paths = [...root.querySelectorAll("path[data-draw]")];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const measure = () => {
    paths.forEach((path, index) => {
      const length = path.getTotalLength();
      const start = index * stagger;
      path.style.setProperty("--spd-length", String(length));
      path.style.setProperty("--spd-start", String(start));
      path.style.setProperty("--spd-span", String(Math.max(0.01, 1 - start)));
    });
  };
  const progress = () => {
    const rect = root.getBoundingClientRect();
    return clamp((innerHeight - rect.top) / (innerHeight + rect.height));
  };
  measure();
  if (reduced) {
    root.style.setProperty("--spd-progress", "1");
    return { destroy() {} };
  }
  const update = () =>
    root.style.setProperty("--spd-progress", String(progress()));
  const onResize = () => {
    measure();
    update();
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", onResize);
  update();
  return {
    destroy() {
      removeEventListener("scroll", update);
      removeEventListener("resize", onResize);
    },
  };
}
