/* Scroll-Linked Hue — dependency-free vanilla form.
   Structure expected: one element with class .shb-background; JS writes its --hue and --alpha custom properties.
   Consumes tokens.css variables --motion-fast and --ease-out-soft through the stylesheet.
   Under prefers-reduced-motion, it fixes --hue/--alpha to their initial values and attaches no scroll listener. */

export function mountScrollLinkedHue(root) {
  if (!root) return { destroy() {} };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.style.setProperty("--hue", "220");
    root.style.setProperty("--alpha", ".18");
    return { destroy() {} };
  }
  let frame = 0;
  const update = () => {
    frame = 0;
    const max = document.documentElement.scrollHeight - innerHeight;
    const progress = max ? scrollY / max : 0;
    root.style.setProperty("--hue", String(Math.round(220 + progress * 110)));
    root.style.setProperty("--alpha", String(0.14 + progress * 0.2));
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  addEventListener("scroll", onScroll, { passive: true });
  update();
  return {
    destroy() {
      removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    },
  };
}
