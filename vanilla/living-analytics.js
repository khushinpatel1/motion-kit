/* Living Analytics — dependency-free vanilla form.
   Structure expected: a root containing .la-count and .la-chart with nested .la-bar elements carrying --target values.
   Consumes tokens.css variables --motion-base and --motion-instant through the stylesheet; pass { value } for the counter.
   Under prefers-reduced-motion, the counter and bars jump to their final values when observed. */

export function mountLivingAnalytics(root, { value = 8420 } = {}) {
  if (!root) return { destroy() {} };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const count = root.querySelector(".la-count");
  const observer = new IntersectionObserver((entries) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      root.classList.add("is-visible");
      if (reduced) {
        if (count) count.textContent = value.toLocaleString();
      } else {
        const duration = parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--motion-base",
          ),
        );
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          if (count)
            count.textContent = Math.round(
              value * (1 - Math.pow(1 - progress, 3)),
            ).toLocaleString();
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
      observer.unobserve(root);
    }),
  );
  observer.observe(root);
  return {
    destroy() {
      observer.disconnect();
    },
  };
}
