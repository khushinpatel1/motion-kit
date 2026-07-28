/* Clip Mask Reveal — dependency-free vanilla form.
   Structure expected: one .cmr-reveal element; pass { direction } or use its data-direction attribute.
   Consumes tokens.css variables --motion-base and --ease-out-expressive through the stylesheet; JS writes the .is-visible class.
   Under prefers-reduced-motion, the observer still runs once and reveals the element immediately without a transform. */

export function mountClipMaskReveal(
  root,
  { direction = root?.dataset.direction || "up", threshold = 0.15 } = {},
) {
  if (!root) return { destroy() {} };
  root.dataset.direction = direction;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveal = () => root.classList.add("is-visible");
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        reveal();
        observer.disconnect();
      }
    },
    { threshold },
  );
  observer.observe(root);
  if (reduced) reveal();
  return {
    destroy() {
      observer.disconnect();
    },
  };
}
