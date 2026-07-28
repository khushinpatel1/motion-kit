/* Parallax Media Band — dependency-free vanilla form.
   Structure expected: a .pmb-band containing one .pmb-media element; pass { depth } from 0 to 1.
   Consumes tokens.css variable --motion-fast through the stylesheet; JS writes --pmb-progress, --pmb-shift, and data-in-view.
   Under prefers-reduced-motion, the media is centred, the shift is zero, and no scroll listener is attached. */

const clamp = (value) => Math.min(1, Math.max(0, value));

export function mountParallaxMediaBand(root, { depth = 0.35 } = {}) {
  if (!root) return { destroy() {} };
  const media = root.querySelector(".pmb-media");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.style.setProperty("--pmb-depth", String(clamp(depth)));
  const setOverscan = () => {
    root.style.setProperty(
      "--pmb-shift",
      `${root.getBoundingClientRect().height * clamp(depth)}px`,
    );
  };
  const update = () => {
    const rect = root.getBoundingClientRect();
    const value = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
    root.style.setProperty("--pmb-progress", String(value));
    root.dataset.inView = String(rect.bottom > 0 && rect.top < innerHeight);
  };
  if (reduced) {
    root.style.setProperty("--pmb-shift", "0px");
    root.style.setProperty("--pmb-progress", "0.5");
    root.dataset.inView = "false";
    return { destroy() {} };
  }
  const onResize = () => {
    setOverscan();
    update();
  };
  setOverscan();
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", onResize);
  update();
  return {
    destroy() {
      removeEventListener("scroll", update);
      removeEventListener("resize", onResize);
      if (media) media.style.removeProperty("will-change");
    },
  };
}
