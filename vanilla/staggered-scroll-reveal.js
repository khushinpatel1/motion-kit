/* Staggered Scroll Reveal — dependency-free vanilla form.
   Structure expected: a root containing nested elements with class/data attribute [data-stagger-item].
   Consumes tokens.css variables --motion-instant, --motion-base, and --ease-out-expressive through the stylesheet.
   Under prefers-reduced-motion, items are marked .is-visible immediately and no observer work is needed. */

export function mountStaggeredScrollReveal(root) {
  if (!root) return { destroy() {} };
  const items = [...root.querySelectorAll("[data-stagger-item]")];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  items.forEach((item, index) =>
    item.style.setProperty(
      "--ssr-delay",
      reduced ? "0" : `calc(var(--motion-instant) * ${Math.min(index, 5)})`,
    ),
  );
  const observer = new IntersectionObserver((entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }),
  );
  if (reduced) items.forEach((item) => item.classList.add("is-visible"));
  else items.forEach((item) => observer.observe(item));
  return {
    destroy() {
      observer.disconnect();
    },
  };
}
